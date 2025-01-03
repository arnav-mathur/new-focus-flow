import { FocusTimer } from '@/components/FocusTimer';
import { motion } from 'framer-motion';

const FocusPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-focus">Focus Timer</h1>
          <p className="text-gray-600">
            Stay focused and productive with app blocking enabled
          </p>
        </div>
        
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
          <FocusTimer onCaptureTask={() => {}} />
        </div>
      </motion.div>
    </div>
  );
};

export default FocusPage;