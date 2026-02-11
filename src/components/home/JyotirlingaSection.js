import Link from "next/link";
import { jyotirlingas } from "@/data/temples";

export default function JyotirlingaSection() {
  const templeImages = [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588411138074-5919b4036dfd?q=80&w=2076&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590415886116-8182ccd21c4d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 sm:mb-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Sacred circuit
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-2">
              The 12 Jyotirlingas
            </h2>
          </div>
          <Link
            href="/temples/jyotirlinga"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-orange-500/80 bg-white px-4 py-2.5 text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white transition-colors"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5">
          {jyotirlingas.map((jyotirlinga, index) => (
            <Link
              key={jyotirlinga.id}
              href={`/temples/${jyotirlinga.id}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:border-orange-200/60 transition-all duration-300"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={templeImages[index]}
                  alt={jyotirlinga.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow leading-tight">
                    {jyotirlinga.name}
                  </p>
                  <p className="text-xs text-white/90 mt-0.5">
                    {jyotirlinga.city}, {jyotirlinga.state}
                  </p>
                </div>
              </div>
              <div className="p-3 sm:p-4 space-y-1.5">
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  {jyotirlinga.description}
                </p>
                <p className="text-xs text-gray-500">{jyotirlinga.bestTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
