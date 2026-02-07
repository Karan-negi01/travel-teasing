import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import StaysAndActivities from "@/components/common/StaysAndActivities";
import Link from "next/link";
import { getTrekById, getTreksByState, treks } from "@/data/treks";
import { getStaysByState } from "@/data/stays";
import { notFound } from "next/navigation";

const trekImages = [
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070&auto=format&fit=crop",
];

const getDifficultyColor = (d) => {
  if (d?.toLowerCase().includes("easy")) return "bg-emerald-500";
  if (d?.toLowerCase().includes("moderate")) return "bg-amber-500";
  if (d?.toLowerCase().includes("difficult")) return "bg-rose-500";
  return "bg-sky-500";
};

export async function generateStaticParams() {
  return treks.map((trek) => ({ id: trek.id.toString() }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const trek = getTrekById(id);
  if (!trek) return { title: "Trek Not Found | TravelTeasing" };
  return {
    title: `${trek.name} - ${trek.state} | TravelTeasing`,
    description: trek.description,
  };
}

export default async function TrekDetailPage({ params }) {
  const { id } = await params;
  const trek = getTrekById(id);
  if (!trek) notFound();

  const trekIndex = treks.findIndex((t) => t.id === trek.id);
  const heroImage = trekImages[(trekIndex >= 0 ? trekIndex : 0) % trekImages.length];
  const relatedTreks = getTreksByState(trek.stateId).filter((t) => t.id !== trek.id).slice(0, 3);
  const nearbyStays = getStaysByState(trek.stateId).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — editorial (same theme as listing) */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden">
        <img src={heroImage} alt={trek.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(16,185,129,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70">
              <span className="h-px w-8 bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">Adventure & Nature</span>
            </div>
            <span className={`inline-block mt-4 ${getDifficultyColor(trek.difficulty)} px-3 py-1 rounded-full text-xs font-semibold text-white`}>
              {trek.difficulty}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              {trek.name}
            </h1>
            <p className="mt-3 text-lg text-white/85">{trek.state}</p>
            <p className="mt-1 text-sm text-white/70">{trek.duration} · {trek.distance}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="teal"
          items={[
            { label: "Duration", value: trek.duration },
            { label: "Distance", value: trek.distance },
            { label: "Altitude", value: trek.maxAltitude },
            { label: "Best season", value: trek.bestSeason },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          <div>
            {/* At a glance */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Essential info</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">At a glance</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-6" />
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600 tabular-nums">{trek.duration}</p>
                    <p className="text-xs text-gray-500 mt-1">Duration</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{trek.distance}</p>
                    <p className="text-xs text-gray-500 mt-1">Distance</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-emerald-600">{trek.maxAltitude}</p>
                    <p className="text-xs text-gray-500 mt-1">Max altitude</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-600">{trek.bestSeason}</p>
                    <p className="text-xs text-gray-500 mt-1">Best season</p>
                  </div>
                </div>
              </div>
            </section>

            {/* About */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Overview</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">About this trek</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-6" />
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed">{trek.description}</p>
              </div>
            </section>

            {/* Highlights */}
            {trek.highlights && trek.highlights.length > 0 && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Why go</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Highlights</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-6" />
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 md:p-8 shadow-sm">
                  <ul className="space-y-3">
                    {trek.highlights.map((h, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Itinerary */}
            {trek.itinerary && trek.itinerary.length > 0 && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Plan</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Day-by-day itinerary</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-6" />
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm">
                  <div className="space-y-4">
                    {trek.itinerary.map((day, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <p className="text-gray-700 pt-0.5">{day}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Gear */}
            {trek.gearRequired && trek.gearRequired.length > 0 && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Packing</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Essential gear</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-6" />
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {trek.gearRequired.map((g, i) => (
                      <div key={i} className="flex items-center text-gray-700 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 flex-shrink-0" />
                        {g}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Permits & Safety */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Important</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Permits & safety</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Permits</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trek.permits}</p>
                </div>
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Safety</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trek.safety}</p>
                </div>
              </div>
            </section>

            <StaysAndActivities title={trek.name} location={trek.state} tone="emerald" stays={nearbyStays} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sticky top-24">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Trek snapshot</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">Quick facts</h3>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-4" />
              <ul className="space-y-3 text-sm text-gray-700">
                <li><span className="font-semibold text-gray-900">Region:</span> {trek.state}</li>
                <li><span className="font-semibold text-gray-900">Start point:</span> {trek.startPoint}</li>
                <li><span className="font-semibold text-gray-900">Best for:</span> Scenic views, adventure</li>
              </ul>
            </div>

            {relatedTreks.length > 0 && (
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">More in {trek.state}</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">More treks</h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-emerald-400 mb-4" />
                <div className="space-y-3">
                  {relatedTreks.map((related) => (
                    <Link
                      key={related.id}
                      href={`/treks/${related.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative h-14 w-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={trekImages[(treks.findIndex((t) => t.id === related.id) + 1) % trekImages.length]}
                          alt={related.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600">{related.name}</p>
                        <p className="text-xs text-gray-500">{related.difficulty}</p>
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
