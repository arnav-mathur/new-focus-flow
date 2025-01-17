import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLikes } from "@/hooks/useLikes";

interface LikeButtonProps {
  postId: string;
  userId: string;
}

export const LikeButton = ({ postId, userId }: LikeButtonProps) => {
  const { isLiked, likeCount, isLoading, toggleLike } = useLikes(postId, userId);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLike}
        disabled={isLoading}
        className={isLiked ? "text-red-500" : ""}
      >
        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        <span className="ml-1">{likeCount}</span>
      </Button>
    </div>
  );
};