"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SaveButton from "@/components/common/SaveButton";

const STEPS = [
  { id: 1, label: "Dates" },
  { id: 2, label: "People" },
  { id: 3, label: "Budget" },
  { id: 4, label: "Destination" },
  { id: 5, label: "Stays" },
];

const BUDGET_BANDS = [
  { value: "", label: "Any" },
  { value: "low", label: "Under ₹2k/night" },
  { value: "mid", label: "₹2k – ₹4k/night" },
  { value: "high", label: "Above ₹4k/night" },
];

const STAY_TYPES = ["Hotel", "Homestay", "Resort", "Lodge", "Inn", "Guesthouse", "Boutique"];

function parsePriceRange(str) {
  if (!str) return { min: 0, max: 99999 };
  const nums = str.replace(/[^\d,]/g, "").split(",").map((s) => parseInt(s.trim(), 10)).filter(Boolean);
  if (nums.length === 0) return { min: 0, max: 99999 };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

function BookingContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState({
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });
  const [people, setPeople] = useState({
    adults: parseInt(searchParams.get("adults") || "1", 10) || 1,
    children: parseInt(searchParams.get("children") || "0", 10) || 0,
  });
  const [budgetBand, setBudgetBand] = useState(searchParams.get("budget") || "");
  const [destination, setDestination] = useState({
    stateId: "",
    cityId: "",
    stateName: "",
    cityName: "",
  });
  const [states, setStates] = useState([]);
  const [stays, setStays] = useState([]);
  const [staysLoading, setStaysLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [requestStay, setRequestStay] = useState(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: "", email: "", phone: "", message: "" });

  const near = searchParams.get("near") || searchParams.get("location") || searchParams.get("destination") || "";

  useEffect(() => {
    fetch("/api/states?includeCities=true")
      .then((r) => r.json())
      .then((data) => setStates(data.data || []))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!near || states.length === 0) return;
    const q = near.toLowerCase().trim();
    const state = states.find(
      (s) => s.name.toLowerCase().includes(q) || s.id.replace(/-/g, " ").includes(q)
    );
    if (state) {
      setDestination((d) => ({
        ...d,
        stateId: state.id,
        stateName: state.name,
      }));
      const city = (state.cities || []).find(
        (c) => c.name.toLowerCase().includes(q) || c.id.replace(/-/g, " ").includes(q)
      );
      if (city) {
        setDestination((d) => ({ ...d, cityId: city.id, cityName: city.name }));
      }
    }
  }, [near, states]);

  const fetchStays = useCallback(() => {
    if (!destination.stateId && !destination.cityId) return;
    setStaysLoading(true);
    const params = new URLSearchParams();
    if (destination.cityId) params.set("cityId", destination.cityId);
    else params.set("stateId", destination.stateId);
    fetch(`/api/stays?${params}`)
      .then((r) => r.json())
      .then((data) => setStays(data.data || []))
      .catch(() => setStays([]))
      .finally(() => setStaysLoading(false));
  }, [destination.stateId, destination.cityId]);

  useEffect(() => {
    if (step === 5 && (destination.stateId || destination.cityId)) {
      fetchStays();
    }
  }, [step, destination.stateId, destination.cityId, fetchStays]);

  const effectivePriceFilter = priceFilter || budgetBand;
  const filteredStays = stays.filter((s) => {
    if (typeFilter && s.type !== typeFilter) return false;
    const { min, max } = parsePriceRange(s.priceRange);
    if (effectivePriceFilter === "low" && max > 2000) return false;
    if (effectivePriceFilter === "mid" && (min > 4000 || max < 2000)) return false;
    if (effectivePriceFilter === "high" && min < 4000) return false;
    return true;
  });

  const canProceed = () => {
    if (step === 1) return dates.startDate && dates.endDate;
    if (step === 2) return people.adults >= 1;
    if (step === 3) return true;
    if (step === 4) return destination.stateId || destination.cityId;
    return true;
  };

  const handleNext = () => {
    if (step < 5 && canProceed()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const selectState = (state) => {
    setDestination({
      stateId: state.id,
      cityId: "",
      stateName: state.name,
      cityName: "",
    });
  };

  const selectCity = (city) => {
    setDestination((d) => ({
      ...d,
      cityId: city.id,
      cityName: city.name,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Book your stay</h1>
          <p className="mt-1 text-gray-600">Pick dates, guests, destination, then choose from curated stays.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex flex-col items-center gap-1 ${step >= s.id ? "text-orange-600" : "text-gray-400"}`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    step === s.id
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : step > s.id
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {step > s.id ? "✓" : s.id}
                </span>
                <span className="text-xs font-medium hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-0.5 rounded ${step > s.id ? "bg-orange-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Step 1: Dates */}
          {step === 1 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">When are you traveling?</h2>
              <p className="text-sm text-gray-500 mt-1">Check-in and check-out</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={dates.startDate}
                    onChange={(e) => setDates((d) => ({ ...d, startDate: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={dates.endDate}
                    onChange={(e) => setDates((d) => ({ ...d, endDate: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: People */}
          {step === 2 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Who&apos;s traveling?</h2>
              <p className="text-sm text-gray-500 mt-1">Adults and children</p>
              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPeople((p) => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-gray-300 text-gray-600 font-bold hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{people.adults}</span>
                    <button
                      type="button"
                      onClick={() => setPeople((p) => ({ ...p, adults: p.adults + 1 }))}
                      className="w-9 h-9 rounded-full border-2 border-orange-400 text-orange-600 font-bold hover:bg-orange-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Children</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPeople((p) => ({ ...p, children: Math.max(0, p.children - 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-gray-300 text-gray-600 font-bold hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{people.children}</span>
                    <button
                      type="button"
                      onClick={() => setPeople((p) => ({ ...p, children: p.children + 1 }))}
                      className="w-9 h-9 rounded-full border-2 border-orange-400 text-orange-600 font-bold hover:bg-orange-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Budget per night (optional)</h2>
              <p className="text-sm text-gray-500 mt-1">We&apos;ll show stays in this range</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {BUDGET_BANDS.map((b) => (
                  <button
                    key={b.value || "any"}
                    type="button"
                    onClick={() => setBudgetBand(b.value)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      budgetBand === b.value
                        ? "border-orange-400 bg-orange-50 text-orange-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-200"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Destination */}
          {step === 4 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Where do you want to stay?</h2>
              <p className="text-sm text-gray-500 mt-1">State and city</p>
              {near && (
                <p className="mt-2 text-sm text-orange-600">Pre-filled from your plan: {near}</p>
              )}
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">State</label>
                  <div className="flex flex-wrap gap-2">
                    {states.map((state) => (
                      <button
                        key={state.id}
                        type="button"
                        onClick={() => selectState(state)}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                          destination.stateId === state.id
                            ? "border-orange-400 bg-orange-50 text-orange-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                        }`}
                      >
                        {state.name}
                      </button>
                    ))}
                  </div>
                </div>
                {destination.stateId && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">City (optional)</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => selectCity({ id: "", name: "All state" })}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                          !destination.cityId
                            ? "border-orange-400 bg-orange-50 text-orange-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                        }`}
                      >
                        All state
                      </button>
                      {(states.find((s) => s.id === destination.stateId)?.cities || []).map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => selectCity(city)}
                          className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                            destination.cityId === city.id
                              ? "border-orange-400 bg-orange-50 text-orange-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                          }`}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Stays */}
          {step === 5 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Choose a stay</h2>
              <p className="text-sm text-gray-500 mt-1">
                {destination.cityName || destination.stateName || "Destination"}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <span className="text-xs font-medium text-gray-500">Type:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                >
                  <option value="">All</option>
                  {STAY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="text-xs font-medium text-gray-500 ml-2">Price:</span>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                >
                  <option value="">Any</option>
                  <option value="low">Under ₹2k</option>
                  <option value="mid">₹2k – ₹4k</option>
                  <option value="high">Above ₹4k</option>
                </select>
              </div>
              <div className="mt-6 space-y-4">
                {staysLoading ? (
                  <p className="text-gray-500 text-sm">Loading stays…</p>
                ) : filteredStays.length === 0 ? (
                  <p className="text-gray-500 text-sm">No stays match. Try another destination or filters.</p>
                ) : (
                  filteredStays.map((stay) => (
                    <div
                      key={stay.id}
                      className="flex gap-4 rounded-xl border border-gray-200 p-4 hover:border-orange-200 transition-colors"
                    >
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <SaveButton id={stay.id} type="stays" variant="card" className="absolute top-1 right-1" />
                        <img
                          src={stay.image}
                          alt={stay.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{stay.name}</h3>
                        <p className="text-sm text-gray-500">{stay.city}, {stay.state}</p>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs">
                          <span className="rounded bg-gray-100 px-2 py-0.5">{stay.type}</span>
                          <span className="text-amber-600 font-medium">★ {stay.rating}</span>
                          <span className="text-gray-600">{stay.priceRange}</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setRequestStay(stay);
                            setRequestSubmitted(false);
                            setRequestForm({ name: "", email: "", phone: "", message: "" });
                          }}
                          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                        >
                          Request to book
                        </button>
                        <Link
                          href={`/search?near=${encodeURIComponent(stay.city + ", " + stay.state)}`}
                          className="mt-1 text-center text-xs text-orange-600 hover:underline"
                        >
                          View options
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Request to book modal */}
          {requestStay && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => !requestSubmitted && setRequestStay(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="request-modal-title"
            >
              <div
                className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {requestSubmitted ? (
                  <div className="p-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-2xl text-emerald-600">
                      ✓
                    </div>
                    <h3 id="request-modal-title" className="mt-4 text-xl font-semibold text-gray-900">
                      Request received
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm">
                      We&apos;ll get back to you within 24 hours to confirm your stay at {requestStay.name}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setRequestStay(null)}
                      className="mt-6 w-full rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-6 border-b border-gray-100">
                      <h2 id="request-modal-title" className="text-lg font-semibold text-gray-900">
                        Request to book
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {requestStay.name} · {requestStay.city}, {requestStay.state}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {dates.startDate && dates.endDate
                          ? `${dates.startDate} – ${dates.endDate} · ${people.adults} adult(s)${people.children ? `, ${people.children} child(ren)` : ""}`
                          : "Add dates & guests in the steps above."}
                      </p>
                    </div>
                    <form
                      className="p-6 space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setRequestSubmitted(true);
                      }}
                    >
                      <div>
                        <label htmlFor="req-name" className="block text-xs font-medium text-gray-600 mb-1">
                          Name *
                        </label>
                        <input
                          id="req-name"
                          type="text"
                          required
                          value={requestForm.name}
                          onChange={(e) => setRequestForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="req-email" className="block text-xs font-medium text-gray-600 mb-1">
                          Email *
                        </label>
                        <input
                          id="req-email"
                          type="email"
                          required
                          value={requestForm.email}
                          onChange={(e) => setRequestForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="req-phone" className="block text-xs font-medium text-gray-600 mb-1">
                          Phone
                        </label>
                        <input
                          id="req-phone"
                          type="tel"
                          value={requestForm.phone}
                          onChange={(e) => setRequestForm((f) => ({ ...f, phone: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                          placeholder="10-digit number"
                        />
                      </div>
                      <div>
                        <label htmlFor="req-message" className="block text-xs font-medium text-gray-600 mb-1">
                          Message (optional)
                        </label>
                        <textarea
                          id="req-message"
                          rows={2}
                          value={requestForm.message}
                          onChange={(e) => setRequestForm((f) => ({ ...f, message: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                          placeholder="Special requests, arrival time..."
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setRequestStay(null)}
                          className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                        >
                          Request to book
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Footer buttons */}
          <div className="border-t border-gray-100 px-6 py-4 flex justify-between bg-gray-50/50">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Next
              </button>
            ) : (
              <Link
                href="/ai-planner"
                className="rounded-full border border-orange-300 px-5 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
              >
                Plan another trip
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-orange-600">
            ← Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Loading…</p>
          </div>
        }
      >
        <BookingContent />
      </Suspense>
    </div>
  );
}
