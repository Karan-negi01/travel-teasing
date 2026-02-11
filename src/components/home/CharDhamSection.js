import Link from "next/link";
import { charDham } from "@/data/temples";

export default function CharDhamSection() {
  const templeImages = {
    Badrinath:
      "https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=2070&auto=format&fit=crop",
    Dwarka:
      "https://images.unsplash.com/photo-1590415886116-8182ccd21c4d?q=80&w=2070&auto=format&fit=crop",
    "Puri (Jagannath)":
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
    Rameshwaram:
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=2071&auto=format&fit=crop",
  };

  return (
    <section id="explore-section" className="py-8 sm:py-10">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 sm:mb-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Char Dham
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-2">
              The sacred four
            </h2>
          </div>
          <Link
            href="/temples/char-dham"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-orange-500/80 bg-white px-4 py-2.5 text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white transition-colors"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {charDham.map((dham) => (
            <Link
              key={dham.id}
              href={`/temples/${dham.id}`}
              className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl hover:border-orange-200/60 transition-all duration-300"
            >
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img
                  src={
                    templeImages[dham.name] ||
                    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
                  }
                  alt={dham.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900">
                  {dham.state}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">{dham.name}</p>
                  <p className="text-xs text-white/90">{dham.city}</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {dham.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{dham.deity}</span>
                  <span>{dham.bestTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
