import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "This app has completely transformed my productivity. The AI verification keeps me accountable!",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The focus timer and app blocking features have helped me stay on track with my coding projects.",
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
    {
      name: "Emily Rodriguez",
      role: "Student",
      content: "Love how the AI helps verify my study habits. It's like having a personal accountability partner!",
      avatar: "https://i.pravatar.cc/150?u=emily",
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Basic Focus Timer",
        "Simple Habit Tracking",
        "Limited AI Verifications",
      ],
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Pro",
      price: "$9.99/month",
      features: [
        "Advanced Focus Timer",
        "Unlimited Habit Tracking",
        "Unlimited AI Verifications",
        "Priority Support",
      ],
      color: "from-blue-500 to-purple-500",
      popular: true,
    },
    {
      name: "Team",
      price: "$19.99/month",
      features: [
        "Everything in Pro",
        "Team Analytics",
        "Admin Dashboard",
        "API Access",
      ],
      color: "from-purple-500 to-pink-500",
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
          <Button 
            onClick={() => navigate('/features')} 
            className="mt-8 text-lg"
            size="lg"
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            What our users say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Choose your plan
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg ${
                  plan.popular ? 'ring-2 ring-focus' : ''
                }`}
              >
                {plan.popular && (
                  <span className="bg-focus text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
                <p className="text-4xl font-bold mt-2 mb-6">{plan.price}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-focus" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-2 px-4 rounded-lg bg-gradient-to-r ${plan.color} text-white font-medium hover:opacity-90 transition-opacity`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;