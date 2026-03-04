"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import ChatBubble from "@/components/ai-planner/ChatBubble";
import OptionChips from "@/components/ai-planner/OptionChips";
import CounterSelector from "@/components/ai-planner/CounterSelector";
import TravelModeSelector from "@/components/ai-planner/TravelModeSelector";
import DateSelector from "@/components/ai-planner/DateSelector";

const TRAVEL_STYLES = ["Spiritual", "Treks & Adventure", "Offbeat"];
const TYPING_DELAY_MS = 800;

const initialTripData = {
  destination: "",
  travelStyles: [],
  adults: 0,
  children: 0,
  pets: 0,
  startDate: "",
  endDate: "",
  travelMode: "",
  budget: "",
  wantsSunriseSpots: false,
  avoidNightTravel: false,
  tripPace: "balanced",
};

function TypingIndicator() {
  return (
    <div className="flex w-full gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-200/40 animate-pulse">
        <span className="text-sm font-bold">N</span>
      </div>
      <div className="rounded-2xl rounded-tl-md bg-gradient-to-br from-violet-50 to-white px-4 py-3.5 border border-violet-100 shadow-sm">
        <p className="text-xs font-semibold text-violet-700 mb-2">Nomii is thinking…</p>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function ItineraryCard({ tripData, planData, planError }) {
  const summary = planData?.tripSummary || null;
  const itinerary = planData?.itinerary || null;
  const suggestions = planData?.suggestions || null;
  const primaryLocation = suggestions?.primaryLocation || null;
  const plannerNotes = planData?.meta?.plannerNotes || null;

  const displayTrip = summary || tripData;

  const bookingParams = new URLSearchParams();
  if (displayTrip.destination) bookingParams.set("destination", displayTrip.destination);
  if (displayTrip.startDate) bookingParams.set("startDate", displayTrip.startDate);
  if (displayTrip.endDate) bookingParams.set("endDate", displayTrip.endDate);
  if (displayTrip.adults != null) bookingParams.set("adults", String(displayTrip.adults));
  if (displayTrip.children != null) bookingParams.set("children", String(displayTrip.children));
  if (displayTrip.budget) bookingParams.set("budget", String(displayTrip.budget));
  const bookingUrl = bookingParams.toString() ? `/booking?${bookingParams.toString()}` : "/booking";

  const budgetPerPersonPerDay = summary?.budgetPerPersonPerDay || null;
  const budgetTag = summary?.budgetTag || null;
  const nights = summary?.nights || null;
  const roomsAssumed = summary?.roomsAssumed || null;

  let budgetHint = "";
  if (budgetPerPersonPerDay && budgetTag) {
    if (budgetTag === "Budget") {
      budgetHint =
        "Great for budget trips — expect simple stays and focusing on a few strong highlights.";
    } else if (budgetTag === "Comfortable") {
      budgetHint =
        "Balanced budget — you can mix comfortable homestays with a couple of splurges.";
    } else if (budgetTag === "Premium") {
      budgetHint =
        "Premium range — you can look at better view stays, private cabs, and slower travel days.";
    }
  }

  const dayItems =
    Array.isArray(itinerary) && itinerary.length > 0
      ? itinerary.filter((item) => item && item.day)
      : [
          { day: "Day 1", title: "Arrival & check-in", notes: "" },
          { day: "Day 2", title: "Sightseeing", notes: "" },
          { day: "Day 3", title: "Exploration", notes: "" },
          { day: "Day 4", title: "Departure", notes: "" },
        ];

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-xl shadow-violet-500/15">
      {/* Block 1: Trip at a glance */}
      <div className="border-b border-violet-100 bg-gradient-to-br from-violet-50 via-white to-purple-50/50 px-6 py-5 relative">
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <span aria-hidden>✓</span> Plan ready
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold shadow-md">✨</span>
          <h3 className="text-violet-800 text-lg font-bold">
            Trip at a glance
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {displayTrip.destination || "Your destination"} ·{" "}
          {displayTrip.travelStyles?.length ? displayTrip.travelStyles.join(", ") : "All styles"} ·{" "}
          {[displayTrip.adults, displayTrip.children, displayTrip.pets].some((n) => n > 0)
            ? `${(displayTrip.adults || 0) + (displayTrip.children || 0)} travelers${(displayTrip.pets || 0) > 0 ? `, ${displayTrip.pets} pet(s)` : ""}`
            : "—"} ·{" "}
          {displayTrip.startDate && displayTrip.endDate
            ? `${displayTrip.startDate} → ${displayTrip.endDate}`
            : "—"} · {displayTrip.travelMode || "—"} · Budget:{" "}
          {displayTrip.budget
            ? `₹${Number(displayTrip.budget).toLocaleString("en-IN")}`
            : summary?.budget
            ? `₹${Number(summary.budget).toLocaleString("en-IN")}`
            : "—"}
        </p>
        {budgetPerPersonPerDay && (
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-violet-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    budgetTag === "Budget"
                      ? "bg-emerald-500"
                      : budgetTag === "Comfortable"
                      ? "bg-violet-500"
                      : "bg-rose-500"
                  }`}
                  style={{
                    width:
                      budgetTag === "Budget"
                        ? "30%"
                        : budgetTag === "Comfortable"
                        ? "60%"
                        : "90%",
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-stone-700 px-2 py-1 rounded-full bg-white/80 border border-violet-100">
                {budgetTag} · ~₹{budgetPerPersonPerDay.toLocaleString("en-IN")}/person/day
              </span>
            </div>
            {budgetHint && (
              <p className="text-xs text-stone-500">{budgetHint}</p>
            )}
            {nights && roomsAssumed && displayTrip.budget && (
              <p className="text-[11px] text-stone-400">
                Stays picked to roughly fit ₹{Number(displayTrip.budget).toLocaleString("en-IN")} for {nights} night(s), assuming ~{roomsAssumed} room(s).
              </p>
            )}
          </div>
        )}
        {suggestions && (suggestions.treks?.length > 0 || suggestions.offbeat?.length > 0 || (Array.isArray(suggestions.stays) && suggestions.stays.length > 0)) && (
          <div className="mt-3 pt-3 border-t border-violet-100/80">
            <p className="text-[11px] font-semibold text-stone-500 mb-1.5">Stays & highlights</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.treks?.slice(0, 2).map((t) => (
                <span key={`t-${t.id}`} className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-violet-900 border border-violet-100">🥾 {t.name}</span>
              ))}
              {suggestions.offbeat?.slice(0, 2).map((p) => (
                <span key={`p-${p.id}`} className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-violet-900 border border-violet-100">🌄 {p.name}</span>
              ))}
              {Array.isArray(suggestions.stays) && suggestions.stays.slice(0, 3).map((s) => (
                <span key={`s-${s.id}`} className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-violet-900 border border-violet-100">
                  {s.name}{s.priceRange ? ` · ${s.priceRange}` : ""}
                </span>
              ))}
            </div>
          </div>
        )}
        {plannerNotes && plannerNotes.message && (
          <p
            className={`mt-3 text-xs px-3 py-2 rounded-lg border ${
              plannerNotes.level === "warning"
                ? "bg-red-50 border-red-100 text-red-800"
                : "bg-violet-50 border-violet-100 text-violet-800"
            }`}
          >
            {plannerNotes.message}
          </p>
        )}
      </div>

      {/* Block 2: Day-wise timeline */}
      <div className="border-b border-violet-100 px-6 py-5 bg-white">
        <h4 className="flex items-center gap-2 text-sm font-bold text-stone-800 mb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600 text-xs">📅</span>
          Day-wise timeline
        </h4>
        <div className="space-y-0">
          {dayItems.map((item, i) => (
            <div key={item.day} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0 w-6">
                <div className="h-3.5 w-3.5 rounded-full bg-violet-500 border-2 border-white shadow-md shrink-0 mt-3.5" />
                {i < dayItems.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[20px] bg-violet-200 my-0.5 rounded-full" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="rounded-xl border border-violet-100 bg-violet-50/30 px-4 py-3.5 text-sm">
                  <p className="text-[11px] font-bold text-violet-600 uppercase tracking-wide">{item.day}</p>
                  <p className="font-semibold text-stone-800 mt-1">{item.title}</p>
                  {item.notes && (
                    <p className="text-xs text-stone-500 mt-1.5 line-clamp-2">{item.notes}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {planError && (
        <div className="border-b border-red-100 bg-red-50 px-6 py-3 text-xs text-red-700">
          {planError}
        </div>
      )}

      {/* Block 3: What you can do now */}
      <div className="px-6 py-6 bg-gradient-to-b from-violet-50/60 to-white border-t border-violet-50">
        <p className="text-xs font-bold text-violet-700 mb-4 uppercase tracking-wider">What you can do now</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link
            href={bookingUrl}
            className="flex-1 min-w-[160px] rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-4 text-center text-sm font-semibold text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span aria-hidden>📋</span> Book this trip
          </Link>
          <Link
            href="/search"
            className="flex-1 min-w-[160px] rounded-xl border-2 border-violet-200 bg-white px-5 py-4 text-center text-sm font-semibold text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span aria-hidden>🏨</span> Browse Hotels
          </Link>
          <Link
            href="/plan-trip"
            className="flex-1 min-w-[160px] rounded-xl border-2 border-violet-200 bg-white px-5 py-4 text-center text-sm font-semibold text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span aria-hidden>👥</span> Explore Group Trips
          </Link>
        </div>
      </div>
    </div>
  );
}

function AIPlannerPageInner() {
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState(initialTripData);
  const [messages, setMessages] = useState([
    { role: "bot", content: "What kind of journey do you have in mind? Pick one or more." },
  ]);
  const [showTyping, setShowTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [planData, setPlanData] = useState(null);
  const [planError, setPlanError] = useState("");
  const [loadedFromShare, setLoadedFromShare] = useState(false);
  const scrollRef = useRef(null);
  const searchParams = useSearchParams();

  const STEPS = [
    { id: 1, label: "Vibe" },
    { id: 2, label: "Destination" },
    { id: 3, label: "People" },
    { id: 4, label: "Dates" },
    { id: 5, label: "Travel" },
    { id: 6, label: "Preferences" },
    { id: 7, label: "Budget" },
    { id: 8, label: "Plan" },
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, showTyping]);

  const addBotMessage = (content) => {
    setMessages((m) => [...m, { role: "bot", content }]);
  };

  const addUserMessage = (content) => {
    setMessages((m) => [...m, { role: "user", content }]);
  };

  const goNextWithTyping = (nextStep, botMessage) => {
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      addBotMessage(botMessage);
      setStep(nextStep);
    }, TYPING_DELAY_MS);
  };

  // Step 1: Travel style first
  const handleTravelStylesSubmit = () => {
    if (!tripData.travelStyles?.length) return;
    addUserMessage(tripData.travelStyles.join(", "));
    goNextWithTyping(2, "Where would you like to travel?");
  };

  // Step 2: Destination
  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    const dest = inputValue.trim();
    if (!dest) return;
    setTripData((d) => ({ ...d, destination: dest }));
    addUserMessage(dest);
    setInputValue("");
    goNextWithTyping(3, "How many people (and pets) are traveling?");
  };

  const handleTravelersSubmit = () => {
    const total = (tripData.adults || 0) + (tripData.children || 0);
    if (total < 1) return;
    addUserMessage(
      `${tripData.adults} adult(s), ${tripData.children} child(ren)${(tripData.pets || 0) > 0 ? `, ${tripData.pets} pet(s)` : ""}`
    );
    goNextWithTyping(4, "When are you traveling? Select your dates.");
  };

  const handleDatesSubmit = () => {
    if (!tripData.startDate || !tripData.endDate) return;
    addUserMessage(`${tripData.startDate} to ${tripData.endDate}`);
    goNextWithTyping(5, "How would you like to travel?");
  };

  const handleTravelModeSubmit = () => {
    if (!tripData.travelMode) return;
    addUserMessage(tripData.travelMode);
    goNextWithTyping(
      6,
      "Before budget, a couple of quick preferences — okay?"
    );
  };

  const handlePreferencesSubmit = () => {
    const prefsSummaryParts = [];
    if (tripData.wantsSunriseSpots) prefsSummaryParts.push("sunrise/sunset points");
    if (tripData.avoidNightTravel) prefsSummaryParts.push("avoid night travel");
    if (tripData.tripPace === "relaxed") prefsSummaryParts.push("relaxed pace");
    if (tripData.tripPace === "packed") prefsSummaryParts.push("packed schedule");
    if (!prefsSummaryParts.length) prefsSummaryParts.push("no strong preferences");

    addUserMessage(prefsSummaryParts.join(", "));
    goNextWithTyping(7, "Got it. What is your total trip budget? (Enter amount in ₹)");
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const budget = inputValue.trim();
    if (!budget) return;
    setTripData((d) => ({ ...d, budget }));
    addUserMessage(`₹${Number(budget).toLocaleString("en-IN")}`);
    setInputValue("");
    setShowTyping(true);
    setPlanError("");

    (async () => {
      try {
        const res = await fetch("/api/plan-trip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...tripData, budget }),
        });

        if (!res.ok) {
          throw new Error("Failed to create plan");
        }

        const data = await res.json();
        setPlanData(data);
        addBotMessage(
          "Here’s a draft plan based on your choices. You can book stays or customize further."
        );
        setStep(8);
      } catch (err) {
        console.error(err);
        setPlanError(
          "Couldn’t generate a smart plan right now. Showing a basic outline instead."
        );
        addBotMessage(
          "I had trouble generating a detailed plan, but here’s a simple outline you can start with."
        );
        setStep(8);
      } finally {
        setShowTyping(false);
      }
    })();
  };

  const regenerateWithPace = (newPace) => {
    setTripData((d) => ({ ...d, tripPace: newPace }));
    setShowTyping(true);
    setPlanError("");
    (async () => {
      try {
        const payload = { ...tripData, tripPace: newPace };
        const res = await fetch("/api/plan-trip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to regenerate");
        const data = await res.json();
        setPlanData(data);
        const msg =
          newPace === "relaxed"
            ? "Done — plan tweaked for a more relaxed pace."
            : newPace === "packed"
            ? "Done — plan tweaked for a busier schedule."
            : "Done — plan reset to balanced.";
        addBotMessage(msg);
      } catch (err) {
        console.error(err);
        setPlanError("Couldn’t tweak the plan. Try changing budget or dates.");
      } finally {
        setShowTyping(false);
      }
    })();
  };

  useEffect(() => {
    const sharedParam = searchParams.get("plan");
    if (!sharedParam || loadedFromShare) return;

    try {
      const decoded = JSON.parse(decodeURIComponent(sharedParam));
      setTripData((d) => ({ ...d, ...decoded }));
      setMessages([
        { role: "bot", content: "Loaded a shared trip setup. You can tweak anything or regenerate." },
      ]);
      setLoadedFromShare(true);
      setShowTyping(true);
      setPlanError("");

      (async () => {
        try {
          const res = await fetch("/api/plan-trip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decoded),
          });
          if (!res.ok) throw new Error("Failed to create plan");
          const data = await res.json();
          setPlanData(data);
          addBotMessage("Here’s a draft plan based on this shared setup. You can customize further.");
          setStep(7);
        } catch (err) {
          console.error(err);
          setPlanError("Couldn’t generate a smart plan from this shared link. You can still step through the questions.");
          setStep(1);
        } finally {
          setShowTyping(false);
        }
      })();
    } catch (e) {
      console.error("Failed to load shared plan", e);
      setLoadedFromShare(true);
    }
  }, [searchParams, loadedFromShare]);

  const bgImage =
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070&auto=format&fit=crop";

  const formCard =
    "w-full max-w-[85%] sm:max-w-[78%] rounded-3xl overflow-hidden shadow-xl shadow-black/15 border border-white/80 bg-white/95 backdrop-blur-sm";
  const formHeader =
    "px-5 sm:px-6 py-5 border-b border-violet-100 bg-gradient-to-br from-violet-50 via-white to-purple-50/30";
  const formTitle = "text-base sm:text-lg font-bold text-stone-800 flex items-center gap-3";
  const formHint = "text-sm text-stone-500 mt-2 leading-relaxed";
  const formBody = "p-5 sm:p-6 bg-white/80";
  const btnPrimary =
    "group rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:from-violet-600 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center gap-2";
  const btnArrow = "inline-block transition-transform duration-200 group-hover:translate-x-0.5";
  const inputUser =
    "rounded-xl border-2 border-violet-100 bg-violet-50/50 px-4 py-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 focus:bg-white transition-all duration-200";

  const currentStepLabel = STEPS.find((s) => s.id === step)?.label || "Plan";

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background — travel image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(ellipse 90% 70% at 50% 30%, transparent 0%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col min-h-0 pt-5 sm:pt-8 pb-10 px-4 sm:px-6">
        {/* Header — compact, app-like */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/98 backdrop-blur-xl px-5 py-3.5 shadow-2xl shadow-violet-500/15 border border-white mb-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-base font-black shadow-lg shadow-violet-500/30 ring-2 ring-violet-200/50">
              N
            </div>
            <div className="text-left relative">
              <p className="font-bold text-gray-900 text-lg leading-tight">Nomii</p>
              <p className="text-xs text-violet-600 font-semibold">Your trip planner</p>
            </div>
            <span className="text-2xl relative" aria-hidden>🧳</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
            Where to next?
          </h1>
          <p className="mt-2 text-white/90 text-sm sm:text-base max-w-sm mx-auto drop-shadow-sm">
            Answer a few questions — get a personalised plan in 2 minutes.
          </p>
        </div>

        {/* Progress — single bar + current step name */}
        <div className="max-w-xl mx-auto w-full mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm">
              {currentStepLabel}
            </span>
            <span className="text-xs font-semibold text-white/80 tabular-nums">
              {step}/8
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white/20 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 via-violet-500 to-purple-500 transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${(step / 8) * 100}%`, boxShadow: "0 0 12px rgba(139,92,246,0.4)" }}
            />
          </div>
          <div className="flex justify-between mt-2 gap-1">
            {STEPS.map((s) => (
              <span
                key={s.id}
                className={`text-[10px] font-medium hidden sm:inline truncate ${
                  step >= s.id ? "text-violet-200" : "text-white/40"
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Chat area — card style, clean */}
        <div className="w-full max-w-xl mx-auto h-[calc(100vh-14rem)] min-h-[320px] flex flex-col shrink-0">
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 flex flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-3xl bg-white shadow-2xl shadow-black/25 border border-violet-100/80 p-5 sm:p-6"
          >
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} className="animate-bubble-in">
              <p className="text-[15px] leading-relaxed">{msg.content}</p>
            </ChatBubble>
          ))}

          {showTyping && <TypingIndicator />}

          {/* Step 1: Travel style */}
          {step === 1 && !showTyping && (
            <div className="flex flex-col items-end gap-3 animate-planner-step-in">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg" aria-hidden>✨</span>
                    <span>Pick your vibe</span>
                  </p>
                  <p className={formHint}>Choose one or more</p>
                </div>
                <div className={formBody}>
                  <OptionChips
                    options={TRAVEL_STYLES}
                    selected={tripData.travelStyles}
                    onChange={(v) => setTripData((d) => ({ ...d, travelStyles: v }))}
                    multiple
                  />
                  <button
                    type="button"
                    onClick={handleTravelStylesSubmit}
                    disabled={!tripData.travelStyles?.length}
                    className={`mt-4 w-full ${btnPrimary}`}
                  >
                    Next <span className={btnArrow}>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Destination */}
          {step === 2 && (
            <form onSubmit={handleDestinationSubmit} className="flex justify-end animate-planner-step-in">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg" aria-hidden>📍</span>
                    <span>Where to?</span>
                  </p>
                  <p className={formHint}>Kasol, Rishikesh, Goa… jo bhi dimag me aaye likh do 🙂</p>
                </div>
                <div className={formBody}>
                  <div className="flex gap-3 flex-wrap">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="e.g. Rishikesh, Himachal, Kerala..."
                      className={`${inputUser} flex-1 min-w-[180px]`}
                    />
                    <button type="submit" className={`shrink-0 ${btnPrimary}`}>
                      Next <span className={btnArrow}>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 3 && !showTyping && (
            <div className="flex flex-col items-end gap-3 animate-planner-step-in">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg" aria-hidden>👥</span>
                    <span>Who&apos;s traveling?</span>
                  </p>
                  <p className={formHint}>Add at least one traveler</p>
                </div>
                <div className={`${formBody} space-y-2`}>
                  <CounterSelector label="Adults" value={tripData.adults} onIncrement={() => setTripData((d) => ({ ...d, adults: (d.adults || 0) + 1 }))} onDecrement={() => setTripData((d) => ({ ...d, adults: Math.max(0, (d.adults || 0) - 1) }))} />
                  <CounterSelector label="Children" value={tripData.children} onIncrement={() => setTripData((d) => ({ ...d, children: (d.children || 0) + 1 }))} onDecrement={() => setTripData((d) => ({ ...d, children: Math.max(0, (d.children || 0) - 1) }))} />
                  <CounterSelector label="Pets" value={tripData.pets} onIncrement={() => setTripData((d) => ({ ...d, pets: (d.pets || 0) + 1 }))} onDecrement={() => setTripData((d) => ({ ...d, pets: Math.max(0, (d.pets || 0) - 1) }))} />
                </div>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <button type="button" onClick={handleTravelersSubmit} disabled={(tripData.adults || 0) + (tripData.children || 0) < 1} className={`w-full ${btnPrimary}`}>
                    Next <span className={btnArrow}>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && !showTyping && (
            <div className="flex flex-col items-end gap-3 animate-planner-step-in">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg" aria-hidden>📅</span>
                    <span>Travel dates</span>
                  </p>
                  <p className={formHint}>Start and end of your trip</p>
                </div>
                <div className={formBody}>
                  <DateSelector startDate={tripData.startDate} endDate={tripData.endDate} onStartChange={(v) => setTripData((d) => ({ ...d, startDate: v }))} onEndChange={(v) => setTripData((d) => ({ ...d, endDate: v }))} />
                  <button type="button" onClick={handleDatesSubmit} disabled={!tripData.startDate || !tripData.endDate} className={`mt-4 w-full ${btnPrimary}`}>
                    Next <span className={btnArrow}>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && !showTyping && (
            <div className="flex flex-col items-end gap-3 animate-planner-step-in">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg" aria-hidden>🚌</span>
                    <span>How will you get there?</span>
                  </p>
                  <p className={formHint}>Pick your transport</p>
                </div>
                <div className={formBody}>
                  <TravelModeSelector value={tripData.travelMode} onChange={(v) => setTripData((d) => ({ ...d, travelMode: v }))} />
                  <button type="button" onClick={handleTravelModeSubmit} disabled={!tripData.travelMode} className={`mt-4 w-full ${btnPrimary}`}>
                    Next <span className={btnArrow}>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 6 && !showTyping && (
            <div className="flex flex-col items-end gap-3 animate-planner-step-in">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg" aria-hidden>⚙️</span>
                    <span>Trip preferences</span>
                  </p>
                  <p className={formHint}>Help Nomii fine-tune your plan</p>
                </div>
                <div className={`${formBody} space-y-4`}>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setTripData((d) => ({
                          ...d,
                          wantsSunriseSpots: !d.wantsSunriseSpots,
                        }))
                      }
                      className={`rounded-full border-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                        tripData.wantsSunriseSpots
                          ? "border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-200/50"
                          : "border-stone-200 bg-white text-stone-600 hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700"
                      }`}
                    >
                      🌅 Sunrise / sunset points
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setTripData((d) => ({
                          ...d,
                          avoidNightTravel: !d.avoidNightTravel,
                        }))
                      }
                      className={`rounded-full border-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                        tripData.avoidNightTravel
                          ? "border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-200/50"
                          : "border-stone-200 bg-white text-stone-600 hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700"
                      }`}
                    >
                      🌙 Prefer no night buses
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-stone-600">
                      Trip pace
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "relaxed", label: "Relaxed" },
                        { key: "balanced", label: "Balanced" },
                        { key: "packed", label: "Packed" },
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() =>
                            setTripData((d) => ({
                              ...d,
                              tripPace: opt.key,
                            }))
                          }
                          className={`rounded-full border-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                            tripData.tripPace === opt.key
                              ? "border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-200/50"
                              : "border-stone-200 bg-white text-stone-600 hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-700"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePreferencesSubmit}
                    className={`w-full ${btnPrimary}`}
                  >
                    Next <span className={btnArrow}>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 7 && !showTyping && (
            <form onSubmit={handleBudgetSubmit} className="flex justify-end animate-planner-step-in">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg" aria-hidden>💰</span>
                    <span>Trip budget (₹)</span>
                  </p>
                  <p className={formHint}>Approx guess bhi chalega, exact nahi chahiye.</p>
                </div>
                <div className={formBody}>
                  <div className="flex gap-3 flex-wrap">
                    <input
                      type="number"
                      inputMode="numeric"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="e.g. 50000"
                      min="1"
                      className={`${inputUser} flex-1 min-w-[140px]`}
                    />
                    <button type="submit" className={`shrink-0 ${btnPrimary} ring-2 ring-violet-300/50 ring-offset-2 ring-offset-transparent shadow-xl shadow-violet-400/30`}>
                      Get my plan <span className={btnArrow}>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 8 && !showTyping && (
            <div className="flex justify-start">
              <div className="w-full max-w-[85%] sm:max-w-none space-y-4">
                <div className="animate-planner-result-in">
                  <ItineraryCard tripData={tripData} planData={planData} planError={planError} />
                </div>
                <div className="rounded-2xl border border-violet-100 bg-violet-50/50 px-4 py-3 shadow-sm animate-planner-step-in">
                  <p className="text-xs font-semibold text-violet-700 mb-2">Tweak answers</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-full border-2 border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-all"
                    >
                      ✏️ Change destination
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="rounded-full border-2 border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-all"
                    >
                      ✏️ Change dates
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInputValue(tripData.budget ? String(tripData.budget) : "");
                        setStep(7);
                      }}
                      className="rounded-full border-2 border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-all"
                    >
                      ✏️ Change budget
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-stone-500 mt-3 mb-2">How does this feel?</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={showTyping}
                      onClick={() => regenerateWithPace("relaxed")}
                      className="rounded-full border-2 border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 hover:bg-violet-50 hover:border-violet-200 disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                      Too chill 😴
                    </button>
                    <button
                      type="button"
                      disabled={showTyping}
                      onClick={() => regenerateWithPace("balanced")}
                      className="rounded-full border-2 border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 hover:bg-violet-50 hover:border-violet-200 disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                      Just right 🙂
                    </button>
                    <button
                      type="button"
                      disabled={showTyping}
                      onClick={() => regenerateWithPace("packed")}
                      className="rounded-full border-2 border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 hover:bg-violet-50 hover:border-violet-200 disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                      Too packed 🏃‍♂️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIPlannerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white">
          <p className="text-violet-600 font-medium">Loading planner…</p>
        </div>
      }
    >
      <AIPlannerPageInner />
    </Suspense>
  );
}
