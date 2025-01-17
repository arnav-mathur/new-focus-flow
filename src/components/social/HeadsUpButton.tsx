import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HeadsUpForm } from './HeadsUpForm';

interface HeadsUpButtonProps {
  userId: string;
  userName: string;
}

export const HeadsUpButton = ({ userId, userName }: HeadsUpButtonProps) => {
  const { toast } = useToast();

  const handleChallenge = () => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to challenge friends.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleChallenge}
          className="flex items-center gap-2"
        >
          <Trophy className="h-5 w-5" />
          Challenge
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Challenge {userName}</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <HeadsUpForm challengedId={userId} challengedName={userName} />
        </div>
      </SheetContent>
    </Sheet>
  );
};