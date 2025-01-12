import { HeroSection } from "@/components/landing/HeroSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { PricingSection } from "@/components/landing/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ReviewsSection />
      <PricingSection />
    </div>
  );
};

export default Index;