import Link from "next/link";
import { offbeatPlaces } from "@/data/offbeat";

const placeImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563794893-6a31d1c04a39?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578485746687-8efebfc318c8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565531856937-64bde8258773?q=80&w=2087&auto=format&fit=crop",
];

export default function OffbeatSection() {
  const featuredPlaces = offbeatPlaces.slice(0, 6);

  return (
    <section className="py-8 sm:py-10">
      {/* Heading + View all within 90vw container */}
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 sm:mb-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">
              Hidden picks
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Hidden gems, big stories
            </h2>
          </div>
          <Link
            href="/offbeat"
            className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-xl border border-violet-500/80 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 shadow-sm hover:bg-violet-500 hover:text-white transition-colors"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch gap-4 sm:gap-5 pb-2 pr-4 sm:pr-8 lg:pr-8 snap-x snap-mandatory">
            {featuredPlaces.map((place, index) => (
                <Link
                key={place.id}
                href={`/offbeat/${place.id}`}
                  className="snap-start w-[62vw] sm:w-[46vw] md:w-[36vw] lg:w-[260px] xl:w-[280px] flex-shrink-0 group rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-violet-200/60 transition-all duration-300"
              >
                <div className="relative h-44 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={placeImages[index % placeImages.length]}
                    alt={place.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                    {place.type}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-semibold drop-shadow">{place.name}</p>
                    <p className="text-xs text-white/90 mt-0.5">
                      {place.city}, {place.state}
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {place.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-600">
                    <span>{place.bestTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View all below cards */}
      <div className="sm:hidden max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-center">
        <Link
          href="/offbeat"
          className="inline-flex items-center justify-center gap-1.5 rounded-[3px] border border-violet-500/80 bg-white px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm hover:bg-violet-500 hover:text-white transition-colors"
        >
          View all
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
