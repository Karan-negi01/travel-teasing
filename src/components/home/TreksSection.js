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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Curated adventures</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Adventure for every pace</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-emerald-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Beginner-friendly paths to expert summits, curated by season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTreks.map((trek, index) => (
            <Link
              key={trek.id}
              href={`/treks/${trek.id}`}
              className="group rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-emerald-200/60 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={trekImages[index % trekImages.length]}
                  alt={trek.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                  {trek.duration}
                </div>
                <div className="absolute top-3 right-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-semibold text-white">
                  {trek.difficulty}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold">{trek.name}</h3>
                  <p className="text-xs text-white/90 mt-0.5">{trek.state}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{trek.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>{trek.maxAltitude}</span>
                  <span>{trek.bestSeason}</span>
                </div>
                <span className="mt-4 inline-block text-sm font-semibold text-emerald-600 group-hover:underline">
                  View trek →
                </span>
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
