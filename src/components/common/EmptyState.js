import Link from "next/link";

/**
 * Reusable empty or error state with optional icon, CTA, and suggestion links.
 * @param {Object} props
 * @param {string} props.title - Main heading
 * @param {string} [props.description] - Supporting text
 * @param {"empty"|"error"} [props.variant] - empty (magnifier) or error (alert)
 * @param {string} [props.actionHref] - Primary CTA link
 * @param {string} [props.actionLabel] - Primary CTA text
 * @param {Array<{ label: string, href: string }>} [props.suggestions] - Pill links
 * @param {React.ReactNode} [props.children] - Extra content below (e.g. "Or browse X, Y")
 */
export default function EmptyState({
  title,
  description,
  variant = "empty",
  actionHref,
  actionLabel,
  suggestions = [],
  children,
  className = "",
}) {
  const isError = variant === "error";

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 text-center ${className}`}
      role={isError ? "alert" : undefined}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        {isError ? (
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ) : (
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
      <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
      {description && (
        <p className="mt-2 text-gray-600 max-w-md mx-auto text-sm sm:text-base">{description}</p>
      )}
      {(actionHref && actionLabel) && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-600 transition-colors min-h-[44px]"
        >
          {actionLabel}
          <span aria-hidden>→</span>
        </Link>
      )}
      {suggestions.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {suggestions.map(({ label, href }) => (
            <Link
              key={href + label}
              href={href}
              className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
      {children && <div className="mt-6 text-sm text-gray-500">{children}</div>}
    </div>
  );
}
