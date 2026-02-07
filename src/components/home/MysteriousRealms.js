"use client";

import Link from "next/link";

const realms = [
  {
    title: "Jantar Mantar - Celestial Clocks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
    href: "/temples",
    stagger: 0,
  },
  {
    title: "Dwarka Submerged City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1590415886116-8182ccd21c4d?q=80&w=800&auto=format&fit=crop",
    href: "/temples/2",
    stagger: 1,
  },
  {
    title: "Konark - The Sun's Chariot",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
    href: "/temples/24",
    stagger: 0,
  },
  {
    title: "Patal Bhuvaneshwer - Underground Labyrinths",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=800&auto=format&fit=crop",
    href: "/temples",
    stagger: 1,
  },
  {
    title: "Kalahasti - Eternal Flame",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop",
    href: "/temples",
    stagger: 0,
  },
];

const HEX_SIZE = 180;
const HEX_OFFSET = 28;

export default function MysteriousRealms() {
  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden bg-[#e8eaece8]">
      {/* Full-width wavy lines + dots (exactly like reference) */}
      <div className="absolute inset-0 w-full pointer-events-none" aria-hidden>
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mr-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#2d4a6f" />
            </linearGradient>
          </defs>
          {/* Flowing wavy lines across the section */}
          <path
            d="M0 45% Q15% 38%, 30% 45% T60% 45% T90% 45% T120% 45%"
            fill="none"
            stroke="url(#mr-line)"
            strokeWidth="0.8"
            opacity="0.35"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 52% Q20% 58%, 40% 52% T80% 52% T120% 52%"
            fill="none"
            stroke="url(#mr-line)"
            strokeWidth="0.6"
            opacity="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 58% Q25% 52%, 50% 58% T100% 58% T150% 58%"
            fill="none"
            stroke="url(#mr-line)"
            strokeWidth="0.5"
            opacity="0.25"
            vectorEffect="non-scaling-stroke"
          />
          {/* Dots along the flow */}
          {[12, 28, 45, 62, 78, 92].map((x, i) => (
            <circle
              key={`d1-${i}`}
              cx={`${x}%`}
              cy="44%"
              r="3"
              fill="#1e3a5f"
              opacity="0.4"
            />
          ))}
          {[8, 35, 55, 75, 95].map((x, i) => (
            <circle
              key={`d2-${i}`}
              cx={`${x}%`}
              cy="56%"
              r="2.5"
              fill="#1e3a5f"
              opacity="0.35"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        {/* Header: heading + two CTAs only */}
        <div className="flex flex-col items-center gap-6 mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1a1d21]">
            Mysterious Realms
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/temples"
              className="inline-flex items-center rounded-[999px] bg-[#1e3a5f] px-7 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[#243d5c] transition-colors"
            >
              Unravel the Secrets
            </Link>
            <Link
              href="/search?q=temples"
              className="inline-flex items-center rounded-[999px] border-[1.5px] border-[#1e3a5f] bg-white px-7 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#1e3a5f] hover:bg-[#f5f6f8] transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>

        {/* Horizontally scrollable row of hexagons with wave stagger */}
        <div className="w-full overflow-x-auto overflow-y-visible pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            className="flex items-end justify-center gap-8 md:gap-10 min-w-max mx-auto"
            style={{ maxWidth: "1400px" }}
          >
            {realms.map((realm) => (
              <Link
                key={realm.title}
                href={realm.href}
                className="group flex-shrink-0 flex flex-col items-center"
                style={{
                  transform: `translateY(${realm.stagger ? HEX_OFFSET : 0}px)`,
                }}
              >
                {/* Hexagon: image only, blue/purple tint */}
                <div
                  className="relative overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    width: HEX_SIZE,
                    height: HEX_SIZE * 1.15,
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    boxShadow: "0 12px 32px rgba(30, 58, 95, 0.2)",
                  }}
                >
                  <img
                    src={realm.image}
                    alt={realm.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(45,55,72,0.15) 0%, rgba(30,58,95,0.5) 40%, rgba(49,46,129,0.75) 100%)",
                    }}
                  />
                </div>
                {/* Title + description below hex, like reference */}
                <h3 className="mt-4 text-[15px] md:text-base font-bold text-[#1a1d21] text-center max-w-[200px] leading-tight">
                  {realm.title}
                </h3>
                <p className="mt-1.5 text-[12px] text-[#6b7280] text-center max-w-[200px] leading-snug">
                  {realm.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
