import { NextResponse } from "next/server";
import { treks } from "@/data/treks";
import { offbeatPlaces } from "@/data/offbeat";
import { getAllCities, getStateById } from "@/data/locations";
import { getStaysNearDestination } from "@/data/stays";

function parseNumber(value) {
  if (!value) return null;
  const num = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(num) ? num : null;
}

function diffDays(start, end) {
  if (!start || !end) return null;
  const s = new Date(start);
  const e = new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
  const ms = e.getTime() - s.getTime();
  return ms > 0 ? Math.ceil(ms / (1000 * 60 * 60 * 24)) : null;
}

function resolveDestination(destination) {
  if (!destination) return { stateId: null, cityId: null };
  const q = destination.toLowerCase();
  const allCities = getAllCities();

  // Try matching a known city/state id from free-text
  const matchedCity = allCities.find(
    (c) => c.name.toLowerCase() === q || c.id.toLowerCase() === q
  );

  let stateId = matchedCity ? matchedCity.stateId : null;
  let cityId = matchedCity ? matchedCity.id : null;

  if (!stateId) {
    const matchedState = getStateById(destination);
    if (matchedState) stateId = matchedState.id;
  }

  return { stateId, cityId };
}

function matchByDestination(destination, items, locationHint) {
  if (!destination && !locationHint?.stateId && !locationHint?.cityId) return items;
  const q = destination ? destination.toLowerCase() : "";
  const stateId = locationHint?.stateId || null;
  const cityId = locationHint?.cityId || null;

  return items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(q);
    const cityMatch = item.city.toLowerCase().includes(q);
    const stateMatch = item.state.toLowerCase().includes(q);
    const idMatch =
      (stateId && item.stateId === stateId) ||
      (cityId && item.cityId === cityId);

    return nameMatch || cityMatch || stateMatch || idMatch;
  });
}

function filterByBudget(budgetPerDay, items, defaultCost = 3000) {
  if (!budgetPerDay) return items;

  // Very rough heuristic: if we have avgCost (offbeat), use that, else fallback
  return items.filter((item) => {
    if (item.avgCost) {
      const cost = parseNumber(item.avgCost);
      if (!cost) return true;
      return cost <= budgetPerDay * 1.5; // allow some buffer
    }
    return defaultCost <= budgetPerDay * 1.5;
  });
}

