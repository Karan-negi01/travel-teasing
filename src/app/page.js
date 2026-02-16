import Navbar from "@/components/common/Navbar";
import Banner from "@/components/common/Banner";
import CharDhamSection from "@/components/home/CharDhamSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
// import MysticDestinationsTimeline from "@/components/home/MysticDestinationsTimeline";
import JyotirlingaSection from "@/components/home/JyotirlingaSection";

import TreksSection from "@/components/home/TreksSection";
import OffbeatSection from "@/components/home/OffbeatSection";
import PlayfulStats from "@/components/home/PlayfulStats";
import Testimonials from "@/components/home/Testimonials";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import PlanTripCTA from "@/components/common/PlanTripCTA";
import FAQSection from "@/components/common/FAQSection";

import StatesSpotlight from "@/components/home/StatesSpotlight";
import CitiesSpotlight from "@/components/home/CitiesSpotlight";
import JourneyBanner from "@/components/home/JourneyBanner";
import QuoteStrip from "@/components/home/QuoteStrip";
import TripStyleStrip from "@/components/home/TripStyleStrip";
import FeaturedStays from "@/components/home/FeaturedStays";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Banner />

      {/* All home sections now sit on top of the global background from layout */}
      <TripStyleStrip />
   
      <JourneyBanner />
      <FeaturedCollections />
      {/* <MysticDestinationsTimeline /> */}
      <StatesSpotlight />
      <CitiesSpotlight />
      <CharDhamSection />
      <JyotirlingaSection />
      {/* <ExperienceStrip /> */}
      <QuoteStrip />
      <FeaturedStays />
      <PlayfulStats />
      <TreksSection />
      <OffbeatSection />
      <PlanTripCTA />
      <Testimonials />
      
      <FAQSection />
      <NewsletterCTA />
      <Footer />
    </div>
  );
}
