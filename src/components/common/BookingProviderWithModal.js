"use client";

import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "./BookingModal";

export default function BookingProviderWithModal({ children }) {
  return (
    <BookingProvider>
      {children}
      <BookingModal />
    </BookingProvider>
  );
}
