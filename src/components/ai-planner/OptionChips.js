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
            className={`rounded-full border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2 active:scale-[0.98] ${
              isSelected
                ? "border-orange-400 bg-orange-400/25 text-orange-900 shadow-lg shadow-orange-400/20 ring-2 ring-orange-300/50"
                : "border-white/60 bg-white/60 text-gray-700 hover:bg-white/80 hover:border-white/80 hover:shadow-md"
            }`}
          >
            {isSelected && <span className="text-orange-600 font-bold" aria-hidden>✓</span>}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
