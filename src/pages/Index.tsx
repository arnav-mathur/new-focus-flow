import { HeroSection } from "@/components/landing/HeroSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ContactSection } from "@/components/landing/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ReviewsSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
};

export default Index;