import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Timer, Pause, Play, Camera } from 'lucide-react';

interface FocusTimerProps {
  onCaptureTask: () => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({ onCaptureTask }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast({
        title: "Focus Session Complete!",
        description: "Great job! Take a picture of your completed task.",
      });
      setStreak(s => s + 1);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, toast]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="text-6xl font-bold text-focus">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      
      <div className="flex space-x-4">
        <Button
          onClick={toggleTimer}
          className={`${isActive ? 'bg-destructive' : 'bg-focus'} hover:opacity-90`}
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? 'Pause' : 'Start'} Focus
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          className="border-focus text-focus hover:bg-focus/10"
        >
          <Timer className="mr-2" />
          Reset
        </Button>

        <Button
          onClick={onCaptureTask}
          variant="outline"
          className="border-success text-success hover:bg-success/10"
        >
          <Camera className="mr-2" />
          Capture Task
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        Current Streak: <span className="font-bold text-success">{streak}</span> sessions
      </div>
    </div>
  );
};