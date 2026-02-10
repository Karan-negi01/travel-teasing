"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";
import { SparklesIcon } from "@heroicons/react/24/outline";

const DESTINATIONS = [
  {
    title: "Jantar Mantar – Celestial Clocks",
    description:
      "Ancient astronomical observatories where time was read from the sun and stars.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
    href: "/temples",
    staggerY: 0,
    textPosition: "above",
  },
  {
    title: "Dwarka – Submerged City",
    description:
      "The legendary kingdom of Krishna, with myths of a city beneath the waves.",
    image:
      "https://images.unsplash.com/photo-1590415886116-8182ccd21c4d?q=80&w=800&auto=format&fit=crop",
    href: "/temples/2",
    staggerY: 1,
    textPosition: "below",
  },
  {
    title: "Konark – The Sun's Chariot",
    description:
      "A UNESCO site shaped as a colossal chariot of Surya, with stone wheels and horses.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
    href: "/temples/24",
    staggerY: 0,
    textPosition: "above",
  },
  {
    title: "Patal Bhuvaneshwar – Underground Labyrinths",
    description:
      "Limestone caves with formations linked to mythology and ancient pilgrimage.",
    image:
      "https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=800&auto=format&fit=crop",
    href: "/temples",
    staggerY: 1,
    textPosition: "below",
  },
  {
    title: "Kalahasti – Eternal Flame",
    description:
      "Where the element of air is worshipped and a natural flame is said to burn without fuel.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop",
    href: "/temples",
    staggerY: 0,
    textPosition: "above",
  },
];

const WAVE_OFFSET_PX = 30;

export default function MysticDestinationsTimeline() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Subtle top edge - adds depth without color */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10 mb-16">
          <div className="space-y-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2.5 text-xs font-semibold text-orange-600 ring-1 ring-gray-200/80"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              Mystic trail
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="pt-5"
            >
              <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 tracking-tight leading-[1.08]">
                Mysterious{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Realms
                </span>
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-gray-200 to-transparent" />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="text-gray-600 mt-5 max-w-xl leading-relaxed text-[15px]"
            >
              Five stops. One unforgettable journey. Where myth, history and wonder come alive.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mt-5"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-orange-400" />
              <span className="text-sm text-gray-500 font-medium">
                Loved by curious travelers
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/temples"
              className="group/btn relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <span className="relative z-10">Unravel the Secrets</span>
              <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-600 to-amber-500" />
              <span
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 bg-[length:200%_100%] bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] group-hover/btn:animate-[btn-shine_1s_ease-in-out]"
                aria-hidden
              />
            </Link>
            <Link
              href="/search?q=temples"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm hover:border-orange-300 hover:bg-gray-50 hover:text-orange-700 transition-all duration-300"
            >
              Share Your Story
            </Link>
          </motion.div>
        </div>

        <div className="relative min-h-[460px] flex items-center">
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full max-w-4xl h-44 mx-auto"
              viewBox="0 0 800 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="realm-connector"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#ea580c" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path
                d="M 60 60 Q 200 98 340 60 Q 480 22 620 60 Q 700 88 780 60"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="8"
                strokeLinecap="round"
                style={{ vectorEffect: "non-scaling-stroke" }}
              />
              <path
                d="M 60 60 Q 200 98 340 60 Q 480 22 620 60 Q 700 88 780 60"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ vectorEffect: "non-scaling-stroke" }}
              />
              <motion.path
                d="M 60 60 Q 200 98 340 60 Q 480 22 620 60 Q 700 88 780 60"
                fill="none"
                stroke="url(#realm-connector)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ vectorEffect: "non-scaling-stroke" }}
              />
              {[
                [80, 60],
                [220, 98],
                [360, 60],
                [500, 22],
                [720, 60],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="7"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1.5"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 + i * 0.08, type: "spring", stiffness: 150, damping: 12 }}
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.06))" }}
                  />
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#ea580c"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.52 + i * 0.08, duration: 0.3 }}
                  />
                </g>
              ))}
            </svg>
          </div>

          <div className="relative z-10 w-full flex items-center justify-center gap-6 sm:gap-8 md:gap-12">
            {DESTINATIONS.map((dest, index) => (
              <div
                key={dest.title}
                className="flex-1 flex justify-center min-w-0 max-w-[280px]"
                style={{
                  transform: `translateY(${dest.staggerY ? WAVE_OFFSET_PX : 0}px)`,
                }}
              >
                <DestinationCard
                  title={dest.title}
                  description={dest.description}
                  image={dest.image}
                  href={dest.href}
                  index={index}
                  textPosition={dest.textPosition}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <p className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50/50 px-5 py-2.5 text-sm text-gray-500">
            Plan your journey with verified guides and the best season for each destination.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
