import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface HabitPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  habitName: string;
  imageUrl: string;
  timestamp: Date;
}

interface HabitFeedProps {
  posts: HabitPost[];
}

export const HabitFeed = ({ posts }: HabitFeedProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src={post.userAvatar} />
              <AvatarFallback>{post.userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">{post.userName}</h3>
              <p className="text-sm text-gray-500">
                Completed {post.habitName} • {format(post.timestamp, 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={post.imageUrl}
              alt={`${post.habitName} completion`}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};