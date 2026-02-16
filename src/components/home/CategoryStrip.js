import Link from "next/link";
import { CONTAINER } from "@/lib/layout";

const CATEGORIES = [
  { label: "Temples", href: "/temples", desc: "Char Dham, Jyotirlingas" },
  { label: "Treks", href: "/treks", desc: "Himalayan adventures" },
  { label: "Offbeat", href: "/offbeat", desc: "Hidden gems" },
  { label: "States", href: "/states", desc: "Explore by region" },
  { label: "Cities", href: "/cities", desc: "City guides" },
];

export default function CategoryStrip() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-100">
      <div className={CONTAINER}>
        <p className="text-sm font-medium text-stone-500 mb-4">Explore by category</p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4">
          {CATEGORIES.map(({ label, href, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-xl border border-stone-200 bg-stone-50/50 hover:border-orange-200 hover:bg-orange-50/30 p-4 sm:p-5 transition-all"
            >
              <span className="font-semibold text-stone-900 group-hover:text-orange-700 transition-colors">
                {label}
              </span>
              <span className="text-xs text-stone-500 mt-0.5">{desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
