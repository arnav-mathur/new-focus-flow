import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Camera, Trophy, TrendingUp, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { TaskCapture } from './TaskCapture';

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted?: Date;
  insights?: string[];
  location?: Location;
}

export const HabitList = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { 
      id: '1', 
      name: 'Gym', 
      streak: 3,
      insights: ['Most productive in mornings', 'Better streak on weekdays'],
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        name: "Local Gym"
      }
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
  const [newLocation, setNewLocation] = useState('');
  const { toast } = useToast();

  const addHabit = async () => {
    if (!newHabit.trim()) return;
    
    let location: Location | undefined;
    
    if (newLocation.trim()) {
      try {
        const position = await getCurrentPosition();
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: newLocation
        };
      } catch (error) {
        toast({
          title: "Location Error",
          description: "Unable to get location. The habit will be created without location verification.",
          variant: "destructive"
        });
      }
    }
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      streak: 0,
      insights: [],
      location
    };
    
    setHabits([...habits, habit]);
    setNewHabit('');
    setNewLocation('');
    
    toast({
      title: "Habit Added",
      description: `${newHabit} has been added to your habits.`
    });
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
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

  const handleVerificationSuccess = async (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    if (habit.location) {
      try {
        const position = await getCurrentPosition();
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          habit.location.latitude,
          habit.location.longitude
        );

        if (distance > 0.1) { // 0.1 km = 100 meters
          toast({
            title: "Location Verification Failed",
            description: "You're not at the specified location for this habit.",
            variant: "destructive"
          });
          return;
        }
      } catch (error) {
        toast({
          title: "Location Error",
          description: "Unable to verify location. Please check your GPS settings.",
          variant: "destructive"
        });
        return;
      }
    }

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

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
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
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Add new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Location name (optional)"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
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

            {habit.location && (
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{habit.location.name}</span>
              </div>
            )}

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