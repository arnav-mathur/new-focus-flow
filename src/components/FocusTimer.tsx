import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Timer, Pause, Play, Camera, RotateCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FocusTimerProps {
  onCaptureTask: () => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({ onCaptureTask }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [timerMode, setTimerMode] = useState('25');
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        toast({
          title: "Focus Session Complete!",
          description: "Time for a break! Take a picture of your completed task.",
        });
        setStreak(s => s + 1);
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        toast({
          title: "Break Complete!",
          description: "Ready for another focus session?",
        });
        setIsBreak(false);
        setTimeLeft(parseInt(timerMode) * 60);
      }
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, toast, isBreak, timerMode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(parseInt(timerMode) * 60);
  };

  const handleTimerModeChange = (value: string) => {
    setTimerMode(value);
    setTimeLeft(parseInt(value) * 60);
    setIsActive(false);
    setIsBreak(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center space-x-4">
        <Select value={timerMode} onValueChange={handleTimerModeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25 minutes (Pomodoro)</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-6xl font-bold text-focus">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      
      <div className="text-sm text-gray-600">
        {isBreak ? 'Break Time' : 'Focus Time'}
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={toggleTimer}
          className={`${isActive ? 'bg-destructive' : 'bg-focus'} hover:opacity-90`}
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          className="border-focus text-focus hover:bg-focus/10"
        >
          <RotateCcw className="mr-2" />
          Reset
        </Button>

        {!isBreak && (
          <Button
            onClick={onCaptureTask}
            variant="outline"
            className="border-success text-success hover:bg-success/10"
          >
            <Camera className="mr-2" />
            Capture Task
          </Button>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Current Streak: <span className="font-bold text-success">{streak}</span> sessions
      </div>
    </div>
  );
};