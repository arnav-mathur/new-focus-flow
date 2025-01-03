import React from 'react';
import { motion } from 'framer-motion';
import { HabitList } from '@/components/HabitList';
import { TaskCapture } from '@/components/TaskCapture';
import { useState } from 'react';

const HabitPage = () => {
  const [showTaskCapture, setShowTaskCapture] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-focus">Habit Tracking</h1>
          <p className="text-gray-600">
            Build and maintain healthy habits with AI-powered verification
          </p>
        </div>

        <HabitList />

        {showTaskCapture && (
          <TaskCapture onClose={() => setShowTaskCapture(false)} />
        )}
      </motion.div>
    </div>
  );
};

export default HabitPage;