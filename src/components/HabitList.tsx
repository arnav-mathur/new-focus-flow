import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Camera, Trophy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted?: Date;
}

export const HabitList = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Gym', streak: 3 },
    { id: '2', name: 'Meditation', streak: 5 },
    { id: '3', name: 'Drink Water', streak: 7 }
  ]);
  const [newHabit, setNewHabit] = useState('');
  const { toast } = useToast();

  const addHabit = () => {
    if (!newHabit.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      streak: 0
    };
    
    setHabits([...habits, habit]);
    setNewHabit('');
    
    toast({
      title: "Habit Added",
      description: `${newHabit} has been added to your habits.`
    });
  };

  const captureHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    // This will trigger the TaskCapture component
    // Implementation will be connected to the existing TaskCapture component
    toast({
      title: "Capture Habit",
      description: `Let's verify your ${habit.name} habit.`
    });
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
            
            <Button
              onClick={() => captureHabit(habit.id)}
              className="w-full bg-focus hover:bg-focus/90"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Progress
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};