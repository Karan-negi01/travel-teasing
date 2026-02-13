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
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 border-b border-gray-100"
            : "bg-white/98 backdrop-blur-md border-b border-gray-100/80"
        }`}
      >
        <div className="w-full max-w-[95vw] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 min-w-0 shrink-0 group"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 truncate group-hover:text-gray-700 transition-colors">
                TravelTeasing
              </span>
            </Link>

            <div className="hidden lg:flex flex-1 items-center justify-center max-w-xl mx-4 lg:mx-6">
              <form
                onSubmit={handleSearch}
                className="flex items-center w-full bg-gray-50/80 border border-gray-200/80 rounded-full shadow-sm hover:shadow-md hover:border-gray-300/60 focus-within:ring-2 focus-within:ring-orange-400/20 focus-within:border-orange-300/60 transition-all duration-200"
              >
                <button
                  type="button"
                  className="px-4 lg:px-5 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 shrink-0 transition-colors rounded-l-full"
                >
                  Anywhere
                </button>
                <div className="h-5 w-px bg-gray-200 shrink-0" />
                <button
                  type="button"
                  className="px-4 lg:px-5 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 shrink-0 transition-colors"
                >
                  Any week
                </button>
                <div className="h-5 w-px bg-gray-200 shrink-0" />
                <div className="flex items-center flex-1 min-w-0">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Add guests"
                    className="px-4 lg:px-5 py-3 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none w-full min-w-0 bg-transparent rounded-r-full"
                  />
                  <button
                    type="submit"
                    className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm hover:shadow-md hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all duration-200"
                    aria-label="Search"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <div className="flex items-center gap-2 lg:gap-3 pr-2 lg:pr-3 mr-2 lg:mr-3 border-r border-gray-200/80">
                <Link href="/temples" className="text-sm font-semibold text-gray-600 hover:text-gray-900 py-2.5 px-2 rounded-lg hover:bg-gray-100/80 whitespace-nowrap transition-colors duration-200">
                  Temples
                </Link>
                <Link href="/treks" className="text-sm font-semibold text-gray-600 hover:text-gray-900 py-2.5 px-2 rounded-lg hover:bg-gray-100/80 whitespace-nowrap transition-colors duration-200">
                  Treks
                </Link>
                <Link href="/offbeat" className="text-sm font-semibold text-gray-600 hover:text-gray-900 py-2.5 px-2 rounded-lg hover:bg-gray-100/80 whitespace-nowrap transition-colors duration-200">
                  Off-beat
                </Link>
                <Link href="/states" className="text-sm font-semibold text-gray-600 hover:text-gray-900 py-2.5 px-2 rounded-lg hover:bg-gray-100/80 whitespace-nowrap transition-colors duration-200">
                  States
                </Link>
                <Link href="/cities" className="text-sm font-semibold text-gray-600 hover:text-gray-900 py-2.5 px-2 rounded-lg hover:bg-gray-100/80 whitespace-nowrap transition-colors duration-200">
                  Cities
                </Link>
                <Link href="/blog" className="text-sm font-semibold text-gray-600 hover:text-gray-900 py-2.5 px-2 rounded-lg hover:bg-gray-100/80 whitespace-nowrap transition-colors duration-200">
                  Blog
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/ai-planner"
                  className="rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2.5 text-sm font-semibold text-orange-700 hover:from-orange-100 hover:to-amber-100 hover:border-orange-300 shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap"
                >
                  AI Planner
                </Link>
                <Link
                  href="/plan-trip"
                  className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200 whitespace-nowrap"
                >
                  Plan a trip
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                >
                  <UserCircleIcon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <span className="hidden xl:inline text-sm font-semibold text-gray-700">Profile</span>
                </Link>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full border border-gray-200 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
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
              className="flex items-center bg-gray-50 border border-gray-200 rounded-full shadow-sm px-3 sm:px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-400/20 focus-within:border-orange-300/60 transition-all"
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search temples, treks, places..."
                className="ml-2 w-full min-w-0 text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </form>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-sm max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="px-4 py-2 space-y-0 text-sm font-semibold text-gray-700">
              <Link href="/temples" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-gray-100 transition-colors">
                Temples
              </Link>
              <Link href="/treks" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-gray-100 transition-colors">
                Treks
              </Link>
              <Link href="/offbeat" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-gray-100 transition-colors">
                Off-beat Places
              </Link>
              <Link href="/states" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-gray-100 transition-colors">
                States
              </Link>
              <Link href="/cities" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-gray-100 transition-colors">
                Cities
              </Link>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-gray-100 transition-colors">
                Blog
              </Link>
              <Link href="/ai-planner" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-orange-50 transition-colors text-orange-700">
                AI Planner
              </Link>
              <Link href="/plan-trip" onClick={() => setIsMenuOpen(false)} className="block py-3.5 border-b border-gray-50 rounded-lg px-2 active:bg-gray-100 transition-colors">
                Plan a trip
              </Link>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block py-3.5 rounded-lg px-2 active:bg-gray-100 transition-colors">
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
