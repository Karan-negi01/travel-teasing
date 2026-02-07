import Link from "next/link";

export default function TripStyleStrip() {
  return (
    <section className="py-12 md:py-14 border-y border-gray-200 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
          Pick your style
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <Link
            href="/temples"
            className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors border-b-2 border-transparent hover:border-orange-500 pb-1"
          >
            Temples
          </Link>
          <span className="text-gray-300 font-light hidden sm:inline">·</span>
          <Link
            href="/treks"
            className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors border-b-2 border-transparent hover:border-emerald-500 pb-1"
          >
            Treks
          </Link>
          <span className="text-gray-300 font-light hidden sm:inline">·</span>
          <Link
            href="/offbeat"
            className="text-lg font-bold text-gray-900 hover:text-violet-600 transition-colors border-b-2 border-transparent hover:border-violet-500 pb-1"
          >
            Off-beat
          </Link>
        </div>
      </div>
    </section>
  );
}
