import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const PlannerPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-focus">AI Planning Assistant</h1>
          <p className="text-gray-600">
            Plan your days with AI-powered insights and scheduling
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </div>

          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-focus">AI Guru</h2>
              <Button size="sm" className="bg-focus">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Advice
              </Button>
            </div>
            <p className="text-gray-600">
              Ask your AI guru for scheduling advice and productivity tips
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlannerPage;