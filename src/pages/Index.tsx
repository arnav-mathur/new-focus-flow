import { useState } from 'react';
import { FocusTimer } from '@/components/FocusTimer';
import { TaskCapture } from '@/components/TaskCapture';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const Index = () => {
  const [showTaskCapture, setShowTaskCapture] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-focus" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-focus via-success to-purple-500 text-transparent bg-clip-text">
              FocusFlow
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay focused, capture progress, and build powerful habits with our gamified productivity companion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
            <FocusTimer onCaptureTask={() => setShowTaskCapture(true)} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center"
        >
          {[
            {
              title: "Focus Timer",
              description: "Set customizable focus sessions to maintain productivity"
            },
            {
              title: "Task Capture",
              description: "Document your progress with task completion photos"
            },
            {
              title: "Streak Tracking",
              description: "Build habits by maintaining your productivity streaks"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-md border border-white/20"
            >
              <h3 className="text-lg font-semibold text-focus mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {showTaskCapture && (
          <TaskCapture onClose={() => setShowTaskCapture(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;