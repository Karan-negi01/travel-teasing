import Link from "next/link";

export default function PlanTripCTA() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-gradient-to-r from-orange-50 via-white to-pink-50 p-6 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-500">Plan your journey</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mt-1">
                Build a trip that fits your pace
              </h3>
              <p className="text-gray-600 mt-2 max-w-xl text-sm sm:text-base">
                Choose temples, treks, and hidden gems — then book transport and stays.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Link
                href="/plan-trip"
                className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-5 sm:px-6 py-3 text-sm font-semibold text-white hover:shadow-md text-center min-h-[44px] flex items-center justify-center"
              >
                Start planning
              </Link>
              <Link
                href="/search"
                className="rounded-full border border-gray-200 px-5 sm:px-6 py-3 text-sm font-semibold text-gray-900 hover:shadow-sm text-center min-h-[44px] flex items-center justify-center"
              >
                Explore ideas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
