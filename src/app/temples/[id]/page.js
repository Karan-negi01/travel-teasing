import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import StaysAndActivities from "@/components/common/StaysAndActivities";
import Link from "next/link";
import { getTempleById, getTemplesByCity, allTemples } from "@/data/temples";
import { getStaysNearDestination } from "@/data/stays";
import { notFound } from "next/navigation";

const templeImages = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590415886116-8182ccd21c4d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070&auto=format&fit=crop",
];

export async function generateStaticParams() {
  return allTemples.map((temple) => ({
    id: temple.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const temple = getTempleById(id);
  if (!temple) return { title: "Temple Not Found | TravelTeasing" };
  return {
    title: `${temple.name} - ${temple.state} | TravelTeasing`,
    description: temple.description,
  };
}

export default async function TempleDetailPage({ params }) {
  const { id } = await params;
  const temple = getTempleById(id);
  if (!temple) notFound();

  const templeIndex = allTemples.findIndex((t) => t.id === temple.id);
  const heroImage = templeImages[(templeIndex >= 0 ? templeIndex : 0) % templeImages.length];
  const relatedTemples = getTemplesByCity(temple.cityId).filter((t) => t.id !== temple.id).slice(0, 3);
  const nearbyStays = getStaysNearDestination(temple.cityId, temple.stateId, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — editorial (same theme as listing) */}
      <section className="relative min-h-[45vh] sm:min-h-[55vh] flex flex-col justify-center overflow-hidden">
        <img src={heroImage} alt={temple.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(249,115,22,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-orange-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Sacred Temple</span>
            </div>
            <h1 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] break-words">
              {temple.name}
            </h1>
            <p className="mt-3 text-lg text-white/85">{temple.city}, {temple.state}</p>
            {temple.deity && (
              <p className="mt-2 text-sm text-white/70">Dedicated to {temple.deity}</p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="orange"
          items={[
            { label: "Deity", value: temple.deity || "Sacred temple" },
            { label: "Best time", value: temple.bestTime || "All year" },
            { label: "Timings", value: temple.templeTimings || "Daily rituals" },
            { label: "Stay nearby", value: "Curated lodges" },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10">
          <div>
            {/* Quick info */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Essential info</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">At a glance</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mb-6" />
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Deity</p>
                    <p className="mt-1 text-gray-900">{temple.deity || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Best time</p>
                    <p className="mt-1 text-gray-900">{temple.bestTime || "—"}</p>
                  </div>
                  {temple.templeTimings && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Temple timings</p>
                      <p className="mt-1 text-gray-900">{temple.templeTimings}</p>
                    </div>
                  )}
                  {temple.aartiTimings && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Aarti</p>
                      <p className="mt-1 text-gray-900">{temple.aartiTimings}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* About */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Story</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">About this temple</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mb-6" />
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed">{temple.description}</p>
                {temple.significance && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Significance</h3>
                    <p className="text-gray-700 leading-relaxed">{temple.significance}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Mythology */}
            {temple.mythology && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Heritage</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Mythology & history</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mb-6" />
                <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-6 md:p-8 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">{temple.mythology}</p>
                </div>
              </section>
            )}

            {/* Prasad & Festivals */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Rituals & festivals</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Prasad & festivals</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
                {temple.prasad && (
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Prasad</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{temple.prasad}</p>
                  </div>
                )}
                {temple.festivals && temple.festivals.length > 0 && (
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Major festivals</h3>
                    <ul className="space-y-2">
                      {temple.festivals.map((f, i) => (
                        <li key={i} className="flex items-center text-gray-700 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            <StaysAndActivities title={temple.name} location={`${temple.city}, ${temple.state}`} tone="orange" stays={nearbyStays} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sticky top-24">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Trip snapshot</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">Quick facts</h3>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mb-4" />
              <ul className="space-y-3 text-sm text-gray-700">
                <li><span className="font-semibold text-gray-900">Location:</span> {temple.city}, {temple.state}</li>
                {temple.altitude && <li><span className="font-semibold text-gray-900">Altitude:</span> {temple.altitude}</li>}
                <li><span className="font-semibold text-gray-900">Best for:</span> Pilgrimage, culture, quiet stays</li>
              </ul>
            </div>

            {relatedTemples.length > 0 && (
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">More in {temple.city}</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">Other temples</h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400 mb-4" />
                <div className="space-y-3">
                  {relatedTemples.map((related) => (
                    <Link
                      key={related.id}
                      href={`/temples/${related.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative h-14 w-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={templeImages[(allTemples.findIndex((t) => t.id === related.id) + 1) % templeImages.length]}
                          alt={related.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-orange-600">{related.name}</p>
                        <p className="text-xs text-gray-500">{related.deity}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
