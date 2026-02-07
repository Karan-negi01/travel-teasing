"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

export default function DestinationCard({
  title,
  description,
  image,
  href,
  index = 0,
  textPosition = "below",
}) {
  const textBlock = (
    <>
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center max-w-[240px] mx-auto leading-tight group-hover:text-orange-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-2 text-xs text-gray-500 text-center max-w-[240px] mx-auto leading-relaxed line-clamp-2">
        {description}
      </p>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center"
    >
      <Link
        href={href}
        className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-2xl"
      >
        {textPosition === "above" && <div className="mb-4">{textBlock}</div>}

        <motion.div
          className="relative overflow-hidden flex-shrink-0 w-[min(100%,248px)] aspect-[184/212] mx-auto ring-1 ring-gray-100"
          style={{
            clipPath: HEX_CLIP,
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px -2px rgba(0,0,0,0.06), 0 12px 24px -6px rgba(0,0,0,0.08)",
          }}
          whileHover={{
            y: -8,
            scale: 1.04,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.8), 0 20px 40px -10px rgba(249,115,22,0.3), 0 24px 48px -12px rgba(0,0,0,0.12)",
            transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-orange-950/15 via-transparent to-transparent pointer-events-none"
            aria-hidden
          />
          <motion.div
            className="absolute bottom-5 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            aria-hidden
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-gray-800 shadow-lg ring-1 ring-gray-200/80">
              Explore
              <ArrowRightIcon className="w-3.5 h-3.5 text-orange-500" />
            </span>
          </motion.div>
        </motion.div>

        {textPosition === "below" && <div className="mt-4">{textBlock}</div>}
      </Link>
    </motion.div>
  );
}
