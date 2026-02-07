export default function Testimonials() {
  const testimonials = [
    {
      name: "Aditi Sharma",
      location: "Delhi",
      quote:
        "The temple trail felt premium and well-researched. The itinerary tips saved us hours.",
    },
    {
      name: "Rohan Mehta",
      location: "Mumbai",
      quote:
        "Treks section is super useful — best seasons and permits were spot on.",
    },
    {
      name: "Neha Verma",
      location: "Bengaluru",
      quote:
        "Loved the hidden gems list. Clean design and great recommendations.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-gray-500">Traveler trust</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Loved by explorers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-700 leading-relaxed">
                “{item.quote}”
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
