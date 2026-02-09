"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white">
        <div className="marquee-inner py-2 px-3 text-xs sm:text-sm font-medium whitespace-nowrap">
          <span className="mx-8">
            Discover India’s sacred sites, treks, and hidden stays
          </span>
          <span className="mx-8">
            Plan temples, treks, and off-beat escapes in one place
          </span>
          <span className="mx-8">
            Custom journeys — you pick the routes, we help with details
          </span>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200/60"
            : "bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            <Link href="/" className="flex items-center space-x-2 min-w-0">
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 truncate">
                TravelTeasing
              </span>
            </Link>

            <div className="hidden lg:flex items-center">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  className="px-5 py-3 text-sm font-semibold text-gray-900"
                >
                  Anywhere
                </button>
                <div className="h-6 w-px bg-gray-200" />
                <button
                  type="button"
                  className="px-5 py-3 text-sm font-semibold text-gray-900"
                >
                  Any week
                </button>
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Add guests"
                    className="px-5 py-3 text-sm text-gray-600 focus:outline-none w-40"
                  />
                  <button
                    type="submit"
                    className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    aria-label="Search"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
              <Link
                href="/temples"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 py-2"
              >
                Temples
              </Link>
              <Link
                href="/treks"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                Treks
              </Link>
              <Link
                href="/offbeat"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                Off-beat
              </Link>
              <Link
                href="/states"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                States
              </Link>
              <Link
                href="/cities"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                Cities
              </Link>
              <Link
                href="/plan-trip"
                className="ml-1 lg:ml-2 rounded-full border border-gray-200 px-3 lg:px-4 py-2 text-sm font-semibold text-gray-900 hover:shadow-sm whitespace-nowrap"
              >
                Plan a trip
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 rounded-full border border-gray-200 px-3 py-2 hover:shadow-sm"
              >
                <UserCircleIcon className="h-5 w-5 text-gray-700 flex-shrink-0" />
                <span className="hidden xl:inline text-sm font-semibold text-gray-700">Profile</span>
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full border border-gray-200 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          <div className="lg:hidden pb-3 pt-1">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-3 sm:px-4 py-2.5"
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search temples, treks, places..."
                className="ml-2 w-full min-w-0 text-sm text-gray-700 focus:outline-none"
              />
            </form>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="px-4 py-3 space-y-0 text-sm font-semibold text-gray-700">
              <Link href="/temples" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-100 active:bg-gray-50">
                Temples
              </Link>
              <Link href="/treks" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-100 active:bg-gray-50">
                Treks
              </Link>
              <Link href="/offbeat" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-100 active:bg-gray-50">
                Off-beat Places
              </Link>
              <Link href="/states" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-100 active:bg-gray-50">
                States
              </Link>
              <Link href="/cities" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-100 active:bg-gray-50">
                Cities
              </Link>
              <Link href="/plan-trip" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-100 active:bg-gray-50">
                Plan a trip
              </Link>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block py-3.5 active:bg-gray-50">
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
