"use client";

import { stays } from "@/data/stays";
import { useBooking } from "@/context/BookingContext";

const featuredStays = stays.slice(0, 6);

export default function FeaturedStays() {
  const { openBooking } = useBooking();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50/80 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Book your stay</p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Hotels & stays
          </h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
          <p className="mt-4 sm:mt-5 text-gray-600 text-sm md:text-base">
            Curated hotels, lodges and homestays near temples, treks and off-beat destinations. Book in one place.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredStays.map((stay) => (
            <div
              key={stay.id}
              className="group rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-200/60 transition-all duration-300"
            >
              <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900">
                  {stay.rating} ★
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">{stay.name}</p>
                  <p className="text-xs text-white/90">{stay.type} · {stay.city}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{stay.state}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{stay.priceRange} / night</span>
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">Stay</span>
                </div>
                <button
                  type="button"
                  onClick={() => openBooking({ type: "stays", stay, location: `${stay.city}, ${stay.state}` })}
                  className="mt-4 w-full rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                >
                  Book stay
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          More stays available on each destination page.
        </p>
      </div>
    </section>
  );
}
