import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Check, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TaskCaptureProps {
  onClose: () => void;
  habitName?: string;
}

export const TaskCapture: React.FC<TaskCaptureProps> = ({ onClose, habitName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      setPhoto(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleSubmit = () => {
    // Here we would typically send the photo to an AI service for verification
    toast({
      title: "Habit Verified!",
      description: habitName 
        ? `Great job completing your ${habitName} habit!`
        : "Great job completing your task!",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {habitName ? `Capture ${habitName}` : 'Capture Your Task'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          {!photo && !stream && (
            <div className="h-full flex items-center justify-center">
              <Button onClick={startCamera}>
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
              </Button>
            </div>
          )}
          {!photo && stream && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          {photo && (
            <img src={photo} alt="Captured task" className="w-full h-full object-cover" />
          )}
        </div>

        <div className="flex justify-end space-x-2">
          {stream && !photo && (
            <Button onClick={takePhoto} className="bg-focus hover:bg-focus/90">
              Take Photo
            </Button>
          )}
          {photo && (
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
              <Check className="mr-2 h-4 w-4" />
              Verify Habit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};