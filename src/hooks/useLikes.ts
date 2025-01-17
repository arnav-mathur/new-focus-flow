import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useLikes = (postId: string, userId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLikeCount();
    if (userId) {
      checkLikeStatus();
    }
  }, [postId, userId]);

  const checkLikeStatus = async () => {
    if (!userId) return;
    
    const { data, error } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error checking like status:', error);
      return;
    }

    setIsLiked(!!data);
  };

  const fetchLikeCount = async () => {
    const { count, error } = await supabase
      .from('post_likes')
      .select('id', { count: 'exact' })
      .eq('post_id', postId);

    if (error) {
      console.error('Error fetching like count:', error);
      return;
    }

    setLikeCount(count || 0);
  };

  const toggleLike = async () => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like posts.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLiked) {
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);

        if (error) throw error;

        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        const { error } = await supabase
          .from('post_likes')
          .insert([
            {
              post_id: postId,
              user_id: userId,
            },
          ]);

        if (error) throw error;

        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isLiked ? 'unlike' : 'like'} post. Please try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    likeCount,
    isLoading,
    toggleLike,
  };
};