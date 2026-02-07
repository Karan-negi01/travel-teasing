export default function PlayfulStats() {
  const stats = [
    { label: "Sacred Dhams", value: "18+" },
    { label: "Epic Treks", value: "100+" },
    { label: "Hidden Gems", value: "50+" },
    { label: "Happy Travelers", value: "1,000+" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-gray-500">By the numbers</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Built for modern travelers
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            We blend discovery with planning so you can explore with confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
