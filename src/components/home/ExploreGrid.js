import Link from "next/link";
import { CONTAINER } from "@/lib/layout";
import { states } from "@/data/locations";
import { getAllCities, getStateById } from "@/data/locations";
import { charDham } from "@/data/temples";
import { treks } from "@/data/treks";
import { offbeatPlaces } from "@/data/offbeat";

const STATE_IMGS = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
];

const CITY_IMGS = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop",
];

const TEMPLE_IMGS = {
  Badrinath: "https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=400&auto=format&fit=crop",
  Dwarka: "https://images.unsplash.com/photo-1590415886116-8182ccd21c4d?q=80&w=400&auto=format&fit=crop",
  "Puri (Jagannath)": "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=400&auto=format&fit=crop",
  Rameshwaram: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=400&auto=format&fit=crop",
};

const TREK_IMGS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=400&auto=format&fit=crop",
];

const OFFBEAT_IMGS = [
  "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=400&auto=format&fit=crop",
];

function Card({ href, image, title, subtitle }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-gray-300 hover:shadow-md transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </Link>
  );
}

export default function ExploreGrid() {
  const popularStates = states.filter((s) => s.popular).slice(0, 4);
  const cities = getAllCities().slice(0, 4);
  const dhams = charDham.slice(0, 2);
  const trekList = treks.slice(0, 2);
  const offbeat = offbeatPlaces.slice(0, 2);

  return (
    <section className="py-12 pb-16 bg-gray-50">
      <div className={CONTAINER}>
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Explore</h2>
          <Link href="/temples" className="text-sm font-medium text-orange-600 hover:text-orange-700">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {popularStates.map((s, i) => (
            <Card
              key={s.id}
              href={`/states/${s.id}`}
              image={STATE_IMGS[i % STATE_IMGS.length]}
              title={s.name}
              subtitle="Region"
            />
          ))}
          {cities.map((c, i) => {
            const state = getStateById(c.stateId);
            return (
              <Card
                key={c.id}
                href={`/cities/${c.id}`}
                image={CITY_IMGS[i % CITY_IMGS.length]}
                title={c.name}
                subtitle={state?.name || "City"}
              />
            );
          })}
          {dhams.map((d) => (
            <Card
              key={d.id}
              href={`/temples/${d.id}`}
              image={TEMPLE_IMGS[d.name] || STATE_IMGS[0]}
              title={d.name}
              subtitle={d.city}
            />
          ))}
          {trekList.map((t, i) => (
            <Card
              key={t.id}
              href={`/treks/${t.id}`}
              image={TREK_IMGS[i % TREK_IMGS.length]}
              title={t.name}
              subtitle={t.duration}
            />
          ))}
          {offbeat.map((o, i) => (
            <Card
              key={o.id}
              href={`/offbeat/${o.id}`}
              image={OFFBEAT_IMGS[i % OFFBEAT_IMGS.length]}
              title={o.name}
              subtitle={o.city}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
