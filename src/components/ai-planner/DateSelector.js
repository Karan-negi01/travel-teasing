"use client";

export default function DateSelector({ startDate, endDate, onStartChange, onEndChange }) {
  const inputClass = "w-full rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm font-medium text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300/60 transition-all duration-200";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="mb-2 block text-xs font-bold text-gray-600 uppercase tracking-wider">
          Start
        </label>
        <input type="date" value={startDate} onChange={(e) => onStartChange(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="mb-2 block text-xs font-bold text-gray-600 uppercase tracking-wider">
          End
        </label>
        <input type="date" value={endDate} min={startDate || undefined} onChange={(e) => onEndChange(e.target.value)} className={inputClass} />
      </div>
    </div>
  );
}
