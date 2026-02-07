export default function InfoStrip({ items = [], tone = "orange" }) {
  const toneStyles = {
    orange: "bg-orange-50 text-orange-700",
    teal: "bg-teal-50 text-teal-700",
    purple: "bg-purple-50 text-purple-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <section className="py-4 sm:py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-3 sm:p-4 text-left shadow-sm min-w-0"
          >
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                toneStyles[tone] || toneStyles.orange
              }`}
            >
              {item.label}
            </div>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-gray-900 break-words">
              {item.value}
            </p>
            {item.subtext && (
              <p className="text-xs text-gray-500 mt-1">{item.subtext}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
