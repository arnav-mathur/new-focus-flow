import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface LikeButtonProps {
  postId: string;
  userId: string;
}

export const LikeButton = ({ postId, userId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkLikeStatus();
    fetchLikeCount();
  }, [postId]);

  const checkLikeStatus = async () => {
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

  const handleLike = async () => {
    setIsLoading(true);

    if (isLiked) {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to unlike post. Please try again.",
        });
        setIsLoading(false);
        return;
      }

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

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to like post. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        disabled={isLoading}
        className={isLiked ? "text-red-500" : ""}
      >
        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        <span className="ml-1">{likeCount}</span>
      </Button>
    </div>
  );
};