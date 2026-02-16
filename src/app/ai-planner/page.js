"use client";

import { useState, useRef, useEffect } from "react";
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
};

function TypingIndicator() {
  return (
    <div className="flex w-full gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-400/25 border border-orange-400/40">
        <span className="text-sm font-bold">N</span>
      </div>
      <div className="rounded-2xl rounded-tl-md bg-white/50 backdrop-blur-md px-4 py-3.5 border border-white/50 shadow-md">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-orange-400 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-amber-400 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-orange-300 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function ItineraryCard({ tripData }) {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-white/60 bg-white/95 backdrop-blur-sm shadow-xl shadow-black/10">
      <div className="border-b-2 border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50/90 px-6 py-5">
        <div className="flex items-center gap-2 text-orange-600">
          <span className="text-lg" aria-hidden>📍</span>
          <h3 className="text-lg font-semibold text-stone-900">Your trip summary</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {tripData.destination || "Your destination"} ·{" "}
          {tripData.travelStyles?.length ? tripData.travelStyles.join(", ") : "All styles"} ·{" "}
          {[tripData.adults, tripData.children, tripData.pets].some((n) => n > 0)
            ? `${(tripData.adults || 0) + (tripData.children || 0)} travelers${(tripData.pets || 0) > 0 ? `, ${tripData.pets} pet(s)` : ""}`
            : "—"} ·{" "}
          {tripData.startDate && tripData.endDate
            ? `${tripData.startDate} → ${tripData.endDate}`
            : "—"} · {tripData.travelMode || "—"} · Budget: {tripData.budget ? `₹${Number(tripData.budget).toLocaleString("en-IN")}` : "—"}
        </p>
      </div>

      <div className="border-b border-stone-100 px-6 py-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-stone-800">
          <span aria-hidden>📅</span> Day-wise breakdown
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-stone-600">
          <li className="flex gap-2"><span className="font-medium text-stone-500 w-12">Day 1</span> Arrival & check-in</li>
          <li className="flex gap-2"><span className="font-medium text-stone-500 w-12">Day 2</span> Sightseeing</li>
          <li className="flex gap-2"><span className="font-medium text-stone-500 w-12">Day 3</span> Exploration</li>
          <li className="flex gap-2"><span className="font-medium text-stone-500 w-12">Day 4</span> Departure</li>
        </ul>
      </div>

      <div className="border-b border-stone-100 bg-amber-50 px-6 py-4 text-center text-sm text-amber-800">
        🏨 Hotels will appear here after backend integration.
      </div>

      <div className="flex flex-wrap gap-3 p-6">
        <Link
          href="/search"
          className="flex-1 min-w-[140px] rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-center text-sm font-semibold text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-400/25 transition-all duration-200"
        >
          Book Hotels
        </Link>
        <button
          type="button"
          className="flex-1 min-w-[140px] rounded-full border-2 border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
        >
          Customize Plan
        </button>
        <Link
          href="/plan-trip"
          className="flex-1 min-w-[140px] rounded-full border-2 border-orange-200 bg-white px-4 py-3 text-center text-sm font-semibold text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
        >
          Explore Group Trips
        </Link>
      </div>
    </div>
  );
}

export default function AIPlannerPage() {
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState(initialTripData);
  const [messages, setMessages] = useState([
    { role: "bot", content: "What kind of journey do you have in mind? Pick one or more." },
  ]);
  const [showTyping, setShowTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

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
    goNextWithTyping(6, "What is your total trip budget? (Enter amount in ₹)");
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const budget = inputValue.trim();
    if (!budget) return;
    setTripData((d) => ({ ...d, budget }));
    addUserMessage(`₹${Number(budget).toLocaleString("en-IN")}`);
    setInputValue("");
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      addBotMessage("Here’s a draft plan based on your choices. You can book stays or customize further.");
      setStep(7);
    }, TYPING_DELAY_MS);
  };

  const bgImage =
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070&auto=format&fit=crop";

  const formCard =
    "w-full max-w-[85%] sm:max-w-[75%] rounded-3xl border border-white/50 bg-white/40 backdrop-blur-md overflow-hidden shadow-xl shadow-black/10";
  const formHeader =
    "border-l-4 border-orange-400/80 bg-gradient-to-r from-white/30 to-white/10 px-4 py-3.5";
  const formTitle = "text-xs font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2";
  const formHint = "text-[11px] text-gray-500/90 mt-1";
  const formBody = "p-4 sm:p-5";
  const btnPrimary =
    "rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-400/30 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:shadow-orange-400/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";
  const inputUser =
    "rounded-2xl border-2 border-white/40 bg-white/50 backdrop-blur-md px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300/60 transition-all duration-200";

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Travel image - full background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/50" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col min-h-0 pt-4 sm:pt-6 pb-8 px-4 sm:px-6">
        {/* Playful header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-4 py-2.5 shadow-lg border border-white/60 mb-4">
            <span className="text-orange-500 font-black text-xl">N</span>
            <span className="font-bold text-gray-800">Nomii</span>
            <span className="text-lg" aria-hidden>🧳</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Where to next?
          </h1>
          <p className="mt-2 text-white/95 text-sm sm:text-base drop-shadow-md font-medium">
            Let&apos;s plan your adventure — just a few quick questions!
          </p>
        </div>

        {/* Chat area - fixed height so no layout shift when step content changes (e.g. travelers) */}
        <div className="w-full max-w-xl mx-auto h-[calc(100vh-11rem)] min-h-[380px] flex flex-col shrink-0">
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto overflow-x-hidden rounded-3xl bg-white/35 backdrop-blur-md border border-white/40 shadow-2xl shadow-black/10 p-4 sm:p-6"
          >
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </ChatBubble>
          ))}

          {showTyping && <TypingIndicator />}

          {/* Step 1: Travel style */}
          {step === 1 && !showTyping && (
            <div className="flex flex-col items-end gap-3">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}><span aria-hidden>✨</span> Pick your vibe</p>
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
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Destination */}
          {step === 2 && (
            <form onSubmit={handleDestinationSubmit} className="flex justify-end">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}><span aria-hidden>📍</span> Where to?</p>
                  <p className={formHint}>City, state or region</p>
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
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 3 && !showTyping && (
            <div className="flex flex-col items-end gap-3">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}><span aria-hidden>👥</span> Who&apos;s traveling?</p>
                  <p className={formHint}>Add at least one traveler</p>
                </div>
                <div className={`${formBody} space-y-2`}>
                  <CounterSelector label="Adults" value={tripData.adults} onIncrement={() => setTripData((d) => ({ ...d, adults: (d.adults || 0) + 1 }))} onDecrement={() => setTripData((d) => ({ ...d, adults: Math.max(0, (d.adults || 0) - 1) }))} />
                  <CounterSelector label="Children" value={tripData.children} onIncrement={() => setTripData((d) => ({ ...d, children: (d.children || 0) + 1 }))} onDecrement={() => setTripData((d) => ({ ...d, children: Math.max(0, (d.children || 0) - 1) }))} />
                  <CounterSelector label="Pets" value={tripData.pets} onIncrement={() => setTripData((d) => ({ ...d, pets: (d.pets || 0) + 1 }))} onDecrement={() => setTripData((d) => ({ ...d, pets: Math.max(0, (d.pets || 0) - 1) }))} />
                </div>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <button type="button" onClick={handleTravelersSubmit} disabled={(tripData.adults || 0) + (tripData.children || 0) < 1} className={`w-full ${btnPrimary}`}>
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && !showTyping && (
            <div className="flex flex-col items-end gap-3">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}><span aria-hidden>📅</span> Travel dates</p>
                  <p className={formHint}>Start and end of your trip</p>
                </div>
                <div className={formBody}>
                  <DateSelector startDate={tripData.startDate} endDate={tripData.endDate} onStartChange={(v) => setTripData((d) => ({ ...d, startDate: v }))} onEndChange={(v) => setTripData((d) => ({ ...d, endDate: v }))} />
                  <button type="button" onClick={handleDatesSubmit} disabled={!tripData.startDate || !tripData.endDate} className={`mt-4 w-full ${btnPrimary}`}>
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && !showTyping && (
            <div className="flex flex-col items-end gap-3">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}><span aria-hidden>🚌</span> How will you get there?</p>
                  <p className={formHint}>Pick your transport</p>
                </div>
                <div className={formBody}>
                  <TravelModeSelector value={tripData.travelMode} onChange={(v) => setTripData((d) => ({ ...d, travelMode: v }))} />
                  <button type="button" onClick={handleTravelModeSubmit} disabled={!tripData.travelMode} className={`mt-4 w-full ${btnPrimary}`}>
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 6 && !showTyping && (
            <form onSubmit={handleBudgetSubmit} className="flex justify-end">
              <div className={formCard}>
                <div className={formHeader}>
                  <p className={formTitle}><span aria-hidden>💰</span> Trip budget (₹)</p>
                  <p className={formHint}>Total amount for the trip</p>
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
                    <button type="submit" className={`shrink-0 ${btnPrimary}`}>
                      Get my plan →
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 7 && !showTyping && (
            <div className="flex justify-start">
              <div className="w-full max-w-[85%] sm:max-w-none">
                <ItineraryCard tripData={tripData} />
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
