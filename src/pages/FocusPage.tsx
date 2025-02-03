import { FocusTimer } from '@/components/FocusTimer';
import { motion } from 'framer-motion';

const FocusPage = () => {
  return (
    // Container with responsive padding and centering
    <div className="container mx-auto px-4 py-12">
      {/* Animated container with initial fade-in and slide-up effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto space-y-6"
      >
        {/* Header section with title and description */}
        <div className="text-center space-y-4">
          {/* Main heading with custom text color */}
          <h1 className="text-4xl font-bold text-focus">Focus Timer</h1>
          {/* Descriptive text with muted color */}
          <p className="text-gray-600">
            Stay focused and productive with app blocking enabled
          </p>
        </div>
        
        {/* Timer container with glassmorphism effect */}
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Focus timer component with task capture callback */}
          <FocusTimer onCaptureTask={() => {}} />
        </div>
      </motion.div>
    </div>
  );
};

export default FocusPage;