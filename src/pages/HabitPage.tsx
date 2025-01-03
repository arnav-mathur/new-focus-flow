import { useState } from 'react';
import { TaskCapture } from '@/components/TaskCapture';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const HabitPage = () => {
  const [showTaskCapture, setShowTaskCapture] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-focus">Habit Tracking</h1>
          <p className="text-gray-600">
            Document and verify your habits with AI assistance
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
          <Button
            onClick={() => setShowTaskCapture(true)}
            className="w-full h-32 border-2 border-dashed border-focus/20 hover:border-focus/40"
          >
            <Camera className="w-6 h-6 mr-2" />
            Capture New Habit
          </Button>
        </div>

        {showTaskCapture && (
          <TaskCapture onClose={() => setShowTaskCapture(false)} />
        )}
      </motion.div>
    </div>
  );
};

export default HabitPage;