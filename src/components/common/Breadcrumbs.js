import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

/**
 * Breadcrumb trail for detail pages.
 * @param {Array<{ label: string, href?: string }>} items - Last item is current page (no href).
 */
export default function Breadcrumbs({ items, className = "" }) {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1 text-sm text-white/80 ${className}`}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-white/50 flex-shrink-0" aria-hidden />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-white font-medium" : ""}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
