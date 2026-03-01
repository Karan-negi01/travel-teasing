import { NextResponse } from "next/server";
import { allTemples } from "@/data/temples";
import { treks } from "@/data/treks";
import { offbeatPlaces } from "@/data/offbeat";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q) {
    return NextResponse.json({
      temples: [],
      treks: [],
      offbeat: [],
    });
  }

  const term = q.toLowerCase();

  const temples = allTemples.filter(
    (temple) =>
      temple.name.toLowerCase().includes(term) ||
      temple.state.toLowerCase().includes(term) ||
      temple.city.toLowerCase().includes(term) ||
      temple.description.toLowerCase().includes(term)
  );

  const trekResults = treks.filter(
    (trek) =>
      trek.name.toLowerCase().includes(term) ||
      trek.state.toLowerCase().includes(term) ||
      trek.description.toLowerCase().includes(term)
  );

  const offbeat = offbeatPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(term) ||
      place.state.toLowerCase().includes(term) ||
      place.city.toLowerCase().includes(term) ||
      place.description.toLowerCase().includes(term)
  );

  return NextResponse.json({
    temples,
    treks: trekResults,
    offbeat,
  });
}

