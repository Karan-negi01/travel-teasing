import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { states, getCitiesByState, getAllCities } from "@/data/locations";

export const metadata = {
  title: "Explore Indian States | TravelTeasing",
  description:
    "Browse Indian states for temples, treks, and off-beat escapes with curated city guides.",
};

export default function StatesPage() {
  const popularStates = states.filter((state) => state.popular);
  const totalCities = getAllCities().length;
  const themes = [
    { title: "Himalayan escapes", text: "Snowy peaks, treks, and quiet valleys." },
    { title: "Heritage heartlands", text: "Temples, forts, and timeless culture." },
    { title: "Coastal slow travel", text: "Beaches, seafood, and serene towns." },
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
    <div className="min-h-screen">
      <Navbar />

      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
          alt="Explore Indian states"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(100,116,139,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-slate-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Explore by state</span>
            </div>
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              States of India
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-white/85 max-w-lg leading-relaxed">
              From the Himalayas to the coasts — discover places by region and culture.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="slate"
          items={[
            { label: "States", value: `${states.length} regions` },
            { label: "Popular", value: `${popularStates.length} highlights` },
            { label: "Cities", value: `${totalCities} destinations` },
            { label: "Trips", value: "Custom, no packages" },
          ]}
        />
      </div>

      {/* Intro */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Each state brings its own mix of temples, treks, and hidden getaways. Explore by region to see popular states and all states — then drill into cities and specific destinations. Perfect when you want to plan by geography rather than by theme.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Travel theme</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Ways to explore</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-20">
          {themes.map((theme) => (
            <div
              key={theme.title}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-slate-200/80 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900">{theme.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{theme.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Trending</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Popular right now</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Most loved regions for pilgrimages, treks, and off-beat stays.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
          {popularStates.map((state, index) => (
            <Link
              key={state.id}
              href={`/states/${state.id}`}
              className="group rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-slate-200/60 transition-all duration-300"
            >
              <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                <img
                  src={imagePool[index % imagePool.length]}
                  alt={state.name}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">{state.name}</p>
                  <p className="text-xs text-white/90">
                    {getCitiesByState(state.id).length} cities to explore
                  </p>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{state.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{getCitiesByState(state.id).length} cities</span>
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">State</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">All regions</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">All states</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {states.map((state, index) => (
            <Link
              key={state.id}
              href={`/states/${state.id}`}
              className="group rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-slate-200/60 transition-all duration-300"
            >
              <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                <img
                  src={imagePool[(index + 2) % imagePool.length]}
                  alt={state.name}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">{state.name}</p>
                  <p className="text-xs text-white/90">{getCitiesByState(state.id).length} cities</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{state.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{getCitiesByState(state.id).length} cities</span>
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">State</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
