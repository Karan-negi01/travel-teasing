"use client";

export default function CounterSelector({
  label,
  value,
  onIncrement,
  onDecrement,
  min = 0,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-2xl bg-white/50 border-2 border-white/50 backdrop-blur-sm shadow-sm">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-white/80 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:shadow-md active:scale-95 transition-all duration-200"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="min-w-[2.5rem] text-center text-base font-bold text-gray-900 tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-white/80 text-gray-700 hover:bg-white hover:shadow-md active:scale-95 transition-all duration-200"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
