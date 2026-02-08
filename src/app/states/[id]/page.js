import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { states, getStateById, getCitiesByState } from "@/data/locations";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return states.map((state) => ({
    id: state.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const state = getStateById(id);

  if (!state) {
    return { title: "State Not Found | TravelTeasing" };
  }

  return {
    title: `${state.name} | TravelTeasing`,
    description: state.description,
  };
}

export default async function StateDetailPage({ params }) {
  const { id } = await params;
  const state = getStateById(id);
  if (!state) notFound();

  const stateCities = getCitiesByState(state.id);
  const imagePool = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  ];
  const heroImage =
    imagePool[(states.findIndex((s) => s.id === state.id) + 1) % imagePool.length];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img src={heroImage} alt={state.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold">
              📍 {state.name}
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl font-semibold">
              Explore {state.name}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mt-3">
              {state.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <InfoStrip
          tone="slate"
          items={[
            { label: "Cities", value: `${stateCities.length} destinations` },
            { label: "Styles", value: "Temples, treks, off-beat" },
            { label: "Best time", value: "Seasonal highlights" },
            { label: "Planning", value: "Local tips & stays" },
          ]}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {state.name}</h2>
          <p className="text-gray-700 leading-relaxed">{state.description}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            What to expect
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Mix sacred sites, scenic drives, and local culture. We recommend building
            a route by season and staying close to the experiences you care about.
          </p>
        </div>

        {stateCities.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cities in {state.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
              {stateCities.map((city, index) => (
                <Link
                  key={city.id}
                  href={`/cities/${city.id}`}
                  className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all"
                >
                  <div className="relative h-36">
                    <img
                      src={imagePool[(index + 3) % imagePool.length]}
                      alt={city.name}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">
                      {city.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">
                      Explore stays, temples, and local routes
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
