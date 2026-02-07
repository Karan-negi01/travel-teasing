"use client";

import { useBooking } from "@/context/BookingContext";

const options = [
  { id: "train", label: "Train", icon: "🚂", desc: "IRCTC & rail" },
  { id: "bus", label: "Bus", icon: "🚌", desc: "Intercity & local" },
  { id: "cab", label: "Cab", icon: "🚗", desc: "Outstation & city" },
  { id: "flight", label: "Flight", icon: "✈️", desc: "Domestic flights" },
];

export default function TransportStrip() {
  const { openBooking } = useBooking();

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 px-2">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Get there</p>
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Book transport
          </h2>
          <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm max-w-lg mx-auto">
            Train, bus, cab or flight — book travel for your trip in one place.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => openBooking({ type: "transport", mode: opt.id, destination: "" })}
              className="flex flex-col items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50/50 px-4 sm:px-6 py-4 sm:py-6 hover:bg-orange-50 hover:border-orange-200 transition-all group min-h-[100px] sm:min-h-0"
            >
              <span className="text-2xl sm:text-3xl">{opt.icon}</span>
              <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {opt.label}
              </span>
              <span className="text-xs text-gray-500">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
