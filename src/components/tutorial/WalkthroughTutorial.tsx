import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const steps = [
  {
    title: "Welcome to FocusFlow!",
    description: "Let's take a quick tour of the app's features.",
  },
  {
    title: "Social Feed",
    description: "See what your friends are up to and stay motivated together.",
  },
  {
    title: "Focus Timer",
    description: "Use the Pomodoro timer to stay focused on your tasks.",
  },
  {
    title: "Habit Tracking",
    description: "Track your habits with AI verification and build streaks.",
  },
  {
    title: "Task Planning",
    description: "Organize your tasks and plan your day effectively.",
  },
];

export const WalkthroughTutorial = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (hasSeenTutorial) {
      setIsVisible(false);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md z-50"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mx-4 backdrop-blur-sm bg-opacity-90">
          <button
            onClick={handleComplete}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {steps[currentStep].description}
            </p>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep
                        ? "bg-focus"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep((prev) => prev + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleComplete}>Finish</Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};