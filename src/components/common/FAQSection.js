export default function FAQSection() {
  const faqs = [
    {
      q: "Do you offer packaged tours?",
      a: "No. We focus on custom trips where you choose places, stays, and transport.",
    },
    {
      q: "How do I know the best season to visit?",
      a: "Each destination lists ideal months, permits, and seasonal tips.",
    },
    {
      q: "Can I plan across categories?",
      a: "Yes. Mix temples, treks, and off-beat places into one itinerary.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-8">
          <p className="text-xs sm:text-sm font-semibold text-gray-500">FAQs</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mt-1">
            Questions, answered
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
            >
              <p className="text-sm font-semibold text-gray-900">{item.q}</p>
              <p className="text-sm text-gray-600 mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