function parseStayPriceRange(range) {
  if (!range) return { min: null, max: null };
  const cleaned = String(range).replace(/[^0-9,]/g, "");
  const parts = cleaned.split(",").map((p) => Number(p.trim())).filter(Number.isFinite);
  if (!parts.length) return { min: null, max: null };
  const min = Math.min(...parts);
  const max = Math.max(...parts);
  return { min, max };
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));

  const {
    destination = "",
    travelStyles = [],
    adults = 0,
    children = 0,
    pets = 0,
    startDate = "",
    endDate = "",
    travelMode = "",
    budget = "",
  } = body || {};

  const totalTravelers = (adults || 0) + (children || 0);
  const totalDays = diffDays(startDate, endDate) || 4; // sensible default
  const totalBudget = parseNumber(budget) || null;
  const budgetPerDay = totalBudget && totalTravelers
    ? totalBudget / (totalTravelers * totalDays)
    : totalBudget
    ? totalBudget / totalDays
    : null;

  let budgetTag = null;
  if (budgetPerDay) {
    if (budgetPerDay < 2000) budgetTag = "Budget";
    else if (budgetPerDay <= 4000) budgetTag = "Comfortable";
    else budgetTag = "Premium";
  }

  const wantsTreks = travelStyles.includes("Treks & Adventure");
  const wantsOffbeat = travelStyles.includes("Offbeat");
  const wantsSpiritual = travelStyles.includes("Spiritual");
  const wantsSunrise = !!body?.wantsSunriseSpots;
  const avoidNightTravel = !!body?.avoidNightTravel;
  const tripPace = body?.tripPace || "balanced";

  const primaryLocation = resolveDestination(destination);

  // 1) Destination-based filtering
  let trekPool = matchByDestination(destination, treks, primaryLocation);
  let offbeatPool = matchByDestination(destination, offbeatPlaces, primaryLocation);

  const initialTrekMatches = trekPool.length;
  const initialOffbeatMatches = offbeatPool.length;

  // If nothing matched free-text but we resolved a state, fall back to that state
  let plannerNotes = null;
  if (!initialTrekMatches && !initialOffbeatMatches && primaryLocation.stateId) {
    const stateFallbackId = primaryLocation.stateId;
    trekPool = treks.filter((t) => t.stateId === stateFallbackId);
    offbeatPool = offbeatPlaces.filter((p) => p.stateId === stateFallbackId);

    const state = getStateById(stateFallbackId);
    const stateName = state?.name || stateFallbackId;
    plannerNotes = {
      level: "info",
      message: `We couldn't find direct matches for \"${destination}\" in our treks/off-beat data, so we're showing options around ${stateName}.`,
    };
  } else if (!initialTrekMatches && !initialOffbeatMatches && destination && !primaryLocation.stateId) {
    plannerNotes = {
      level: "warning",
      message: `We don't yet have specific routes for \"${destination}\", so this plan focuses more on flexible days and nearby stays.`,
    };
  }

  // 2) Basic budget filtering
  trekPool = filterByBudget(budgetPerDay, trekPool, 3500);
  offbeatPool = filterByBudget(budgetPerDay, offbeatPool, 2500);

  // 3) Prioritise by travel style and preferences
  if (!wantsTreks && (wantsOffbeat || wantsSpiritual)) {
    // user didn't explicitly ask for treks
    trekPool = trekPool.slice(0, 2);
  }

  if (!wantsOffbeat && (wantsTreks || wantsSpiritual)) {
    offbeatPool = offbeatPool.slice(0, 2);
  }

  // Simple ranking: shorter durations first when budget is tight
  if (trekPool.length) {
    trekPool = trekPool.slice().sort((a, b) => {
      const da = parseNumber(a.duration);
      const db = parseNumber(b.duration);

      let scoreA = da || 0;
      let scoreB = db || 0;

      // Budget: prefer shorter treks when budgetPerDay is low
      if (budgetPerDay && budgetPerDay < 2500) {
        scoreA += (da || 0) * 0.5;
        scoreB += (db || 0) * 0.5;
      }

      // Sunrise preference: boost treks mentioning sunrise/sunset/viewpoint
      const hasSunriseA =
        typeof a.description === "string" &&
        /sunrise|sunset|viewpoint|summit/i.test(a.description);
      const hasSunriseB =
        typeof b.description === "string" &&
        /sunrise|sunset|viewpoint|summit/i.test(b.description);
      if (wantsSunrise) {
        if (hasSunriseA && !hasSunriseB) scoreA -= 2;
        if (hasSunriseB && !hasSunriseA) scoreB -= 2;
      }

      // Pace: for "relaxed", prefer shorter treks; for "packed", slightly prefer longer
      if (tripPace === "relaxed") {
        scoreA += (da || 0) * 0.3;
        scoreB += (db || 0) * 0.3;
      } else if (tripPace === "packed") {
        scoreA -= (da || 0) * 0.2;
        scoreB -= (db || 0) * 0.2;
      }

      return scoreA - scoreB;
    });
  }

  const suggestedTreks = trekPool.slice(0, 4);
  const suggestedOffbeat = offbeatPool.slice(0, 4);

  let suggestedStays =
    primaryLocation.cityId || primaryLocation.stateId
      ? getStaysNearDestination(primaryLocation.cityId, primaryLocation.stateId, 20)
      : [];

  // Filter stays by total trip budget with stricter estimate
  if (totalBudget && totalDays && suggestedStays.length) {
    const nights = Math.max(1, totalDays);
    const rooms = Math.max(1, Math.ceil(totalTravelers > 0 ? totalTravelers / 2 : 1));

    suggestedStays = suggestedStays.filter((stay) => {
      if (!stay.priceRange) return true;
      const { min, max } = parseStayPriceRange(stay.priceRange);
      if (!min && !max) return true;
      const nightlyMax = max || min || null;
      if (!nightlyMax) return true;
      const approxTotal = nightlyMax * nights * rooms;
      return approxTotal <= totalBudget;
    });
  }

  const itinerary = [];

  // Destination-specific day plans (e.g. Kasol)
  const destinationLower = destination.toLowerCase();
  const placeWithDayPlans = offbeatPlaces.find(
    (p) =>
      Array.isArray(p.dayPlans) &&
      p.dayPlans.length > 0 &&
      (
        destinationLower.includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().includes(destinationLower) ||
        (primaryLocation.cityId && p.cityId === primaryLocation.cityId)
      )
  );

  if (placeWithDayPlans) {
    const maxDays = Math.min(totalDays, 6);
    const plansCount = Math.min(maxDays, placeWithDayPlans.dayPlans.length);

    for (let i = 0; i < plansCount; i++) {
      const plan = placeWithDayPlans.dayPlans[i];
      itinerary.push({
        day: `Day ${i + 1}`,
        title: plan.title,
        type: "experience",
        ref: { kind: "offbeat", id: placeWithDayPlans.id },
        notes: plan.description,
      });
    }

    for (let day = plansCount + 1; day <= maxDays; day++) {
      const label = `Day ${day}`;
      const slowNote =
        tripPace === "relaxed"
          ? "Keep this day slow with cafes, walks, and local markets."
          : tripPace === "packed"
          ? "Use this day to squeeze in an extra viewpoint, cafe hop, or short walk."
          : "Keep this day flexible for local recommendations, cafes, and slow walks.";

      itinerary.push({
        day: label,
        title: "Flexible exploration",
        type: tripPace === "packed" ? "active-flex" : "flex",
        notes: slowNote,
      });
    }
  } else {
    for (let day = 1; day <= Math.min(totalDays, 6); day++) {
      const label = `Day ${day}`;

      if (day === 1) {
        itinerary.push({
          day: label,
          title: "Arrival & local feel",
          type: avoidNightTravel ? "arrival-day" : "arrival",
          notes: avoidNightTravel
            ? "Arrive during the day, settle into your stay, and take a light walk around the area."
            : "Arrive, settle into your stay, and take a light walk around the area.",
        });
        continue;
      }

      const trek = suggestedTreks[day - 2];
      const offbeat = suggestedOffbeat[day - 2];

      if (wantsTreks && trek) {
        itinerary.push({
          day: label,
          title: trek.name,
          type: "trek",
          ref: { kind: "trek", id: trek.id },
          notes: trek.description,
        });
      } else if (offbeat) {
        itinerary.push({
          day: label,
          title: offbeat.name,
          type: "offbeat",
          ref: { kind: "offbeat", id: offbeat.id },
          notes: offbeat.description,
        });
      } else {
        const slowNote =
          tripPace === "relaxed"
            ? "Keep this day slow with cafes, walks, and local markets."
            : tripPace === "packed"
            ? "Use this day to squeeze in an extra viewpoint, cafe hop, or short walk."
            : "Keep this day flexible for local recommendations, cafes, and slow walks.";

        itinerary.push({
          day: label,
          title: "Flexible exploration",
          type: tripPace === "packed" ? "active-flex" : "flex",
          notes: slowNote,
        });
      }
    }

    if (totalDays >= 2 && itinerary.length >= totalDays) {
      itinerary[totalDays - 1] = {
        day: `Day ${totalDays}`,
        title: avoidNightTravel ? "Easy buffer & departure" : "Buffer & departure",
        type: "departure",
        notes: avoidNightTravel
          ? "Keep the last day easy for shopping and travel back during the day. Build in buffer for any delays."
          : "Keep the last day easy for shopping, buffer for delays, and travel back.",
      };
    }
  }

  return NextResponse.json({
    tripSummary: {
      destination,
      travelStyles,
      adults,
      children,
      pets,
      startDate,
      endDate,
      travelMode,
      budget: totalBudget,
      totalDays,
      totalTravelers,
      nights: totalDays,
      roomsAssumed: Math.max(1, Math.ceil(totalTravelers > 0 ? totalTravelers / 2 : 1)),
      budgetPerPersonPerDay: budgetPerDay ? Math.round(budgetPerDay) : null,
      budgetTag,
      wantsSunriseSpots: wantsSunrise,
      avoidNightTravel,
      tripPace,
    },
    suggestions: {
      treks: suggestedTreks,
      offbeat: suggestedOffbeat,
      stays: suggestedStays,
      primaryLocation,
    },
    meta: {
      plannerNotes,
    },
    itinerary,
  });
}

