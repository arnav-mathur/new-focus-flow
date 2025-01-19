import React, { useEffect, useState } from 'react';
import { WalkthroughTutorial } from "@/components/tutorial/WalkthroughTutorial";
import { HabitFeed } from "@/components/social/HabitFeed";
import { ChallengesTable } from "@/components/social/ChallengesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const SocialPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      const { data: postsData, error: postsError } = await supabase
        .from('habit_posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load posts. Please try again.",
        });
        return;
      }

      console.log('Posts data:', postsData);

      if (!postsData || postsData.length === 0) {
        console.log('No posts found');
        setPosts([]);
        return;
      }

      // Fetch streaks for each post's user and habit
      const postsWithStreaks = await Promise.all(
        postsData.map(async (post) => {
          console.log('Processing post:', post);
          const { data: streakData, error: streakError } = await supabase
            .from('habit_streaks')
            .select('current_streak, longest_streak')
            .eq('user_id', post.user_id)
            .eq('habit_name', post.habit_name)
            .maybeSingle();

          if (streakError) {
            console.error('Error fetching streak for post:', post.id, streakError);
          }

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

      console.log('Processed posts:', postsWithStreaks);
      setPosts(postsWithStreaks);

    } catch (error) {
      console.error('Error in fetchPosts:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while loading the feed.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <WalkthroughTutorial />
      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="text-gray-500">Be the first to share your habit progress!</p>
            </div>
          ) : (
            <HabitFeed posts={posts} />
          )}
        </TabsContent>
        <TabsContent value="challenges">
          <ChallengesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialPage;
