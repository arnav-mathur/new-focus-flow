import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Trophy, TrendingUp } from "lucide-react";
import { HabitFeed } from '@/components/social/HabitFeed';

const SocialPage = () => {
  const friends = [
    { 
      name: "Alex Kim", 
      avatar: "/placeholder.svg",
      habits: [
        { name: "Gym", streak: 7 },
        { name: "Meditation", streak: 12 },
        { name: "Reading", streak: 5 }
      ]
    },
    { 
      name: "Sarah Chen", 
      avatar: "/placeholder.svg",
      habits: [
        { name: "Yoga", streak: 15 },
        { name: "Writing", streak: 8 },
        { name: "Running", streak: 3 }
      ]
    },
    { 
      name: "Mike Johnson", 
      avatar: "/placeholder.svg",
      habits: [
        { name: "Swimming", streak: 4 },
        { name: "Coding", streak: 20 },
        { name: "Guitar", streak: 6 }
      ]
    },
  ];

  const habitPosts = [
    {
      id: '1',
      userId: '1',
      userName: 'Alex Kim',
      userAvatar: '/placeholder.svg',
      habitName: 'Gym Workout',
      imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      timestamp: new Date('2024-03-10T10:30:00'),
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah Chen',
      userAvatar: '/placeholder.svg',
      habitName: 'Morning Yoga',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      timestamp: new Date('2024-03-10T08:15:00'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
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

          <div className="space-y-6">
            {friends.map((friend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-white/50 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-gray-900 mb-2">{friend.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {friend.habits.map((habit, habitIndex) => (
                        <div
                          key={habitIndex}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-600">{habit.name}</span>
                          <div className="flex items-center text-yellow-500">
                            <Trophy className="w-4 h-4 mr-1" />
                            <span className="text-sm font-medium">{habit.streak}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 className="text-xl font-semibold text-focus mb-6">Recent Achievements</h2>
          <HabitFeed posts={habitPosts} />
        </div>
      </motion.div>
    </div>
  );
};

export default SocialPage;
