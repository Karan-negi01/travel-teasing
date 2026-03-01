import { NextResponse } from "next/server";
import { blogPosts, blogCategories } from "@/data/blog";

// GET /api/blog
// Optional query params:
// - id: string
// - slug: string
// - category: string
// - featured: "true"
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  if (id || slug) {
    const post = blogPosts.find((p) => p.id === id || p.slug === slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ data: post });
  }

  let results = [...blogPosts];

  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (featured) {
    results = results.filter((p) => p.featured);
  }

  return NextResponse.json({
    count: results.length,
    categories: blogCategories,
    data: results,
  });
}

