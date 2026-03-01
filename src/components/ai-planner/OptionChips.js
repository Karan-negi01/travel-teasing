"use client";

export default function OptionChips({ options, selected, onChange, multiple = true }) {
  const toggle = (value) => {
    if (multiple) {
      onChange(
        selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value]
      );
    } else {
      onChange(selected.includes(value) ? [] : [value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-full border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 flex items-center gap-2 active:scale-[0.98] ${
              isSelected
                ? "border-violet-400 bg-violet-50 text-violet-800 shadow-md ring-2 ring-violet-200/60"
                : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:border-violet-200 hover:text-stone-800"
            }`}
          >
            {isSelected && <span className="text-violet-500 font-bold" aria-hidden>✓</span>}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
