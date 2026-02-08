import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { offbeatPlaces } from "@/data/offbeat";

export const metadata = {
  title: "Off-beat Places & Hidden Gems in India | TravelTeasing",
  description: "Discover India's hidden gems and off-beat destinations away from the crowds",
};

const placeImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
];

export default function OffbeatPage() {
  const featuredPlaces = offbeatPlaces.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — editorial style */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          alt="Hidden gems and off-beat places"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(168,85,247,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-violet-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Off-beat & Quiet Stays</span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              <span className="text-white/95">Hidden</span>
              <br />
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Gems & Off-beat Places</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
              Venture beyond the tourist trail to discover India&apos;s best-kept secrets.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#featured"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600 transition-all"
              >
                Signature stays
                <span className="text-violet-200">→</span>
              </Link>
              <Link
                href="#all-places"
                className="inline-flex items-center rounded-lg border border-white/50 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                View all places
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium text-white/60 uppercase tracking-wider">
              <span>Villages</span>
              <span>·</span>
              <span>Quiet stays</span>
              <span>·</span>
              <span>Unique culture</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="purple"
          items={[
            { label: "Slow travel", value: "Quiet stays & culture" },
            { label: "Unique", value: "Hidden corners of India" },
            { label: "Local", value: "Food, art, traditions" },
            { label: "Seasonal", value: "Best months to go" },
          ]}
        />
      </div>

      {/* Intro */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Beyond the usual tourist trail lie villages, homestays, and slow-travel experiences. These off-beat spots offer local culture, quiet landscapes, and unique stays. Each place includes the best time to visit, how to reach, and options for stays and transport so you can plan a relaxed, story-rich trip.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-4 sm:gap-6">
          <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm text-center hover:border-violet-200/60 hover:shadow-md transition-all">
            <p className="text-2xl font-bold text-violet-600 tabular-nums">{offbeatPlaces.length}+</p>
            <p className="text-sm text-gray-600 mt-1">Hidden destinations</p>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm text-center hover:border-violet-200/60 hover:shadow-md transition-all">
            <p className="text-2xl font-bold text-violet-600 tabular-nums">15+</p>
            <p className="text-sm text-gray-600 mt-1">States covered</p>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm text-center hover:border-violet-200/60 hover:shadow-md transition-all">
            <p className="text-2xl font-bold text-violet-600 tabular-nums">100%</p>
            <p className="text-sm text-gray-600 mt-1">Unique experiences</p>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm text-center hover:border-violet-200/60 hover:shadow-md transition-all col-span-2 md:col-span-1">
            <p className="text-2xl font-bold text-violet-600">∞</p>
            <p className="text-sm text-gray-600 mt-1">Memories</p>
          </div>
        </div>
      </section>

      {/* Off-beat stays we love */}
      <section id="featured" className="py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Signature experiences</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Off-beat stays we love</h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-violet-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Quiet villages, high valleys, and story-rich escapes.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredPlaces.map((place, index) => (
              <Link
                key={place.id}
                href={`/offbeat/${place.id}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-violet-200/60 transition-all duration-300"
              >
                <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={placeImages[(index + 1) % placeImages.length]}
                    alt={place.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900">
                    {place.type}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-semibold drop-shadow">{place.name}</p>
                    <p className="text-xs text-white/90 mt-0.5">{place.city}, {place.state}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{place.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{place.bestTime}</span>
                    <span className="rounded-full bg-violet-50 px-2.5 py-1 font-semibold text-violet-700">Off-beat</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All places */}
      <section id="all-places" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Hidden gems</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Explore all destinations</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-violet-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Lesser-known places with unforgettable stories.
          </p>
          <p className="text-xl md:text-2xl font-bold text-violet-500/90 tabular-nums mt-2">{offbeatPlaces.length}+</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-4 sm:gap-6">
          {offbeatPlaces.map((place, index) => (
            <Link
              key={place.id}
              href={`/offbeat/${place.id}`}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-violet-200/60 transition-all duration-300"
            >
              <div className="relative h-56 sm:h-auto sm:aspect-[16/10] overflow-hidden">
                <img
                  src={placeImages[index % placeImages.length]}
                  alt={place.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-sm">
                    {place.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">{place.name}</p>
                  <p className="text-xs text-white/90 mt-0.5">{place.city}, {place.state}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{place.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Best: {place.bestTime}</span>
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 font-semibold text-violet-700">Off-beat</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
