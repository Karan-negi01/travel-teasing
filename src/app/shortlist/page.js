"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { useShortlist } from "@/hooks/useShortlist";

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

async function fetchJson(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default function ShortlistPage() {
  const { items } = useShortlist();
  const [data, setData] = useState({ treks: [], offbeat: [], stays: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const trekPromises = (items.treks || []).map((id) =>
        fetchJson(`${API_BASE_URL}/api/treks?id=${id}`).then((j) => j?.data).catch(() => null)
      );
      const offbeatPromises = (items.offbeat || []).map((id) =>
        fetchJson(`${API_BASE_URL}/api/offbeat?id=${id}`).then((j) => j?.data).catch(() => null)
      );
      const staysPromises = (items.stays || []).map((id) =>
        fetchJson(`${API_BASE_URL}/api/stays?id=${id}`).then((j) => j?.data).catch(() => null)
      );

      const [treks, offbeat, stays] = await Promise.all([
        Promise.all(trekPromises),
        Promise.all(offbeatPromises),
        Promise.all(staysPromises),
      ]);

      setData({
        treks: treks.filter(Boolean),
        offbeat: offbeat.filter(Boolean),
        stays: stays.filter(Boolean),
      });
      setLoading(false);
    }

    load();
  }, [items.treks, items.offbeat, items.stays]);

  const total =
    (items.treks?.length || 0) + (items.offbeat?.length || 0) + (items.stays?.length || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700">
            ♥ Shortlist
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Your saved trips
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
            All treks, off-beat places, and stays you&apos;ve saved. Open any card for full details
            and booking options.
          </p>
        </div>

        <InfoStrip
          tone="slate"
          items={[
            { label: "Total", value: `${total} saved` },
            { label: "Treks", value: `${items.treks?.length || 0}` },
            { label: "Off-beat", value: `${items.offbeat?.length || 0}` },
            { label: "Stays", value: `${items.stays?.length || 0}` },
          ]}
        />

        {loading ? (
          <div className="mt-10 text-sm text-gray-500">Loading your shortlist…</div>
        ) : total === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Nothing saved yet</h2>
            <p className="text-sm text-gray-600 mb-4">
              Tap the ♥ Save button on any trek, off-beat place, or stay to add it here.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/treks"
                className="rounded-full bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
              >
                Browse treks
              </Link>
              <Link
                href="/offbeat"
                className="rounded-full bg-violet-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-violet-600"
              >
                Browse off-beat places
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {data.treks.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Saved treks ({data.treks.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {data.treks.map((trek) => (
                    <Link
                      key={trek.id}
                      href={`/treks/${trek.id}`}
                      className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 space-y-1.5">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 truncate">
                          {trek.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {trek.state} · {trek.duration}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">{trek.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {data.offbeat.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Saved off-beat places ({data.offbeat.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {data.offbeat.map((place) => (
                    <Link
                      key={place.id}
                      href={`/offbeat/${place.id}`}
                      className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-violet-200 transition-all overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 space-y-1.5">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-violet-600 truncate">
                          {place.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {place.city}, {place.state}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">{place.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {data.stays.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Saved stays ({data.stays.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {data.stays.map((stay) => (
                    <div
                      key={stay.id}
                      className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-orange-200 transition-all overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 space-y-1.5">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 truncate">
                          {stay.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {stay.city}, {stay.state}
                        </p>
                        <p className="text-xs text-gray-500">
                          {stay.priceRange} · {stay.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
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

