import { useState } from 'react';
import { FocusTimer } from '@/components/FocusTimer';
import { TaskCapture } from '@/components/TaskCapture';

const Index = () => {
  const [showTaskCapture, setShowTaskCapture] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">FocusFlow</h1>
          <p className="text-gray-600">Stay focused, capture progress, grow stronger</p>
        </div>

        <FocusTimer onCaptureTask={() => setShowTaskCapture(true)} />

        {showTaskCapture && (
          <TaskCapture onClose={() => setShowTaskCapture(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;