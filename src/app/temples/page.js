import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { allTemples } from "@/data/temples";

export const metadata = {
  title: "Sacred Temples of India | TravelTeasing",
  description: "Explore India's most sacred temples including Char Dham, 12 Jyotirlingas, and more",
};

const categoryImages = {
  "4-dham": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
  jyotirlinga: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
  "mini-char-dham": "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop",
  shaktipeeth: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
  "sacred-places": "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
};

const circuitImages = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop",
];

const templeImages = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590415886116-8182ccd21c4d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620766182966-c60657eea523?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588411138074-5919b4036dfd?q=80&w=800&auto=format&fit=crop",
];

const categoryLabels = {
  "4-dham": "Char Dham",
  jyotirlinga: "Jyotirlinga",
  "mini-char-dham": "Mini Char Dham",
  shaktipeeth: "51 Shaktipeeth",
  "sacred-places": "Sacred Places",
};

const categorySlugs = {
  "4-dham": "char-dham",
  jyotirlinga: "jyotirlinga",
  "mini-char-dham": "mini-char-dham",
  shaktipeeth: "shaktipeeth",
  "sacred-places": "#temples",
};

const bentoCategories = [
  { id: "4-dham", name: "Char Dham", count: 4, subtitle: "Pan-India" },
  { id: "jyotirlinga", name: "12 Jyotirlingas", count: 12, subtitle: "shrines" },
  { id: "mini-char-dham", name: "Mini Char Dham", count: 4, subtitle: "Uttarakhand" },
  { id: "shaktipeeth", name: "51 Shaktipeeth", count: 51, subtitle: "sacred abodes" },
  { id: "sacred-places", name: "Sacred Places", count: null, subtitle: "Explore more" },
];

const featuredCircuits = [
  {
    title: "Char Dham Circuit",
    description: "The four sacred dhams across India in one timeless route.",
    href: "/temples/char-dham",
  },
  {
    title: "12 Jyotirlingas",
    description: "The divine Shiva shrines, each with a distinct legend.",
    href: "/temples/jyotirlinga",
  },
  {
    title: "Mini Char Dham",
    description: "Uttarakhand's compact pilgrimage circuit in the Himalayas.",
    href: "/temples/mini-char-dham",
  },
  {
    title: "51 Shaktipeeth",
    description: "Sacred abodes of the Goddess, where Sati's body parts fell.",
    href: "/temples/shaktipeeth",
  },
];

