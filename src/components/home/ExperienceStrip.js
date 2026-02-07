export default function ExperienceStrip() {
  const items = [
    {
      title: "Verified guides",
      text: "Local experts with deep knowledge",
    },
    {
      title: "Custom itineraries",
      text: "Build trips your way, no packages",
    },
    {
      title: "Smart planning",
      text: "Best seasons, permits, and tips",
    },
    {
      title: "Seamless booking",
      text: "Hotels, transport, and activities",
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="text-xs text-gray-600 mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
