"use client";

import { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [state, setState] = useState({
    isOpen: false,
    type: null,
    mode: null,
    destination: "",
    location: "",
    stay: null,
  });

  const openBooking = useCallback((options = {}) => {
    const next = {
      isOpen: true,
      type: options.type || "stays",
      mode: options.mode || null,
      destination: options.destination || options.location || "",
      location: options.location || "",
      stay: options.stay || null,
    };

    setState(next);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      if (next.type) params.set("type", next.type);
      if (next.mode) params.set("mode", next.mode);
      if (next.location) params.set("location", next.location);
      if (!next.location && next.destination) params.set("near", next.destination);
      if (next.stay?.city) params.set("near", `${next.stay.city}, ${next.stay.state}`);

      const qs = params.toString();
      const url = qs ? `/booking?${qs}` : "/booking";
      window.location.href = url;
    }
  }, []);

  const closeBooking = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  return (
    <BookingContext.Provider value={{ ...state, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
