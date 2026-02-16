import Link from "next/link";
import { CONTAINER } from "@/lib/layout";

export default function FeatureBlock() {
  return (
    <section className="py-20 sm:py-28">
      <div className={CONTAINER}>
        <Link
          href="/temples/char-dham"
          className="group block rounded-3xl overflow-hidden bg-white shadow-[var(--card-shadow)] border border-amber-100/60 hover:shadow-[var(--card-shadow-hover)] hover:border-amber-200/80 transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 md:min-h-[400px]">
            <div className="relative h-72 md:h-auto md:min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1585126842438-46b9eb3a5f76?q=80&w=1200&auto=format&fit=crop"
                alt="Char Dham"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-transparent md:from-amber-900/50" />
            </div>
            <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-amber-50/30">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600">
                Sacred journeys
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
                Char Dham — the four abodes
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed max-w-md">
                Badrinath, Dwarka, Puri, Rameshwaram. Routes, best time, and stays for your pilgrimage.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                Explore Char Dham
                <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
