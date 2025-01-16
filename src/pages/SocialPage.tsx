import React, { useEffect, useState } from 'react';
import { WalkthroughTutorial } from "@/components/tutorial/WalkthroughTutorial";
import { HabitFeed } from "@/components/social/HabitFeed";
import { supabase } from "@/integrations/supabase/client";

const SocialPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('habit_posts')
        .select(`
          id,
          habit_name,
          image_url,
          created_at,
          user_id,
          profiles (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        return;
      }

      // Fetch streaks for each post's user and habit
      const postsWithStreaks = await Promise.all(
        postsData.map(async (post) => {
          const { data: streakData } = await supabase
            .from('habit_streaks')
            .select('current_streak, longest_streak')
            .eq('user_id', post.user_id)
            .eq('habit_name', post.habit_name)
            .maybeSingle();

          return {
            id: post.id,
            userId: post.user_id,
            userName: post.profiles?.username || 'Anonymous',
            userAvatar: post.profiles?.avatar_url,
            habitName: post.habit_name,
            imageUrl: post.image_url || '/placeholder.svg',
            timestamp: new Date(post.created_at),
            currentStreak: streakData?.current_streak,
            longestStreak: streakData?.longest_streak,
          };
        })
      );

      setPosts(postsWithStreaks);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <WalkthroughTutorial />
      <HabitFeed posts={posts} />
    </div>
  );
};

export default SocialPage;