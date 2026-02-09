import Link from "next/link";

export default function TripStyleStrip() {
  const styles = [
    {
      label: "Temple journeys",
      pill: "Pilgrimage & heritage",
      href: "/temples",
      tone: "from-orange-500/20 via-orange-400/10 to-amber-300/10",
      border: "border-orange-200/70",
      text: "Visit Char Dham, Jyotirlingas, and sacred circuits with nearby stays.",
      accent: "text-orange-600",
    },
    {
      label: "Treks & trails",
      pill: "Adventure",
      href: "/treks",
      tone: "from-emerald-500/20 via-emerald-400/10 to-sky-300/10",
      border: "border-emerald-200/70",
      text: "Choose easy weekend hikes or high-altitude expeditions by season.",
      accent: "text-emerald-600",
    },
    {
      label: "Off-beat stays",
      pill: "Hidden gems",
      href: "/offbeat",
      tone: "from-violet-500/20 via-fuchsia-400/10 to-indigo-300/10",
      border: "border-violet-200/70",
      text: "Slow villages, homestays, and story-rich escapes away from crowds.",
      accent: "text-violet-600",
    },
  ];

  return (
    <section className="py-10 sm:py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.25em]">
              Pick your style
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
              How do you want to travel?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-md">
            Start with what excites you most — temples, treks, or quiet off-beat places.
            You can always mix them later in one trip.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {styles.map((style) => (
            <Link
              key={style.label}
              href={style.href}
              className={`group relative overflow-hidden rounded-2xl border bg-white/80 shadow-sm hover:shadow-xl transition-all duration-300 ${style.border}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${style.tone} opacity-80 group-hover:opacity-100 transition-opacity`}
                aria-hidden
              />
              <div className="relative p-4 sm:p-5 md:p-6 space-y-3">
                <span className={`inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-gray-900 shadow-sm`}>
                  {style.pill}
                </span>
                <h3
                  className={`text-base sm:text-lg md:text-xl font-semibold text-gray-900 group-hover:translate-y-0.5 transition-transform ${style.accent}`}
                >
                  {style.label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700/90 leading-relaxed line-clamp-3">
                  {style.text}
                </p>
                <div className="pt-1 flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-900">
                  <span className="flex items-center gap-1">
                    Explore
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <span className="hidden sm:inline text-gray-700/80">
                    Curated picks
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
