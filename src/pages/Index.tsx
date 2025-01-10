import { motion } from "framer-motion";
import { ArrowRight, Timer, Camera, Calendar, Users, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Send welcome email when user signs up
        fetch('/api/welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email }),
        });
        navigate('/focus');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  const reviews = [
    {
      name: "Sarah K.",
      role: "Product Designer",
      content: "FocusFlow has transformed my work habits. The AI verification keeps me accountable!",
      rating: 5
    },
    {
      name: "Michael R.",
      role: "Software Engineer",
      content: "The focus timer and app blocking features have doubled my productivity.",
      rating: 5
    },
    {
      name: "Emma L.",
      role: "Content Creator",
      content: "Love the social features! Seeing friends' progress keeps me motivated.",
      rating: 4
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Basic Focus Timer",
        "3 Habits Tracking",
        "Basic Planning Tools",
        "Community Access"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      features: [
        "Advanced Focus Timer",
        "Unlimited Habits",
        "AI Verification",
        "Priority Support",
        "Advanced Analytics"
      ],
      popular: true
    },
    {
      name: "Team",
      price: "$19.99",
      features: [
        "Everything in Pro",
        "Team Collaboration",
        "Admin Dashboard",
        "Custom Integrations",
        "Priority Support"
      ]
    }
  ];

  if (session) {
    navigate('/focus');
    return null;
  }

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
        </motion.div>
      </section>

      {/* Auth Section */}
      <section className="py-10 px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            redirectTo={window.location.origin}
          />
        </div>
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

      {/* Reviews Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What our users say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="ml-3">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.content}</p>
                <div className="flex mt-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, transparent pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl ${
                  plan.popular ? "ring-2 ring-focus" : ""
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 text-sm text-white bg-focus rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-4xl font-bold mt-4 mb-6">{plan.price}<span className="text-sm text-gray-500">/month</span></p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-focus" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "bg-focus" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;