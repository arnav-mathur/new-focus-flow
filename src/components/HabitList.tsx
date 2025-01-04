import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Camera, Trophy, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { TaskCapture } from './TaskCapture';

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted?: Date;
  insights?: string[];
}

export const HabitList = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { 
      id: '1', 
      name: 'Gym', 
      streak: 3,
      insights: ['Most productive in mornings', 'Better streak on weekdays']
    },
    { 
      id: '2', 
      name: 'Meditation', 
      streak: 5,
      insights: ['Consistent 10-minute sessions', 'Higher focus after practice']
    },
    { 
      id: '3', 
      name: 'Drink Water', 
      streak: 7,
      insights: ['Average 8 glasses daily', 'Better hydration on workout days']
    }
  ]);
  const [newHabit, setNewHabit] = useState('');
  const [showCapture, setShowCapture] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const { toast } = useToast();

  const addHabit = () => {
    if (!newHabit.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      streak: 0,
      insights: []
    };
    
    setHabits([...habits, habit]);
    setNewHabit('');
    
    toast({
      title: "Habit Added",
      description: `${newHabit} has been added to your habits.`
    });
  };

  const captureHabit = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowCapture(true);
  };

  const handleCaptureClose = () => {
    setShowCapture(false);
    setSelectedHabit(null);
  };

  const handleVerificationSuccess = (habitId: string) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        return {
          ...h,
          streak: h.streak + 1,
          lastCompleted: new Date(),
          insights: [...(h.insights || []), generateNewInsight(h)]
        };
      }
      return h;
    }));
  };

  const generateNewInsight = (habit: Habit) => {
    const insights = [
      `${habit.name} completed ${habit.streak + 1} times in a row!`,
      `You're most consistent with ${habit.name} in the evening`,
      `Great progress on your ${habit.name} habit!`
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Add new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addHabit}>
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-focus">{habit.name}</h3>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{habit.streak} streak</span>
              </div>
            </div>

            {habit.insights && habit.insights.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Latest Insight
                </div>
                <p className="text-sm text-gray-700">
                  {habit.insights[habit.insights.length - 1]}
                </p>
              </div>
            )}
            
            <Button
              onClick={() => captureHabit(habit)}
              className="w-full bg-focus hover:bg-focus/90"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Progress
            </Button>
          </motion.div>
        ))}
      </div>

      {showCapture && selectedHabit && (
        <TaskCapture
          onClose={handleCaptureClose}
          habitName={selectedHabit.name}
          onVerificationSuccess={() => handleVerificationSuccess(selectedHabit.id)}
        />
      )}
    </div>
  );
};