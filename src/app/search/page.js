"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { allTemples } from "@/data/temples";
import { treks } from "@/data/treks";
import { offbeatPlaces } from "@/data/offbeat";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState({ temples: [], treks: [], offbeat: [] });
  const imagePool = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  ];

  useEffect(() => {
    if (query) {
      const searchTerm = query.toLowerCase();
      
      // Search temples
      const templeResults = allTemples.filter(
        (temple) =>
          temple.name.toLowerCase().includes(searchTerm) ||
          temple.state.toLowerCase().includes(searchTerm) ||
          temple.city.toLowerCase().includes(searchTerm) ||
          temple.description.toLowerCase().includes(searchTerm)
      );

      // Search treks
      const trekResults = treks.filter(
        (trek) =>
          trek.name.toLowerCase().includes(searchTerm) ||
          trek.state.toLowerCase().includes(searchTerm) ||
          trek.description.toLowerCase().includes(searchTerm)
      );

      // Search off-beat places
      const offbeatResults = offbeatPlaces.filter(
        (place) =>
          place.name.toLowerCase().includes(searchTerm) ||
          place.state.toLowerCase().includes(searchTerm) ||
          place.city.toLowerCase().includes(searchTerm) ||
          place.description.toLowerCase().includes(searchTerm)
      );

      setResults({
        temples: templeResults,
        treks: trekResults,
        offbeat: offbeatResults,
      });
    }
  }, [query]);

  const totalResults =
    results.temples.length + results.treks.length + results.offbeat.length;

  const suggestedSearches = [
    "Char Dham",
    "Kedarnath",
    "Rishikesh",
    "Valley of Flowers",
    "Spiti",
    "Haridwar",
    "Badrinath",
    "Himalaya",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700">
            🔍 Search
          </div>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 mb-2">
            {query ? "Search Results" : "Search temples, treks & places"}
          </h1>
          {query ? (
            <p className="text-lg text-gray-600">
              Found {totalResults} results for &quot;{query}&quot;
            </p>
          ) : (
            <p className="text-lg text-gray-600 max-w-2xl">
              Search across temples, treks, and off-beat destinations. Use a place name, state, or theme to find what you need — then open any result for full details, stays, and transport.
            </p>
          )}
        </div>

        {query && (
          <InfoStrip
            tone="slate"
            items={[
              { label: "Total", value: `${totalResults} results` },
              { label: "Temples", value: `${results.temples.length} matches` },
              { label: "Treks", value: `${results.treks.length} matches` },
              { label: "Off-beat", value: `${results.offbeat.length} matches` },
            ]}
          />
        )}

        {!query ? (
          /* No query: landing with intro + suggested searches + browse links */
          <section className="space-y-12">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Suggested searches</h2>
              <p className="text-gray-600 mb-6">
                Try a place name, state, or theme. Search runs across all temples, treks, and off-beat spots.
              </p>
              <div className="flex flex-wrap gap-3">
                {suggestedSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 transition-all"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/temples"
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Pilgrimage</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">Browse temples</h3>
                <p className="mt-2 text-sm text-gray-600">Char Dham, Jyotirlingas, Shaktipeeth & more.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">Explore →</span>
              </Link>
              <Link
                href="/treks"
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Adventure</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">Browse treks</h3>
                <p className="mt-2 text-sm text-gray-600">By difficulty and season across the Himalayas & beyond.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">Explore →</span>
              </Link>
              <Link
                href="/offbeat"
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Off-beat</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">Browse hidden gems</h3>
                <p className="mt-2 text-sm text-gray-600">Quiet villages, homestays & slow travel.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">Explore →</span>
              </Link>
            </div>
          </section>
        ) : totalResults === 0 ? (
          <div className="text-center py-14 rounded-2xl border border-gray-200 bg-white">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results for &quot;{query}&quot;</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try a different keyword — e.g. a state name, place name, or theme like &quot;pilgrimage&quot; or &quot;trek&quot;.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestedSearches.slice(0, 5).map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-orange-50 hover:text-orange-700 transition-all"
                >
                  {term}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-sm text-gray-500">
              Or <Link href="/temples" className="font-semibold text-orange-600 hover:underline">browse temples</Link>,{" "}
              <Link href="/treks" className="font-semibold text-emerald-600 hover:underline">treks</Link>, or{" "}
              <Link href="/offbeat" className="font-semibold text-violet-600 hover:underline">off-beat places</Link>.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            <p className="text-sm text-gray-500">
              Click any card for full details, nearby stays, and transport options.
            </p>
            {/* Temples Results */}
            {results.temples.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Temples ({results.temples.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.temples.map((temple, index) => (
                    <Link
                      key={temple.id}
                      href={`/temples/${temple.id}`}
                      className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden group"
                    >
                      <div className="relative h-44">
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
                      <div className="p-6">
                        <p className="text-gray-600 text-sm mb-2">
                          {temple.city}, {temple.state}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {temple.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Treks Results */}
            {results.treks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Treks ({results.treks.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.treks.map((trek, index) => (
                    <Link
                      key={trek.id}
                      href={`/treks/${trek.id}`}
                      className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden group"
                    >
                      <div className="relative h-44">
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
                      <div className="p-6">
                        <p className="text-gray-600 text-sm mb-2">
                          {trek.state}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {trek.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Off-beat Places Results */}
            {results.offbeat.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Off-beat Places ({results.offbeat.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.offbeat.map((place, index) => (
                    <Link
                      key={place.id}
                      href={`/offbeat/${place.id}`}
                      className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden group"
                    >
                      <div className="relative h-44">
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
                      <div className="p-6">
                        <p className="text-gray-600 text-sm mb-2">
                          {place.city}, {place.state}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">
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
      </div>

      <PlanTripCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}

function SearchFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-6 w-full max-w-xl bg-gray-100 rounded" />
          <div className="h-32 w-full bg-gray-100 rounded-2xl mt-8" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
