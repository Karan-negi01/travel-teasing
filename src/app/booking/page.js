"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const transportLabels = { train: "Train", bus: "Bus", cab: "Cab", flight: "Flight" };

function BookingContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "stays";
  const mode = searchParams.get("mode") || "";
  const near = searchParams.get("near") || "";
  const location = searchParams.get("location") || "";
  const to = searchParams.get("to") || location || near;
  const isStays = type === "stays";
  const isTransport = type === "transport";
  const transportLabel = transportLabels[mode] || "Transport";

  const title = isTransport
    ? `Book ${transportLabel}`
    : isStays
    ? "Stays & hotels"
    : "Activities & experiences";
  const subtitle = isTransport && to ? `To ${to}` : near || location ? `Near ${near || location}` : null;
  const message = isTransport
    ? `Book ${transportLabel.toLowerCase()} tickets for your trip. Integration with IRCTC, bus operators and cab services coming soon.`
    : isStays
    ? "Booking will be available soon. We're curating verified stays for this destination."
    : "We're curating guided visits and experiences for this destination.";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        <p className="mt-6 text-gray-600 leading-relaxed">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Back to home
          </Link>
          <Link
            href="/temples"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Explore temples
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={
        <div className="max-w-2xl mx-auto px-4 py-24 text-center text-gray-500">Loading...</div>
      }>
        <BookingContent />
      </Suspense>
      <Footer />
    </div>
  );
}
