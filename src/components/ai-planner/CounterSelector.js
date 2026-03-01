"use client";

export default function CounterSelector({
  label,
  value,
  onIncrement,
  onDecrement,
  min = 0,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
      <span className="text-sm font-semibold text-stone-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-stone-200 bg-stone-50 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 active:scale-95 transition-all duration-200"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="min-w-[2.5rem] text-center text-base font-bold text-stone-900 tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-stone-200 bg-stone-50 text-stone-700 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 active:scale-95 transition-all duration-200"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
