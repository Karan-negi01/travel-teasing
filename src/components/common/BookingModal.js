"use client";

import { useBooking } from "@/context/BookingContext";
import { useEffect } from "react";

const transportLabels = { train: "Train", bus: "Bus", cab: "Cab", flight: "Flight" };

export default function BookingModal() {
  const { isOpen, type, mode, destination, location, stay, closeBooking } = useBooking();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isStays = type === "stays";
  const isActivities = type === "activities";
  const isTransport = type === "transport";
  const toPlace = destination || location;

  const title = isStays && stay
    ? `Book ${stay.name}`
    : isStays
    ? "Book your stay"
    : isActivities
    ? "Book activities"
    : isTransport
    ? `Book ${transportLabels[mode] || "Transport"}`
    : "Book";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeBooking}
      />
      <div className="relative w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden mx-2 sm:mx-0">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50/80 flex-shrink-0">
          <h2 id="booking-modal-title" className="text-base sm:text-lg font-bold text-gray-900 truncate pr-2">
            {title}
          </h2>
          <button
            type="button"
            onClick={closeBooking}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 min-h-0">
          {isStays && stay && (
            <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900">{stay.name}</p>
                <p className="text-sm text-gray-500">{stay.city}, {stay.state}</p>
                <p className="text-sm font-medium text-orange-600 mt-1">{stay.priceRange} / night</p>
              </div>
            </div>
          )}

          {toPlace && (isTransport || isActivities) && (
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Destination:</span> {toPlace}
            </p>
          )}

          {isStays && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  aria-describedby="checkin-hint"
                />
                <p id="checkin-hint" className="text-xs text-gray-500 mt-1">Select your dates</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          {isTransport && (
            <p className="text-sm text-gray-600">
              Search {transportLabels[mode]?.toLowerCase()} options to {toPlace || "your destination"}. Full booking integration coming soon.
            </p>
          )}

          {isActivities && (
            <p className="text-sm text-gray-600">
              Request guided visits or tours for {toPlace || "this destination"}. We’ll get back with options.
            </p>
          )}

          <div className="rounded-xl bg-amber-50 border border-amber-200/80 px-4 py-3 text-sm text-amber-800">
            <strong>Coming soon.</strong> Booking will open shortly. You can explore destinations and save your favourites.
          </div>
        </div>

        <div className="flex gap-3 px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
          <button
            type="button"
            onClick={closeBooking}
            className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            className="flex-1 rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            onClick={closeBooking}
          >
            Notify me when ready
          </button>
        </div>
      </div>
    </div>
  );
}
