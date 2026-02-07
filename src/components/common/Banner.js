"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Fallback when video is missing (video is in .gitignore; add public/homevideo.mp4 locally or host on CDN)
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop";

export default function Banner() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] max-h-[100vh] overflow-hidden">
      <div className="absolute inset-0">
        {!videoFailed ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={FALLBACK_IMAGE}
            onError={() => setVideoFailed(true)}
          >
            <source src="/homevideo.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src={FALLBACK_IMAGE}
            alt="Travel India"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white space-y-4 sm:space-y-7">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wide">
              TravelTeasing · India travel
            </span>
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight px-1">
                Find your next{" "}
                <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-yellow-200 bg-clip-text text-transparent">
                  temple, trek
                </span>{" "}
                or hidden stay.
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto px-2">
                Clean, simple planning for Char Dham routes, Himalayan treks, and
                off-beat escapes — without noisy clutter.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-full px-3 py-2 shadow-xl max-w-2xl mx-2 sm:mx-auto border border-white/60">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <div className="flex-1 px-3 py-2 rounded-full hover:bg-gray-50 transition text-left">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">
                    Where
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Search temples, treks, places...
                  </p>
                </div>
                <div className="hidden sm:block h-8 w-px bg-gray-200" />
                <div className="flex-1 px-3 py-2 rounded-full hover:bg-gray-50 transition text-left">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">
                    When
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Any month
                  </p>
                </div>
                <button
                  type="submit"
                  className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-1 text-white/85">
              <Link
                href="/temples"
                className="rounded-full bg-white text-gray-900 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:shadow min-h-[44px] flex items-center justify-center"
              >
                Explore Temples
              </Link>
              <Link
                href="/treks"
                className="rounded-full bg-white/10 border border-white/40 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/15 min-h-[44px] flex items-center justify-center"
              >
                Explore Treks
              </Link>
              <Link
                href="/offbeat"
                className="rounded-full bg-white/10 border border-white/40 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/15 min-h-[44px] flex items-center justify-center"
              >
                Off-beat stays
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
