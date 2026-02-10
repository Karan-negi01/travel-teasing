import Link from "next/link";
import { treks } from "@/data/treks";

const trekImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2070&auto=format&fit=crop",
];

export default function TreksSection() {
  const featuredTreks = treks.slice(0, 6);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Curated adventures</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Adventure for every pace</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-emerald-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Beginner-friendly paths to expert summits, curated by season.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredTreks.map((trek, index) => (
            <Link
              key={trek.id}
              href={`/treks/${trek.id}`}
              className="group rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-emerald-200/60 transition-all duration-300"
            >
              <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                <img
                  src={trekImages[index % trekImages.length]}
                  alt={trek.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                  {trek.duration}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">{trek.name}</p>
                  <p className="text-xs text-white/90 mt-0.5">{trek.state}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{trek.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{trek.bestSeason}</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">Trek</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/treks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            View all treks
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
