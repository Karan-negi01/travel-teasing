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
    <section id="explore-section" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Char Dham</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
            The sacred four
          </h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
          <p className="text-gray-600 mt-2">
            Spiritual journeys that balance heritage, nature, and mythology.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 sm:gap-8">
          {charDham.map((dham) => (
            <Link
              key={dham.id}
              href={`/temples/${dham.id}`}
              className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56 sm:h-72">
                <img
                  src={
                    templeImages[dham.name] ||
                    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
                  }
                  alt={dham.name}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                />
                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                  {dham.state}
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {dham.name}
                    </h3>
                    <p className="text-sm text-gray-500">{dham.city}</p>
                  </div>
                  <span className="rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs font-semibold">
                    Top pick
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {dham.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{dham.deity}</span>
                  <span>{dham.bestTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/temples/char-dham"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            View all
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
