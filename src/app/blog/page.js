import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { blogPosts, blogCategories } from "@/data/blog";

export const metadata = {
  title: "Travel Blog | Stories, Guides & Tips | TravelTeasing",
  description: "Read travel stories, trek guides, spiritual journeys, and off-beat destination tips from India.",
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Slightly wider than rest of site so blog feels more editorial
const containerClass =
  "max-w-[94vw] sm:max-w-[92vw] xl:max-w-[1300px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10";

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero — same style as treks page */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=2070&auto=format&fit=crop"
          alt="Travel stories"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(249,115,22,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 text-white/70 flex-wrap">
              <span className="h-px w-8 bg-orange-400" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                The Journal
              </span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              <span className="text-white/95">Stories, guides</span>
              <br />
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">& travel tips</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
              From Himalayan treks to temple trails and hidden villages — real experiences and practical advice for your next journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#featured"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-all"
              >
                Read featured
                <span className="text-orange-200">→</span>
              </Link>
              <Link
                href="#latest"
                className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                Latest posts
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium text-white/60 uppercase tracking-wider">
              <span>Travel Tips</span>
              <span>·</span>
              <span>Treks</span>
              <span>·</span>
              <span>Guides</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured posts — compact cards, no overlap */}
      {featured.length > 0 && (
        <section id="featured" className={`${containerClass} pt-10 pb-6`}>
          <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-6">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {featured.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-orange-200/60 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="aspect-[16/10] sm:aspect-[5/3] relative overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <p className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {formatDate(post.date)} · {post.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories strip */}
      <section className={`${containerClass} mt-14`}>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Filter by</p>
        <div className="flex flex-wrap gap-3">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white border-2 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* All posts grid */}
      <section id="latest" className={`${containerClass} py-14 sm:py-20`}>
        <div className="flex items-baseline justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest posts</h2>
          <span className="text-sm font-medium text-gray-500">{rest.length} articles</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200/60 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-white/95 text-gray-800 text-xs font-bold shadow-md backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <p className="mt-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {formatDate(post.date)} · {post.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA — reuse homepage Newsletter style, Nomii content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-orange-50 via-white to-purple-50 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-500">Trip planning</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
                  Plan your next trip with Nomii
                </h3>
                <p className="text-gray-600 mt-2 max-w-xl text-sm sm:text-base">
                  Get a personalised itinerary in minutes. No sign-up required.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link
                  href="/ai-planner"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-colors"
                >
                  Try AI Planner
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
