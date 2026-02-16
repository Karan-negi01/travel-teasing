import Link from "next/link";
import { CONTAINER } from "@/lib/layout";

const OPTIONS = [
  {
    label: "Temples",
    href: "/temples",
    description: "Explore sacred sites & circuits.",
  },
  {
    label: "Treks",
    href: "/treks",
    description: "Find scenic trails & routes.",
  },
  {
    label: "Offbeat places",
    href: "/offbeat",
    description: "Discover hidden gems.",
  },
  {
    label: "AI planner",
    href: "/ai-planner",
    description: "Let AI plan your trip.",
  },
];

export default function ModeSelector() {
  return (
    <section className="py-10 bg-white">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OPTIONS.map((opt) => (
            <Link
              key={opt.href}
              href={opt.href}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-5 hover:border-orange-400 hover:shadow-md transition-all"
            >
              <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
              <p className="mt-1 text-xs text-gray-500">{opt.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

