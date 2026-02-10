import Link from "next/link";

export default function JourneyBanner() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-orange-50 via-white to-amber-50 p-8 md:p-12 text-center shadow-sm">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">
            One place to plan
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight max-w-3xl mx-auto">
            Plan your pilgrimage. Temples, treks & stays — then book.
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base px-2">
            No packages. Pick your destinations, add hotels and activities, and we’ll help you put it together.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/plan-trip"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 sm:px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all min-h-[44px]"
            >
              Start planning
              <span>→</span>
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-5 sm:px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all min-h-[44px]"
            >
              Explore ideas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
