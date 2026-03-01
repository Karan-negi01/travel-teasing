"use client";

const MODES = [
  { id: "Bus", label: "Bus", icon: "🚌" },
  { id: "Train", label: "Train", icon: "🚂" },
  { id: "Flight", label: "Flight", icon: "✈️" },
  { id: "Own Vehicle", label: "Own Vehicle", icon: "🚗" },
];

export default function TravelModeSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MODES.map(({ id, label, icon }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] ${
              isSelected
                ? "border-violet-400 bg-violet-50 text-violet-800 shadow-md ring-2 ring-violet-200/60"
                : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:border-violet-200 hover:text-stone-800"
            }`}
          >
            <span className="text-lg" aria-hidden>{icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
