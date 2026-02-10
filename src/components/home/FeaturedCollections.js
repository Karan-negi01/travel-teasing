import Link from "next/link";

export default function FeaturedCollections() {
  const collections = [
    {
      title: "Sacred Trails",
      subtitle: "Pilgrimage circuits and legends",
      href: "/temples",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Himalayan Escapes",
      subtitle: "High-altitude treks and views",
      href: "/treks",
      image:
        "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Hidden Wonders",
      subtitle: "Off-beat stays and slow travel",
      href: "/offbeat",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em]">Collections</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-2">
            Explore by mood
          </h2>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-orange-400 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative h-56 overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-xs text-white/85">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Browse all
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
