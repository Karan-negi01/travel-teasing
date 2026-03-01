"use client";

export default function DateSelector({ startDate, endDate, onStartChange, onEndChange }) {
  const inputClass = "w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-3.5 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all duration-200";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="mb-2 block text-xs font-semibold text-stone-600">
          Start date
        </label>
        <input type="date" value={startDate} onChange={(e) => onStartChange(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold text-stone-600">
          End date
        </label>
        <input type="date" value={endDate} min={startDate || undefined} onChange={(e) => onEndChange(e.target.value)} className={inputClass} />
      </div>
    </div>
  );
}
