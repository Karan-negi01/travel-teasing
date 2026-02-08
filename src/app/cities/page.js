import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { states, getAllCities, getStateById } from "@/data/locations";

export const metadata = {
  title: "Explore Indian Cities | TravelTeasing",
  description:
    "Browse curated cities for temples, treks, and off-beat experiences across India.",
};

export default function CitiesPage() {
  const allCities = getAllCities();
  const cityStyles = [
    { title: "Spiritual hubs", text: "Temple towns and sacred ghats." },
    { title: "Mountain gateways", text: "Base camps for treks and trails." },
    { title: "Hidden gems", text: "Quiet stays and slow travel." },
  ];
  const imagePool = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop"
          alt="Explore Indian cities"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(100,116,139,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-slate-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Explore by city</span>
            </div>
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Cities to discover
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-white/85 max-w-lg leading-relaxed">
              Local guides for spiritual circuits, treks, and hidden escapes.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="slate"
          items={[
            { label: "Cities", value: `${allCities.length} destinations` },
            { label: "States", value: `${states.length} regions` },
            { label: "Trip styles", value: "Temples, treks, off-beat" },
            { label: "Planning", value: "Custom itineraries" },
          ]}
        />
      </div>

      {/* Intro */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            From spiritual hubs and temple towns to mountain gateways and quiet getaways — each city page brings together nearby temples, treks, and off-beat spots. Pick a city to see what to do, where to stay, and how to get there so you can build a trip around one base or connect several.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">City style</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Ways to explore</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-20">
          {cityStyles.map((style) => (
            <div
              key={style.title}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-slate-200/80 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900">{style.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{style.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">City guides</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Browse all cities</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Pick a city to see nearby temples, treks, and hidden gems.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allCities.map((city, index) => {
            const state = getStateById(city.stateId);
            return (
              <Link
                key={city.id}
                href={`/cities/${city.id}`}
                className="group rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-slate-200/60 transition-all duration-300"
              >
                <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={imagePool[index % imagePool.length]}
                    alt={city.name}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-semibold drop-shadow">{city.name}</p>
                    <p className="text-xs text-white/90">{state?.name}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">Discover routes, stays, and local experiences.</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{state?.name}</span>
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">City</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
