"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// High-quality landscape / mountains / hills hero images
const CAROUSEL_SLIDES = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop", // snow mountains
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop", // green valley
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop", // hills mist
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop", // alpine peaks
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop", // mountain landscape
];

const CAROUSEL_INTERVAL_MS = 5500;

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[68vh] sm:min-h-[76vh] lg:min-h-[82vh] flex flex-col justify-center overflow-hidden">
      {/* Carousel background — smooth crossfade + subtle zoom */}
      <div className="absolute inset-0">
        {CAROUSEL_SLIDES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 z-0 transition-all duration-[1200ms] ease-out ${
              i === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            aria-hidden={i !== currentSlide}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,_rgba(249,115,22,0.08),_transparent)] z-[1]" />
      </div>

      {/* Content — left-aligned like temple page */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-white/70 flex-wrap">
            <span className="h-px w-8 bg-orange-400" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              TravelTeasing · India travel
            </span>
          </div>
          <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            <span className="text-white/95">Find your next</span>
            <br />
            <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              temple, trek or hidden stay
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
            Clean, simple planning for Char Dham routes, Himalayan treks, and off-beat escapes — without noisy clutter.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/temples"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-all min-h-[44px]"
            >
              Explore temples
              <span className="text-orange-200">→</span>
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/5 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all min-h-[44px]"
            >
              Search all
            </Link>
          </div>
          <div className="mt-6 sm:mt-10 flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider">
            <span>Char Dham</span>
            <span>·</span>
            <span>Treks</span>
            <span>·</span>
            <span>Off-beat</span>
          </div>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-4 left-4 sm:left-8 z-10 flex gap-2">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-6 bg-orange-400" : "w-1.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
