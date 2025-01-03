import { motion } from 'framer-motion';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const SocialPage = () => {
  const friends = [
    { name: "Alex Kim", streak: 7, focus: "4h 30m" },
    { name: "Sarah Chen", streak: 12, focus: "6h 15m" },
    { name: "Mike Johnson", streak: 5, focus: "3h 45m" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-focus">Friends Progress</h1>
          <p className="text-gray-600">
            Stay motivated by tracking progress with friends
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-focus">Your Friends</h2>
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
          </div>

          <div className="space-y-4">
            {friends.map((friend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/50"
              >
                <div className="flex items-center space-x-4">
                  <Avatar />
                  <div>
                    <h3 className="font-medium text-gray-900">{friend.name}</h3>
                    <p className="text-sm text-gray-600">
                      {friend.streak} day streak
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-focus">{friend.focus}</p>
                  <p className="text-sm text-gray-600">Today's focus time</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialPage;