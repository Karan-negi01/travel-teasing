'use client';

import { useState } from "react";

const testimonials = [
  {
    name: "Aditi Sharma",
    location: "Delhi",
    quote:
      "The temple trail felt premium and well‑researched. The itinerary tips saved us hours.",
  },
  {
    name: "Rohan Mehta",
    location: "Mumbai",
    quote:
      "Treks section is super useful — best seasons and permits were spot on.",
  },
  {
    name: "Neha Verma",
    location: "Bengaluru",
    quote:
      "Loved the hidden gems list. Clean design and great recommendations.",
  },
  {
    name: "Sanjay Rao",
    location: "Hyderabad",
    quote:
      "We mixed a Char Dham route with a short trek and homestays. Planning felt simple and modern.",
  },
  {
    name: "Priya & Kunal",
    location: "Pune",
    quote:
      "Off‑beat section helped us find quiet stays we’d never discover on big apps.",
  },
  {
    name: "Ishita Desai",
    location: "Ahmedabad",
    quote:
      "Love how everything is explained in plain language — seasons, permits, and what to expect.",
  },
];

const testimonialVideos = [
  "https://videos.pexels.com/video-files/857195/857195-hd_1280_720_24fps.mp4",
  "https://videos.pexels.com/video-files/2608370/2608370-hd_1280_720_24fps.mp4",
  "https://videos.pexels.com/video-files/857125/857125-hd_1280_720_24fps.mp4",
  "https://videos.pexels.com/video-files/2132070/2132070-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/3409869/3409869-hd_1280_720_25fps.mp4",
  "https://videos.pexels.com/video-files/857130/857130-hd_1280_720_24fps.mp4",
];

function MuteIcon({ muted }) {
  if (muted) {
    // speaker with slash
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-white"
        aria-hidden="true"
      >
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
        />
        <path
          d="M18.36 6.64 17 8m0 0-2 2m2-2 2 2m-2-2V4m0 4v4m0 0-1.36 1.36M17 12l2 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // simple speaker icon
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-white"
      aria-hidden="true"
    >
      <path
        d="M4 9v6h4l5 4V5L8 9H4z"
        fill="currentColor"
      />
      <path
        d="M17 8a4 4 0 0 1 0 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
          <p className="text-sm font-semibold text-gray-500">Traveler stories</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Loved by explorers
          </h2>
          <p className="text-xs text-gray-500">
            Reels-style clips · swipe / scroll sideways · tap sound
          </p>
        </div>
      </div>

      {/* Horizontal scroll, reels-style cards (no auto movement) */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch gap-4 sm:gap-5 pb-3 snap-x snap-mandatory">
            {testimonials.map((item, i) => {
              const videoSrc = testimonialVideos[i % testimonialVideos.length];
              return (
                <div
                  key={item.name}
                  className="snap-start w-[85vw] sm:w-[70vw] md:w-[40vw] lg:w-[20%] xl:w-[18%] flex-shrink-0 rounded-3xl border border-gray-200 bg-white/95 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-[9/16] bg-black">
                    <video
                      src={videoSrc}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMuted((prev) => !prev)}
                      className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition"
                      aria-label={isMuted ? "Unmute videos" : "Mute videos"}
                    >
                      <MuteIcon muted={isMuted} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

