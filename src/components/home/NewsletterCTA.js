export default function NewsletterCTA() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-orange-50 via-white to-purple-50 p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-500">Stay inspired</p>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Get travel drops in your inbox
              </h3>
              <p className="text-gray-600 mt-2 max-w-xl">
                New treks, sacred circuits, and hidden stays — curated weekly.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-72 rounded-full border border-gray-200 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white hover:shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
