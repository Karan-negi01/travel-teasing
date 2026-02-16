import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { blogPosts } from "@/data/blog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post | TravelTeasing" };
  return {
    title: `${post.title} | TravelTeasing Blog`,
    description: post.excerpt,
  };
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  // Wider, but still focused for reading
  const containerClass =
    "max-w-[94vw] sm:max-w-[92vw] xl:max-w-[1100px] 2xl:max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-10";

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className={`${containerClass} py-24 text-center`}>
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
            ← Back to blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero — per-post banner like treks page */}
      <section className="relative min-h-[45vh] sm:min-h-[55vh] lg:min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(249,115,22,0.06),_transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 sm:py-16 lg:py-20">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 text-white/75 flex-wrap">
              <span className="h-px w-8 bg-orange-400" />
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                <span className="hidden xs:inline">TravelTeasing · Blog</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/30 text-[10px] font-semibold normal-case tracking-normal">
                  {post.category}
                </span>
              </span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              <span className="text-white/95">{post.title}</span>
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-white/75">
              <span>{post.author}</span>
              <span className="hidden sm:inline text-white/40">·</span>
              <time dateTime={post.date} className="text-white/80">
                {formatDate(post.date)}
              </time>
              <span className="hidden sm:inline text-white/40">·</span>
              <span className="text-white/80">{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content below banner */}
      <article className={`${containerClass} py-10 sm:py-14 lg:py-16`}>
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
          <header className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </header>

          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              This is a placeholder for the full blog post content. In a real setup, you would fetch the full body from a CMS or markdown file and render it here. For now, here&apos;s a short summary:
            </p>
            <p className="text-gray-700 leading-relaxed mt-6 text-lg">
              {post.excerpt}
            </p>
            <p className="text-gray-700 leading-relaxed mt-6 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-700 leading-relaxed mt-6 text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              More stories and guides on the TravelTeasing blog.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-400/25 transition-all"
            >
              ← Back to all stories
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
