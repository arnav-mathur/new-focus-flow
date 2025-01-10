import { motion } from "framer-motion";
import { ArrowRight, Timer, Camera, Calendar, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

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
    },
    {
      icon: Users,
      title: "Social Progress",
      description: "Stay motivated by tracking progress with friends",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and secure",
      color: "from-teal-500 to-cyan-500",
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-focus via-success to-purple-500 text-transparent bg-clip-text">
            Your Ultimate Productivity Companion
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Combine focus timer, AI-powered habit tracking, and social accountability
            to achieve your goals faster than ever.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-focus hover:bg-focus/90"
              onClick={() => navigate("/focus")}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
                whileInView={{ opacity: 1, y: 0 }}
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
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Ready to boost your productivity?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Join thousands of users who have transformed their productivity habits
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-focus hover:bg-focus/90"
              onClick={() => navigate("/focus")}
            >
              Start Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;