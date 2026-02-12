import Link from "next/link";
import { getAllCities, getStateById } from "@/data/locations";

export default function CitiesSpotlight() {
  const cities = getAllCities().slice(0, 6);
  const imagePool = [
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <section className="py-8 sm:py-10">
      {/* Heading + View all within 90vw container */}
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 sm:mb-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              City guides
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-2">
              Cities for every travel mood
            </h2>
          </div>
          <Link
            href="/cities"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-black/80 bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-white transition-colors"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Horizontal scroll rail full-width, padded so left matches heading */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch gap-4 sm:gap-5 pb-2 pr-4 sm:pr-6 lg:pr-8 snap-x snap-mandatory">
            {cities.map((city, index) => {
              const state = getStateById(city.stateId);
              return (
                <Link
                  key={city.id}
                  href={`/cities/${city.id}`}
                  className="snap-start w-[68vw] sm:w-[40vw] md:w-[32vw] lg:w-[260px] xl:w-[280px] flex-shrink-0 group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-all"
                >
                  <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                    <img
                      src={imagePool[index % imagePool.length]}
                      alt={city.name}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-sm font-semibold drop-shadow">
                        {city.name}
                      </p>
                      <p className="text-xs text-white/90">{state?.name}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      Curated routes, stays, and local tips.
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
