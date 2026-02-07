import Link from "next/link";
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon 
} from "@heroicons/react/24/outline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              TravelTeasing
            </h3>
            <p className="text-sm leading-relaxed">
              Your gateway to discovering India&apos;s sacred temples, 
              thrilling treks, and hidden off-beat destinations. 
              Create unforgettable journeys.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/temples" className="hover:text-orange-400 transition-colors text-sm">
                  Sacred Temples
                </Link>
              </li>
              <li>
                <Link href="/temples/char-dham" className="hover:text-orange-400 transition-colors text-sm">
                  Char Dham
                </Link>
              </li>
              <li>
                <Link href="/temples/jyotirlinga" className="hover:text-orange-400 transition-colors text-sm">
                  12 Jyotirlingas
                </Link>
              </li>
              <li>
                <Link href="/treks" className="hover:text-orange-400 transition-colors text-sm">
                  Treks & Adventures
                </Link>
              </li>
              <li>
                <Link href="/offbeat" className="hover:text-orange-400 transition-colors text-sm">
                  Off-beat Places
                </Link>
              </li>
              <li>
                <Link href="/states" className="hover:text-orange-400 transition-colors text-sm">
                  Browse States
                </Link>
              </li>
              <li>
                <Link href="/cities" className="hover:text-orange-400 transition-colors text-sm">
                  Browse Cities
                </Link>
              </li>
            </ul>
          </div>

          {/* States */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Popular States</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/states/uttarakhand" className="hover:text-orange-400 transition-colors text-sm">
                  Uttarakhand
                </Link>
              </li>
              <li>
                <Link href="/states/himachal-pradesh" className="hover:text-orange-400 transition-colors text-sm">
                  Himachal Pradesh
                </Link>
              </li>
              <li>
                <Link href="/states/ladakh" className="hover:text-orange-400 transition-colors text-sm">
                  Ladakh
                </Link>
              </li>
              <li>
                <Link href="/states/maharashtra" className="hover:text-orange-400 transition-colors text-sm">
                  Maharashtra
                </Link>
              </li>
              <li>
                <Link href="/states" className="hover:text-orange-400 transition-colors text-sm">
                  View All States
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span className="text-sm break-words min-w-0">123 Travel Street, New Delhi, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">info@travelteasing.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} TravelTeasing. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="/privacy" className="text-sm hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/about" className="text-sm hover:text-orange-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm hover:text-orange-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
