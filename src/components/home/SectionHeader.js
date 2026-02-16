import Link from "next/link";

export default function SectionHeader({ title, subtitle, linkHref, linkLabel = "View all" }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
        <div className="mt-2 h-1 w-12 rounded-full bg-orange-500" />
      </div>
      {linkHref && (
        <Link href={linkHref} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
