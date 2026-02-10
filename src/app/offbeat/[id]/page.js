import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import StaysAndActivities from "@/components/common/StaysAndActivities";
import Link from "next/link";
import { getOffbeatPlaceById, getOffbeatPlacesByState, offbeatPlaces } from "@/data/offbeat";
import { getStaysNearDestination } from "@/data/stays";
import { notFound } from "next/navigation";

const placeImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
];

export async function generateStaticParams() {
  return offbeatPlaces.map((place) => ({ id: place.id.toString() }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const place = getOffbeatPlaceById(id);
  if (!place) return { title: "Place Not Found | TravelTeasing" };
  return {
    title: `${place.name} - ${place.state} | TravelTeasing`,
    description: place.description,
  };
}

export default async function OffbeatDetailPage({ params }) {
  const { id } = await params;
  const place = getOffbeatPlaceById(id);
  if (!place) notFound();

  const placeIndex = offbeatPlaces.findIndex((p) => p.id === place.id);
  const heroImage = placeImages[(placeIndex >= 0 ? placeIndex : 0) % placeImages.length];
  const relatedPlaces = getOffbeatPlacesByState(place.stateId).filter((p) => p.id !== place.id).slice(0, 3);
  const nearbyStays = getStaysNearDestination(place.cityId, place.stateId, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — editorial (same theme as listing) */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden">
        <img src={heroImage} alt={place.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(168,85,247,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70">
              <span className="h-px w-8 bg-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">Off-beat & Hidden</span>
            </div>
            <span className="inline-block mt-4 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
              {place.type}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              {place.name}
            </h1>
            <p className="mt-3 text-lg text-white/85">{place.city}, {place.state}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="purple"
          items={[
            { label: "Best time", value: place.bestTime },
            { label: "How to reach", value: "Routes & tips" },
            { label: "Stay", value: place.accommodation || "Local stays" },
            { label: "Budget", value: place.avgCost || "Flexible" },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          <div>
            {/* At a glance */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Essential info</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">At a glance</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-6" />
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Best time</p>
                    <p className="mt-1 text-gray-900">{place.bestTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">How to reach</p>
                    <p className="mt-1 text-gray-700 text-sm leading-relaxed">{place.howToReach}</p>
                  </div>
                  {place.avgCost && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Average cost</p>
                      <p className="mt-1 text-gray-900">{place.avgCost}</p>
                    </div>
                  )}
                  {place.accommodation && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Accommodation</p>
                      <p className="mt-1 text-gray-900">{place.accommodation}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* About */}
            <section className="mb-12">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Story</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">About {place.name}</h2>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-6" />
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed">{place.description}</p>
                {place.uniqueness && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">What makes it special</h3>
                    <p className="text-gray-700 leading-relaxed">{place.uniqueness}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Highlights */}
            {place.highlights && place.highlights.length > 0 && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Why go</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Highlights</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-6" />
                <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-6 md:p-8 shadow-sm">
                  <ul className="space-y-3">
                    {place.highlights.map((h, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Activities */}
            {place.activities && place.activities.length > 0 && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Experience</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Things to do</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-6" />
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
                    {place.activities.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 text-gray-700 text-sm">
                        <span className="text-violet-500">·</span>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Local cuisine */}
            {place.localCuisine && place.localCuisine.length > 0 && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Taste</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Local cuisine</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-6" />
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {place.localCuisine.map((food, i) => (
                      <span key={i} className="rounded-full bg-violet-100 text-violet-800 px-3 py-1.5 text-sm font-medium">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Nearby */}
            {place.nearbyPlaces && place.nearbyPlaces.length > 0 && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Explore</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Nearby attractions</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-6" />
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {place.nearbyPlaces.map((nearby, i) => (
                      <span key={i} className="rounded-full bg-gray-100 text-gray-800 px-3 py-1.5 text-sm">
                        {nearby}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Cultural notes / Permits */}
            {(place.culturalNotes || place.permits) && (
              <section className="mb-12">
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Good to know</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">Notes & permits</h2>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
                  {place.culturalNotes && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-amber-600">⚠</span> Cultural notes
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{place.culturalNotes}</p>
                    </div>
                  )}
                  {place.permits && (
                    <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-sky-600">📋</span> Permits
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{place.permits}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <StaysAndActivities title={place.name} location={`${place.city}, ${place.state}`} tone="violet" stays={nearbyStays} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sticky top-24">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">Stay snapshot</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">Quick facts</h3>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-4" />
              <ul className="space-y-3 text-sm text-gray-700">
                <li><span className="font-semibold text-gray-900">Location:</span> {place.city}, {place.state}</li>
                <li><span className="font-semibold text-gray-900">Type:</span> {place.type}</li>
                <li><span className="font-semibold text-gray-900">Best for:</span> Slow travel, local culture</li>
              </ul>
            </div>

            {relatedPlaces.length > 0 && (
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-[0.2em]">More in {place.state}</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">More hidden gems</h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-violet-400 mb-4" />
                <div className="space-y-3">
                  {relatedPlaces.map((related) => (
                    <Link
                      key={related.id}
                      href={`/offbeat/${related.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative h-14 w-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={placeImages[(offbeatPlaces.findIndex((p) => p.id === related.id) + 1) % placeImages.length]}
                          alt={related.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-violet-600">{related.name}</p>
                        <p className="text-xs text-gray-500">{related.type}</p>
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
