"use client";

import Link from "next/link";
import { stays } from "@/data/stays";
import { useBooking } from "@/context/BookingContext";

const featuredStays = stays.slice(0, 6);

export default function FeaturedStays() {
  const { openBooking } = useBooking();

  return (
    <section className="py-8 sm:py-10">
      {/* Heading + View all within 90vw container */}
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 sm:mb-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Book your stay
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Hotels & stays
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-orange-500/80 bg-white px-4 py-2.5 text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white transition-colors"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      {/* Horizontal scroll rail */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch gap-4 sm:gap-5 pb-2 pr-4 sm:pr-6 lg:pr-8 snap-x snap-mandatory">
            {featuredStays.map((stay) => (
              <div
                key={stay.id}
                className="snap-start w-[66vw] sm:w-[46vw] md:w-[36vw] lg:w-[260px] xl:w-[280px] flex-shrink-0 group rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-200/60 transition-all duration-300"
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
                    <p className="text-xs text-white/90">
                      {stay.type} · {stay.city}
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{stay.state}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{stay.priceRange} / night</span>
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">
                      Stay
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openBooking({
                        type: "stays",
                        stay,
                        location: `${stay.city}, ${stay.state}`,
                      })
                    }
                    className="mt-4 w-full rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                  >
                    Book stay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          More stays available on each destination page.
        </p>
      </div>
    </section>
  );
}
