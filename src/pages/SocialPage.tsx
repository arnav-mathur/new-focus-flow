import { useEffect, useState } from 'react';
import { WalkthroughTutorial } from "@/components/tutorial/WalkthroughTutorial";
import { HabitFeed } from "@/components/social/HabitFeed";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface HabitPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  habitName: string;
  imageUrl: string;
  timestamp: Date;
}

const SocialPage = () => {
  const [posts, setPosts] = useState<HabitPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: postsData, error } = await supabase
          .from('habit_posts')
          .select(`
            id,
            user_id,
            habit_name,
            image_url,
            created_at,
            profiles (
              username,
              avatar_url
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedPosts = (postsData || []).map(post => ({
          id: post.id,
          userId: post.user_id,
          userName: post.profiles?.username || 'Anonymous',
          userAvatar: post.profiles?.avatar_url,
          habitName: post.habit_name,
          imageUrl: post.image_url || '/placeholder.svg',
          timestamp: new Date(post.created_at),
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load posts. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-200 dark:bg-gray-800 h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <WalkthroughTutorial />
      <HabitFeed posts={posts} />
    </div>
  );
};

export default SocialPage;