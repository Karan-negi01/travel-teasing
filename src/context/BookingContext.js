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
    setState({
      isOpen: true,
      type: options.type || "stays",
      mode: options.mode || null,
      destination: options.destination || options.location || "",
      location: options.location || "",
      stay: options.stay || null,
    });
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
