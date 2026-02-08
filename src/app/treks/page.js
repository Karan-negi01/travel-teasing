import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import Link from "next/link";
import { treks } from "@/data/treks";

export const metadata = {
  title: "Treks & Adventures in India | TravelTeasing",
  description: "Discover the best trekking destinations across India, from easy trails to challenging expeditions",
};

const trekImages = [
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070&auto=format&fit=crop",
];

const getDifficultyColor = (difficulty) => {
  if (difficulty.toLowerCase().includes("easy")) return "bg-emerald-500";
  if (difficulty.toLowerCase().includes("moderate")) return "bg-amber-500";
  if (difficulty.toLowerCase().includes("difficult")) return "bg-rose-500";
  return "bg-sky-500";
};

export default function TreksPage() {
  const difficultyLevels = {
    easy: treks.filter((t) => t.difficulty.toLowerCase().includes("easy")),
    moderate: treks.filter(
      (t) =>
        t.difficulty.toLowerCase().includes("moderate") &&
        !t.difficulty.toLowerCase().includes("easy")
    ),
    difficult: treks.filter((t) => t.difficulty.toLowerCase().includes("difficult")),
  };
  const featuredTreks = treks.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — editorial style */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop"
          alt="Treks and adventures"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(16,185,129,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-emerald-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Adventure & Nature</span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              <span className="text-white/95">Treks</span>
              <br />
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">& Adventures</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
              Challenge yourself with breathtaking treks across the Himalayas and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#by-difficulty"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 transition-all"
              >
                By difficulty
                <span className="text-emerald-200">→</span>
              </Link>
              <Link
                href="#all-treks"
                className="inline-flex items-center rounded-lg border border-white/50 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                View all treks
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium text-white/60 uppercase tracking-wider">
              <span>Easy</span>
              <span>·</span>
              <span>Moderate</span>
              <span>·</span>
              <span>Difficult</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="teal"
          items={[
            { label: "Difficulty", value: "Easy to expert trails" },
            { label: "Altitude", value: "High views, low stress" },
            { label: "Permits", value: "Know before you go" },
            { label: "Seasons", value: "Best trek windows" },
          ]}
        />
      </div>

      {/* Intro */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            From short Himalayan trails to multi-day expeditions, our treks are grouped by difficulty and season. Each listing includes altitude, duration, best months, and what to expect. You can also see nearby stays and transport options so you can plan the full trip — base camp to summit and back.
          </p>
        </div>
      </section>

      {/* By difficulty */}
      <section id="by-difficulty" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Choose your level</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">By difficulty</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-emerald-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            From beginner-friendly trails to expert expeditions.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-emerald-200/60 hover:shadow-md transition-all">
            <p className="text-sm font-semibold text-gray-500">Easy</p>
            <p className="mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit">Beginner</p>
            <p className="mt-4 text-2xl font-bold text-gray-900 tabular-nums">{difficultyLevels.easy.length}</p>
            <p className="text-sm text-gray-600 mt-0.5">Easy treks</p>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-amber-200/60 hover:shadow-md transition-all">
            <p className="text-sm font-semibold text-gray-500">Moderate</p>
            <p className="mt-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full w-fit">Balanced</p>
            <p className="mt-4 text-2xl font-bold text-gray-900 tabular-nums">{difficultyLevels.moderate.length}</p>
            <p className="text-sm text-gray-600 mt-0.5">Moderate treks</p>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-rose-200/60 hover:shadow-md transition-all">
            <p className="text-sm font-semibold text-gray-500">Difficult</p>
            <p className="mt-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full w-fit">Expert</p>
            <p className="mt-4 text-2xl font-bold text-gray-900 tabular-nums">{difficultyLevels.difficult.length}</p>
            <p className="text-sm text-gray-600 mt-0.5">Difficult treks</p>
          </div>
        </div>
      </section>

      {/* Treks to plan next */}
      <section className="py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Seasonal picks</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Treks to plan next</h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-emerald-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Handpicked routes with the best weather windows.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredTreks.map((trek, index) => (
              <Link
                key={trek.id}
                href={`/treks/${trek.id}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-emerald-200/60 transition-all duration-300"
              >
                <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={trekImages[(index + 1) % trekImages.length]}
                    alt={trek.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900">
                    {trek.duration}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-semibold drop-shadow">{trek.name}</p>
                    <p className="text-xs text-white/90 mt-0.5">{trek.bestSeason}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{trek.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{trek.difficulty}</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">Trek</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Treks */}
      <section id="all-treks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">Trek collections</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">All Treks</h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-emerald-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Curated routes with altitude, seasons, and difficulty in one view.
          </p>
          <p className="text-xl md:text-2xl font-bold text-emerald-500/90 tabular-nums mt-2">{treks.length}+</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {treks.map((trek, index) => (
            <Link
              key={trek.id}
              href={`/treks/${trek.id}`}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-emerald-200/60 transition-all duration-300"
            >
              <div className="relative h-56 sm:h-auto sm:aspect-[16/10] overflow-hidden">
                <img
                  src={trekImages[index % trekImages.length]}
                  alt={trek.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-sm">
                    {trek.duration}
                  </span>
                  <span
                    className={`${getDifficultyColor(trek.difficulty)} px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm`}
                  >
                    {trek.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-semibold drop-shadow">{trek.name}</p>
                  <p className="text-xs text-white/90 mt-0.5">{trek.state}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{trek.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{trek.maxAltitude}</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">Trek</span>
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