export default function TemplesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero - editorial style */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
          alt="Sacred temples of India"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(249,115,22,0.08),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-orange-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Pilgrimage & Heritage</span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              <span className="text-white/95">Sacred</span>
              <br />
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Temples of India</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
              Embark on a spiritual journey through India&apos;s most revered temples and divine legends.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
              <Link
                href="#circuits"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-all min-h-[44px]"
              >
                Explore circuits
                <span className="text-orange-200">→</span>
              </Link>
              <Link
                href="#temples"
                className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/5 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all min-h-[44px]"
              >
                View all temples
              </Link>
            </div>
            <div className="mt-6 sm:mt-10 flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider">
              <span>Char Dham</span>
              <span>·</span>
              <span>12 Jyotirlingas</span>
              <span>·</span>
              <span>51 Shaktipeeth</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="orange"
          items={[
            { label: "Heritage", value: "Ancient shrines & legends" },
            { label: "Rituals", value: "Aarti timings & festivals" },
            { label: "Plan", value: "Best months & travel tips" },
            { label: "Stay", value: "Curated stays nearby" },
          ]}
        />
      </div>

      {/* Intro */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            India&apos;s temple heritage spans millennia — from the Char Dham and 12 Jyotirlingas to 51 Shaktipeeth and countless sacred sites. Here you can explore circuits, read stories and rituals, and find the best time to visit. Each temple page includes nearby stays and transport so you can plan the full journey.
          </p>
        </div>
      </section>

      {/* Sacred circuits — bento */}
      <section id="circuits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Choose your path</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Sacred circuits</h2>
          <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mx-auto" />
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Each circuit is a journey. Pick one and discover its temples in order.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[252px_252px] gap-5 lg:gap-6">
          <Link
            href={`/temples/${categorySlugs[bentoCategories[0].id]}`}
            className="group relative lg:row-span-2 min-h-[320px] lg:min-h-[504px] rounded-3xl overflow-hidden"
          >
            <img
              src={categoryImages[bentoCategories[0].id]}
              alt={bentoCategories[0].name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-300">The four dhams</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold">{bentoCategories[0].name}</h3>
              <p className="mt-2 text-white/80">{bentoCategories[0].count} sacred sites · {bentoCategories[0].subtitle}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-orange-300 font-semibold group-hover:gap-3 transition-all">
                Explore circuit
                <span>→</span>
              </span>
            </div>
          </Link>
          <Link
            href={`/temples/${categorySlugs[bentoCategories[1].id]}`}
            className="group relative min-h-[240px] lg:min-h-0 rounded-3xl overflow-hidden"
          >
            <img
              src={categoryImages[bentoCategories[1].id]}
              alt={bentoCategories[1].name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold">{bentoCategories[1].name}</h3>
              <p className="text-sm text-white/85 mt-1">{bentoCategories[1].count} {bentoCategories[1].subtitle}</p>
              <span className="mt-4 text-sm font-semibold text-orange-300 group-hover:text-orange-200">View →</span>
            </div>
          </Link>
          <Link
            href={`/temples/${categorySlugs[bentoCategories[2].id]}`}
            className="group relative min-h-[240px] lg:min-h-0 rounded-3xl overflow-hidden"
          >
            <img
              src={categoryImages[bentoCategories[2].id]}
              alt={bentoCategories[2].name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold">{bentoCategories[2].name}</h3>
              <p className="text-sm text-white/85 mt-1">{bentoCategories[2].count} sites · {bentoCategories[2].subtitle}</p>
              <span className="mt-4 text-sm font-semibold text-orange-300 group-hover:text-orange-200">View →</span>
            </div>
          </Link>
          <Link
            href={`/temples/${categorySlugs[bentoCategories[3].id]}`}
            className="group relative min-h-[240px] lg:min-h-0 rounded-3xl overflow-hidden"
          >
            <img
              src={categoryImages[bentoCategories[3].id]}
              alt={bentoCategories[3].name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold">{bentoCategories[3].name}</h3>
              <p className="text-sm text-white/85 mt-1">{bentoCategories[3].count} {bentoCategories[3].subtitle} · Pan-India</p>
              <span className="mt-4 text-sm font-semibold text-orange-300 group-hover:text-orange-200">View →</span>
            </div>
          </Link>
          <Link
            href={`/temples/${categorySlugs[bentoCategories[4].id]}`}
            className="group relative min-h-[240px] lg:min-h-0 rounded-3xl overflow-hidden"
          >
            <img
              src={categoryImages[bentoCategories[4].id]}
              alt={bentoCategories[4].name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold">{bentoCategories[4].name}</h3>
              <p className="text-sm text-white/85 mt-1">{bentoCategories[4].subtitle}</p>
              <span className="mt-4 text-sm font-semibold text-orange-300 group-hover:text-orange-200">View →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Quote divider */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl text-white/90 leading-relaxed italic">
            &ldquo;In the stillness of these ancient stones, the divine and the human meet.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold text-orange-400 uppercase tracking-widest">
            TravelTeasing · Sacred Trails
          </p>
        </div>
      </section>

      {/* Popular pilgrimage routes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Curated for you</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Popular pilgrimage routes</h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Timeless routes to follow, from Char Dham to Shaktipeeth.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCircuits.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:border-orange-200/60 hover:shadow-lg hover:shadow-orange-50/20 transition-all duration-300"
              >
                <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={circuitImages[index]}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-orange-600 shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600">
                    Explore route
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Temples */}
      <section id="temples" className="py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Browse all</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">All Temples</h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              From sacred circuits to hidden sanctums across India.
            </p>
            <p className="text-xl md:text-2xl font-bold text-orange-500/90 tabular-nums mt-2">{allTemples.length}+</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {allTemples.map((temple, index) => (
              <Link
                key={temple.id}
                href={`/temples/${temple.id}`}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-orange-200/60 transition-all duration-300"
              >
                <div className="relative h-56 sm:h-auto sm:aspect-[16/10] overflow-hidden">
                  <img
                    src={templeImages[index % templeImages.length]}
                    alt={temple.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-sm">
                      {categoryLabels[temple.category] || temple.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-semibold drop-shadow">{temple.name}</p>
                    <p className="text-xs text-white/90 mt-0.5">{temple.city}, {temple.state}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {temple.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">Temple</span>
                    <span className="text-sm font-semibold text-orange-600 group-hover:underline">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
