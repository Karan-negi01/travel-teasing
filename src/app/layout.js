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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://travelteasing.com";

export const metadata = {
  title: "TravelTeasing - Discover India's Sacred Sites & Hidden Gems",
  description:
    "Explore ancient temples, challenging treks, and off-beat destinations across India. Plan your spiritual journey and create custom itineraries with hotels and transport booking.",
  keywords:
    "India travel, temples, treks, off-beat places, Char Dham, Jyotirlingas, Himalayan treks, Indian tourism",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "TravelTeasing - Discover India's Sacred Sites & Hidden Gems",
    description:
      "Explore ancient temples, treks, and hidden stays across India. Plan custom itineraries with AI and curated guides.",
    siteName: "TravelTeasing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TravelTeasing - Temples, Treks & Off-beat India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelTeasing - Discover India's Sacred Sites & Hidden Gems",
    description:
      "Plan Char Dham, Jyotirlinga circuits, Himalayan treks and off-beat journeys across India.",
    images: ["/og-image.jpg"],
  },
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
        className={`${plusJakarta.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
      >
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <BookingProviderWithModal>
          <main id="main-content" tabIndex={-1}>{children}</main>
        </BookingProviderWithModal>
      </body>
    </html>
  );
}
