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
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700">
            🔱 Sacred Circuit
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900">
            The 12 Jyotirlingas
          </h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
          <p className="text-gray-600 mt-3">
            Twelve divine shrines of Lord Shiva, each with a unique story,
            architecture, and spiritual aura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {jyotirlingas.map((jyotirlinga, index) => (
            <Link
              key={jyotirlinga.id}
              href={`/temples/${jyotirlinga.id}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56">
                <img
                  src={templeImages[index]}
                  alt={jyotirlinga.name}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900">
                  #{jyotirlinga.number}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-semibold drop-shadow">
                    {jyotirlinga.name}
                  </p>
                  <p className="text-white/90 text-xs">
                    {jyotirlinga.city}, {jyotirlinga.state}
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {jyotirlinga.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{jyotirlinga.bestTime}</span>
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">
                    Temple
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/temples/jyotirlinga"
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
