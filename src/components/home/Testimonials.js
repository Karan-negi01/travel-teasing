'use client';

import { useEffect, useState } from "react";

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

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-14 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-sm font-semibold text-gray-500">Traveler stories</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Loved by explorers
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span>Swipe or let it play</span>
          </div>
        </div>
      </div>

      {/* Full-width carousel rail */}
      <div className="w-full overflow-hidden">
        <div className="flex justify-center">
          <div className="mx-4 sm:mx-8 max-w-xl sm:max-w-2xl lg:max-w-3xl w-full">
            <div className="relative rounded-3xl border border-gray-200 bg-white/95 shadow-md px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
              <div className="absolute -top-6 left-6 h-10 w-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">
                <span className="text-xl">“</span>
              </div>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed mt-2 sm:mt-1">
                {current.quote}
              </p>
              <div className="mt-5 sm:mt-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {current.name}
                  </p>
                  <p className="text-xs text-gray-500">{current.location}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>
                    {index + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gray-900" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
