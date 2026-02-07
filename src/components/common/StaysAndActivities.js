"use client";

import { useBooking } from "@/context/BookingContext";

const toneStyles = {
  orange: { text: "text-orange-600", iconBg: "bg-orange-100", border: "border-orange-200" },
  emerald: { text: "text-emerald-600", iconBg: "bg-emerald-100", border: "border-emerald-200" },
  violet: { text: "text-violet-600", iconBg: "bg-violet-100", border: "border-violet-200" },
};

const transportOptions = [
  { id: "train", label: "Train", icon: "🚂" },
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "cab", label: "Cab", icon: "🚗" },
  { id: "flight", label: "Flight", icon: "✈️" },
];

export default function StaysAndActivities({ title, location, tone = "orange", stays = [] }) {
  const { openBooking } = useBooking();
  const styles = toneStyles[tone] || toneStyles.orange;

  return (
    <section className="mb-10 sm:mb-14">
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Book your visit</p>
        <h2 className="mt-2 text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Stays, activities & transport</h2>
        <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
      </div>

      {/* Hotels – cards */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Hotels & stays near {title}</h3>
        <p className="text-gray-600 text-sm mb-5">Curated stays in {location}. Click to open booking.</p>
        {stays.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {stays.map((stay) => (
              <div
                key={stay.id}
                className="group rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-white/95 px-2 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                    {stay.rating} ★
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium drop-shadow-md">
                    {stay.type}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">{stay.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{stay.city}, {stay.state}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-2">{stay.priceRange} / night</p>
                  <button
                    type="button"
                    onClick={() => openBooking({ type: "stays", stay, location: `${stay.city}, ${stay.state}` })}
                    className={`mt-4 w-full rounded-xl py-2.5 text-sm font-semibold text-white ${tone === "orange" ? "bg-orange-500 hover:bg-orange-600" : tone === "emerald" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-violet-500 hover:bg-violet-600"} transition-colors`}
                  >
                    Book stay
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 text-center">
            <p className="text-gray-600 text-sm">More stays for this destination coming soon.</p>
            <button
              type="button"
              onClick={() => openBooking({ type: "stays", destination: title, location })}
              className={`mt-3 text-sm font-semibold ${styles.text}`}
            >
              View all stays →
            </button>
          </div>
        )}
      </div>

      {/* Activities */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Activities & experiences</h3>
        <p className="text-gray-600 text-sm mb-5">Guided visits and local tours.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => openBooking({ type: "activities", destination: title, location })}
            className={`group rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-4 text-left ${styles.border} hover:border-opacity-60`}
          >
            <div className={`flex-shrink-0 h-12 w-12 rounded-xl ${styles.iconBg} flex items-center justify-center text-xl`}>
              🎯
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900">Guided visits & rituals</h4>
              <p className="text-sm text-gray-600">Local guides and experiences</p>
            </div>
            <span className={`text-sm font-semibold ${styles.text}`}>Book →</span>
          </button>
          <button
            type="button"
            onClick={() => openBooking({ type: "activities", destination: title, location })}
            className={`group rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-4 text-left ${styles.border} hover:border-opacity-60`}
          >
            <div className={`flex-shrink-0 h-12 w-12 rounded-xl ${styles.iconBg} flex items-center justify-center text-xl`}>
              ✨
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900">Tours & experiences</h4>
              <p className="text-sm text-gray-600">Day trips and cultural tours</p>
            </div>
            <span className={`text-sm font-semibold ${styles.text}`}>Explore →</span>
          </button>
        </div>
      </div>

      {/* Transport */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Book transport</h3>
        <p className="text-gray-600 text-sm mb-5">Train, bus, cab, or flight to {location}.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {transportOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => openBooking({ type: "transport", mode: opt.id, destination: location })}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200/80 bg-gray-50/50 py-4 hover:bg-white hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
