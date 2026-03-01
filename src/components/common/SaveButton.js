"use client";

import { useShortlist } from "@/hooks/useShortlist";

export default function SaveButton({ id, type, variant = "default", className = "" }) {
  const { isSaved, toggleItem } = useShortlist();
  const saved = isSaved(type, id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(type, id);
  };

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-all z-10 ${className} ${
          saved
            ? "border-emerald-500 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            : "border-white/90 bg-white/95 text-gray-600 hover:bg-white hover:text-rose-500 backdrop-blur-sm"
        }`}
      >
        <span className="text-base" aria-hidden>{saved ? "♥" : "♡"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition-all
        ${saved
          ? "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border-gray-200 bg-white/90 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/70 hover:text-emerald-700"}`}
    >
      <span aria-hidden>{saved ? "♥" : "♡"}</span>
      <span>{saved ? "Saved" : "Add to wishlist"}</span>
    </button>
  );
}

