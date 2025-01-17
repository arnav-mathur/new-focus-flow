import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Share2, MessageCircle, Flame } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LikeButton } from './LikeButton';
import { CommentSection } from './CommentSection';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HabitPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  habitName: string;
  imageUrl: string;
  timestamp: Date;
  currentStreak?: number;
  longestStreak?: number;
}

interface HabitFeedProps {
  posts: HabitPost[];
}

export const HabitFeed = ({ posts }: HabitFeedProps) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const handleShare = async (post: HabitPost) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.userName}'s ${post.habitName}`,
          text: `Check out ${post.userName}'s progress on ${post.habitName}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to share post. Please try again.",
        });
      }
    } else {
      toast({
        title: "Info",
        description: "Sharing is not supported on this browser.",
      });
    }
  };

  const handleCommentClick = (postId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to comment on posts.",
        variant: "destructive",
      });
      return;
    }
    toggleComments(postId);
  };

  const toggleComments = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src={post.userAvatar} />
              <AvatarFallback>{post.userName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{post.userName}</h3>
              <p className="text-sm text-gray-500">
                Completed {post.habitName} • {format(post.timestamp, 'MMM d, h:mm a')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-orange-500">
              <Flame className="h-5 w-5" />
              <div className="flex flex-col items-end">
                <span className="font-medium">
                  {post.currentStreak || 1} day{(post.currentStreak || 1) !== 1 ? 's' : ''}
                </span>
                {post.longestStreak && post.longestStreak > (post.currentStreak || 1) && (
                  <span className="text-xs text-gray-500">
                    Best: {post.longestStreak} days
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={post.imageUrl}
              alt={`${post.habitName} completion`}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex items-center justify-between border-t dark:border-gray-700 pt-3">
            <div className="flex items-center space-x-4">
              <LikeButton postId={post.id} userId={currentUser || ''} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCommentClick(post.id)}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare(post)}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {expandedPost === post.id && currentUser && (
            <div className="mt-4 border-t dark:border-gray-700 pt-4">
              <CommentSection postId={post.id} userId={currentUser} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};