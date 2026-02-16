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
            className={`rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2 active:scale-[0.98] ${
              isSelected
                ? "border-orange-400 bg-orange-400/25 text-orange-900 shadow-lg shadow-orange-400/20 ring-2 ring-orange-300/50"
                : "border-white/60 bg-white/60 text-gray-700 hover:bg-white/80 hover:border-white/80 hover:shadow-md"
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
