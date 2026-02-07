import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import {
  states,
  getCityById,
  getStateById,
  getCitiesByState,
  getAllCities,
} from "@/data/locations";
import { getTemplesByCity } from "@/data/temples";
import { getTreksByCity } from "@/data/treks";
import { getOffbeatPlacesByCity } from "@/data/offbeat";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllCities().map((city) => ({
    id: city.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const city = getCityById(id);
  const state = city ? getStateById(city.stateId) : null;

  if (!city) {
    return { title: "City Not Found | TravelTeasing" };
  }

  return {
    title: `${city.name}, ${state?.name || "India"} | TravelTeasing`,
    description: `Explore ${city.name} with curated temples, treks, and off-beat stays.`,
  };
}

export default async function CityDetailPage({ params }) {
  const { id } = await params;
  const city = getCityById(id);
  if (!city) notFound();

  const state = getStateById(city.stateId);
  const relatedCities = getCitiesByState(city.stateId).filter(
    (item) => item.id !== city.id
  );
  const cityTemples = getTemplesByCity(city.id);
  const cityTreks = getTreksByCity(city.id);
  const cityOffbeat = getOffbeatPlacesByCity(city.id);
  const imagePool = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  ];
  const heroImage =
    imagePool[(getAllCities().findIndex((c) => c.id === city.id) + 2) % imagePool.length];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img src={heroImage} alt={city.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold">
              🧭 {state?.name}
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl font-semibold">
              {city.name}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mt-3">
              Local routes, stays, and cultural experiences curated for you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <InfoStrip
          tone="slate"
          items={[
            { label: "Region", value: state?.name || "India" },
            { label: "Trip style", value: "Temples & treks" },
            { label: "Stay", value: "Curated local stays" },
            { label: "Plan", value: "Seasonal tips" },
          ]}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About {city.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {city.name} in {state?.name} is a great base to explore temples, short
            trails, and off-beat stays around the region. Plan your route by season
            and travel pace to get the best experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why visit</h3>
            <p className="text-gray-700">
              Easy access to nearby experiences with flexible stays and local food.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Planning tips</h3>
            <p className="text-gray-700">
              Combine this city with a temple visit or a nearby trek for a complete
              itinerary.
            </p>
          </div>
        </div>

        {(cityTemples.length > 0 || cityTreks.length > 0 || cityOffbeat.length > 0) && (
          <div className="space-y-10 mb-10">
            {cityTemples.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Temples in {city.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityTemples.map((temple, index) => (
                    <Link
                      key={temple.id}
                      href={`/temples/${temple.id}`}
                      className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all"
                    >
                      <div className="relative h-40">
                        <img
                          src={imagePool[index % imagePool.length]}
                          alt={temple.name}
                          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">
                          {temple.name}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {temple.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {cityTreks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Treks near {city.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityTreks.map((trek, index) => (
                    <Link
                      key={trek.id}
                      href={`/treks/${trek.id}`}
                      className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all"
                    >
                      <div className="relative h-40">
                        <img
                          src={imagePool[(index + 2) % imagePool.length]}
                          alt={trek.name}
                          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">
                          {trek.name}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">
                          {trek.duration} · {trek.difficulty}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {cityOffbeat.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Off-beat places in {city.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityOffbeat.map((place, index) => (
                    <Link
                      key={place.id}
                      href={`/offbeat/${place.id}`}
                      className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all"
                    >
                      <div className="relative h-40">
                        <img
                          src={imagePool[(index + 4) % imagePool.length]}
                          alt={place.name}
                          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">
                          {place.name}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {place.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {relatedCities.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              More cities in {state?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCities.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/cities/${item.id}`}
                  className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all"
                >
                  <div className="relative h-36">
                    <img
                      src={imagePool[(index + 4) % imagePool.length]}
                      alt={item.name}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">
                      {item.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">
                      Explore routes, stays, and local culture
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link
            href={`/states/${state?.id}`}
            className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-600"
          >
            View {state?.name} guide
          </Link>
        </div>
      </div>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
