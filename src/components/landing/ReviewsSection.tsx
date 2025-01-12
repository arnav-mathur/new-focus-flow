import { motion } from "framer-motion";

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

export const ReviewsSection = () => {
  return (
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
  );
};