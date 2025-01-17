import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HeadsUpFormProps {
  challengedId: string;
  challengedName: string;
}

export const HeadsUpForm = ({ challengedId, challengedName }: HeadsUpFormProps) => {
  const [habitName, setHabitName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a challenge.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from('heads_up_challenges')
      .insert([
        {
          challenger_id: user.id,
          challenged_id: challengedId,
          habit_name: habitName.trim(),
          is_public: isPublic,
        },
      ]);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create challenge. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Challenge sent to ${challengedName}!`,
    });
    setHabitName('');
    setIsPublic(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="habit">Habit Name</Label>
        <Input
          id="habit"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="e.g., Morning Meditation, Gym Workout"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="public"
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
        <Label htmlFor="public">Make this challenge public</Label>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Sending Challenge..." : "Send Challenge"}
      </Button>
    </form>
  );
};