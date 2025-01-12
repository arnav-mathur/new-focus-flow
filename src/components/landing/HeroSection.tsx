import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-focus via-success to-purple-500 text-transparent bg-clip-text">
          Your Ultimate Productivity Companion
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Combine focus timer, AI-powered habit tracking, and social accountability
          to achieve your goals faster than ever.
        </p>
        <Button 
          onClick={() => navigate('/social')} 
          className="mt-8 text-lg"
          size="lg"
        >
          Get Started <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </section>
  );
};