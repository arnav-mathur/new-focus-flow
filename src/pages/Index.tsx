import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Timer, Camera, Calendar, Users } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Timer,
      title: "Focus Timer",
      description: "Block distracting apps and stay focused with our timer",
      to: "/focus",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Camera,
      title: "Habit Tracking",
      description: "Document and verify your habits with AI assistance",
      to: "/habits",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "AI Planner",
      description: "Get personalized scheduling advice from your AI guru",
      to: "/planner",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Social Progress",
      description: "Stay motivated by tracking progress with friends",
      to: "/social",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-focus via-success to-purple-500 text-transparent bg-clip-text">
          Welcome to FocusFlow
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your all-in-one productivity companion for focused work, habit building, and social accountability
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={feature.to}>
              <div className="h-full p-6 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl transition-transform hover:scale-105">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-focus mb-2">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Index;