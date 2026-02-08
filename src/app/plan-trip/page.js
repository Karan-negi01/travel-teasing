"use client";

import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import InfoStrip from "@/components/common/InfoStrip";
import FAQSection from "@/components/common/FAQSection";
import { useBooking } from "@/context/BookingContext";
import {
  MapPinIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  TruckIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  SunIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    step: 1,
    title: "Explore",
    description: "Browse temples, treks, and hidden gems. Pick destinations that match your pace.",
    icon: MapPinIcon,
    href: "/search",
  },
  {
    step: 2,
    title: "Add to your trip",
    description: "Save places you like. Mix spiritual circuits, one trek, and a quiet stay.",
    icon: CalendarDaysIcon,
  },
  {
    step: 3,
    title: "Book stays & transport",
    description: "Reserve hotels and get train, bus, cab, or flight — all from one place.",
    icon: BuildingOfficeIcon,
  },
  {
    step: 4,
    title: "Go",
    description: "Your itinerary and bookings in one view. Just follow the plan.",
    icon: TruckIcon,
  },
];

const focusCards = [
  {
    title: "Spiritual trails",
    subtitle: "Temples & pilgrimage",
    description: "Char Dham, Jyotirlingas, Shaktipeeth, and sacred circuits.",
    href: "/temples",
    icon: SparklesIcon,
    accent: "orange",
    overline: "Pilgrimage",
  },
  {
    title: "Adventure",
    subtitle: "Treks & trails",
    description: "Himalayan treks by difficulty and season. From easy to expert.",
    href: "/treks",
    icon: ArrowTrendingUpIcon,
    accent: "emerald",
    overline: "Nature",
  },
  {
    title: "Off-beat",
    subtitle: "Hidden stays",
    description: "Quiet villages, unique stays, and slow travel experiences.",
    href: "/offbeat",
    icon: SunIcon,
    accent: "violet",
    overline: "Hidden gems",
  },
  {
    title: "Mix it up",
    subtitle: "Search everything",
    description: "Temples + one trek + a quiet stay. Search and build your mix.",
    href: "/search",
    icon: Squares2X2Icon,
    accent: "slate",
    overline: "Custom",
  },
];

const quickStart = [
  {
    title: "Char Dham circuit",
    href: "/temples/char-dham",
    tag: "Pilgrimage",
    description: "The four sacred dhams — Badrinath, Dwarka, Jagannath, Rameshwaram.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "12 Jyotirlingas",
    href: "/temples/jyotirlinga",
    tag: "Sacred",
    description: "Twelve divine Shiva shrines across India, each with a unique legend.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Popular treks",
    href: "/treks",
    tag: "Adventure",
    description: "Himalayan and other trails by difficulty — easy to expert.",
    image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Hidden gems",
    href: "/offbeat",
    tag: "Off-beat",
    description: "Quiet villages, homestays, and slow travel away from the crowds.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
  },
];

const planningTips = [
  "Pick one focus first (e.g. one circuit or one trek), then add stays and transport.",
  "Check best season for each destination — temples, treks, and off-beat spots have different peak months.",
  "Mix types if you like: e.g. Char Dham + a short trek + a quiet stay in the hills.",
  "Book stays near your main stops; use train or cab for long stretches.",
];

export default function PlanTripPage() {
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
          alt="Plan your trip"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_30%_50%,_rgba(249,115,22,0.08),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-orange-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                One place to plan
              </span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Plan your trip
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/85 max-w-lg leading-relaxed">
              Choose temples, treks, and off-beat stays. Book transport and hotels. Build a journey that fits your pace.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
              <Link
                href="/temples"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-all min-h-[44px]"
              >
                Explore temples
                <span className="text-orange-200">→</span>
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/5 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all min-h-[44px]"
              >
                Search all
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <InfoStrip
          tone="orange"
          items={[
            { label: "Temples", value: "Sacred circuits & dhams" },
            { label: "Treks", value: "By difficulty & season" },
            { label: "Off-beat", value: "Hidden stays & villages" },
            { label: "Book", value: "Stays & transport" },
          ]}
        />
      </div>

      {/* Intro — why plan here */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            We help you build a trip your way: no fixed packages. Choose temples, treks, or off-beat stays, then add hotels and transport in one place. Whether you want a week on a sacred circuit or a mix of pilgrimage and a short trek, start here.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Simple steps
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              How it works
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              From idea to itinerary in four steps.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? Link : "div";
              const wrapperProps = item.href ? { href: item.href } : {};
              return (
                <Wrapper
                  key={item.step}
                  {...wrapperProps}
                  className={`rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all ${
                    item.href ? "hover:border-orange-200 hover:shadow-md" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-orange-600 uppercase tracking-wider">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  {item.href && (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                      Explore
                      <span>→</span>
                    </span>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Choose your focus */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Where to start
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Choose your focus
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Pick a theme or mix temples, treks, and off-beat in one trip.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {focusCards.map((card) => {
              const Icon = card.icon;
              const accentBg = {
                orange: "bg-orange-50 text-orange-600",
                emerald: "bg-emerald-50 text-emerald-600",
                violet: "bg-violet-50 text-violet-600",
                slate: "bg-slate-100 text-slate-600",
              }[card.accent];
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-orange-200/80 hover:shadow-lg transition-all"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${accentBg}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {card.overline}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500">{card.subtitle}</p>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600">
                    Explore
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick start — cards with images */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Ready-made ideas
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Quick start
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Jump in with a popular circuit or explore by category. Each link takes you to a curated list you can build from.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {quickStart.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:border-orange-200 hover:shadow-lg transition-all"
              >
                <div className="relative h-56 sm:h-auto sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-semibold drop-shadow">{item.title}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{item.tag}</span>
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700">Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Planning tips */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Good to know
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Planning tips
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
          </div>
          <ul className="max-w-2xl mx-auto space-y-4">
            {planningTips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed pt-0.5">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Book your trip */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-2">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
              Reserve
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Book your trip
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Stays and transport in one place. Open the booking flow when you’re ready.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => openBooking({ type: "stays" })}
              className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <BuildingOfficeIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Stays & hotels</p>
                <p className="text-xs text-gray-500">Book a stay</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => openBooking({ type: "transport", mode: "train" })}
              className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <TruckIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Train</p>
                <p className="text-xs text-gray-500">IRCTC & more</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => openBooking({ type: "transport", mode: "bus" })}
              className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <TruckIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Bus</p>
                <p className="text-xs text-gray-500">Intercity & local</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => openBooking({ type: "transport", mode: "cab" })}
              className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <TruckIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Cab / Flight</p>
                <p className="text-xs text-gray-500">Door-to-door & air</p>
              </div>
            </button>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Explore ideas first
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}
