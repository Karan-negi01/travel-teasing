import Navbar from "@/components/common/Navbar";
import Banner from "@/components/common/Banner";
import CharDhamSection from "@/components/home/CharDhamSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import MysticDestinationsTimeline from "@/components/home/MysticDestinationsTimeline";
import JyotirlingaSection from "@/components/home/JyotirlingaSection";
import ExperienceStrip from "@/components/home/ExperienceStrip";
import TreksSection from "@/components/home/TreksSection";
import OffbeatSection from "@/components/home/OffbeatSection";
import PlayfulStats from "@/components/home/PlayfulStats";
import Testimonials from "@/components/home/Testimonials";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";
import InfoStrip from "@/components/common/InfoStrip";
import StatesSpotlight from "@/components/home/StatesSpotlight";
import CitiesSpotlight from "@/components/home/CitiesSpotlight";
import JourneyBanner from "@/components/home/JourneyBanner";
import QuoteStrip from "@/components/home/QuoteStrip";
import TripStyleStrip from "@/components/home/TripStyleStrip";
import FeaturedStays from "@/components/home/FeaturedStays";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Banner />
      {/* Quick style selector just below the hero */}
      <TripStyleStrip />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InfoStrip
          tone="slate"
          items={[
            {
              label: "Custom trips",
              value: "No packages, only what you pick",
              subtext: "Temples, treks, stays",
            },
            {
              label: "Verified guides",
              value: "Local experts and hosts",
              subtext: "Real insights, trusted",
            },
            {
              label: "Smart seasons",
              value: "Best time & permits",
              subtext: "Plan with confidence",
            },
            {
              label: "Seamless booking",
              value: "Stays, travel, activities",
              subtext: "One place to plan",
            },
          ]}
        />
      </div>
      <JourneyBanner />
      <FeaturedCollections />
      <MysticDestinationsTimeline />
      <StatesSpotlight />
      <CitiesSpotlight />
      <CharDhamSection />
      <JyotirlingaSection />
      <ExperienceStrip />
      <QuoteStrip />
      <FeaturedStays />
      <PlayfulStats />
      <TripStyleStrip />
      <TreksSection />
      <OffbeatSection />
      <Testimonials />
      <PlanTripCTA />
      <FAQSection />
      <NewsletterCTA />
      <Footer />
    </div>
  );
}
