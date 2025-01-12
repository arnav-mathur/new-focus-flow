import { motion } from "framer-motion";
import { Timer, Camera, Calendar } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Timer,
      title: "Focus Timer",
      description: "Block distracting apps and stay focused with our Pomodoro timer",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Camera,
      title: "AI-Powered Habit Tracking",
      description: "Document and verify your habits with AI assistance",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      title: "Smart Planning",
      description: "Get personalized scheduling advice from your AI assistant",
      color: "from-purple-500 to-pink-500",
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Everything you need to stay productive
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-white/20 shadow-xl"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;