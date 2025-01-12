import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export const PricingSection = () => {
  return (
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
  );
};