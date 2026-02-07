import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import BookingProviderWithModal from "@/components/common/BookingProviderWithModal";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TravelTeasing - Discover India's Sacred Sites & Hidden Gems",
  description: "Explore ancient temples, challenging treks, and off-beat destinations across India. Plan your spiritual journey and create custom itineraries with hotels and transport booking.",
  keywords: "India travel, temples, treks, off-beat places, Char Dham, Jyotirlingas, Himalayan treks, Indian tourism",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <BookingProviderWithModal>{children}</BookingProviderWithModal>
      </body>
    </html>
  );
}
