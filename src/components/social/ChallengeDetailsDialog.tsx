import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format, differenceInDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ChallengeStatusBadge } from "./ChallengeStatusBadge";
import { Challenge } from "@/hooks/useChallenges";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ChallengeDetailsDialogProps {
  challenge: Challenge | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ParticipantProgress {
  userId: string;
  daysCompleted: number;
  breakDaysUsed: number;
  currentStreak: number;
}

export function ChallengeDetailsDialog({
  challenge,
  open,
  onOpenChange,
}: ChallengeDetailsDialogProps) {
  const [participantsProgress, setParticipantsProgress] = useState<ParticipantProgress[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (challenge && open) {
      fetchParticipantsProgress();
    }
  }, [challenge, open]);

  const fetchParticipantsProgress = async () => {
    if (!challenge) return;

    try {
      const { data, error } = await supabase
        .from('challenge_participants')
        .select(`
          user_id,
          days_completed,
          break_days_used,
          current_streak
        `)
        .eq('challenge_id', challenge.id);

      if (error) {
        console.error('Error fetching participants progress:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load participants' progress. Please try again.",
        });
        return;
      }

      setParticipantsProgress(data.map(p => ({
        userId: p.user_id,
        daysCompleted: p.days_completed || 0,
        breakDaysUsed: p.break_days_used || 0,
        currentStreak: p.current_streak || 0,
      })));
    } catch (err) {
      console.error('Error:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  if (!challenge) return null;

  const getDaysRemaining = () => {
    if (!challenge.start_date || !challenge.challenge_duration_days) return null;
    const startDate = new Date(challenge.start_date);
    const daysElapsed = differenceInDays(new Date(), startDate);
    return Math.max(0, challenge.challenge_duration_days - daysElapsed);
  };

  const daysRemaining = getDaysRemaining();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{challenge.habit_name} Challenge</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Status</h4>
            <ChallengeStatusBadge status={challenge.status} />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Participants Progress</h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Challenger:</span>
                <span className="ml-2">{challenge.challenger.username}</span>
                {participantsProgress.find(p => p.userId === challenge.challenger_id) && (
                  <div className="ml-4 text-sm">
                    <div>Days Completed: {participantsProgress.find(p => p.userId === challenge.challenger_id)?.daysCompleted}</div>
                    <div>Current Streak: {participantsProgress.find(p => p.userId === challenge.challenger_id)?.currentStreak} days</div>
                  </div>
                )}
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Challenged:</span>
                <span className="ml-2">{challenge.challenged.username}</span>
                {participantsProgress.find(p => p.userId === challenge.challenged_id) && (
                  <div className="ml-4 text-sm">
                    <div>Days Completed: {participantsProgress.find(p => p.userId === challenge.challenged_id)?.daysCompleted}</div>
                    <div>Current Streak: {participantsProgress.find(p => p.userId === challenge.challenged_id)?.currentStreak} days</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {challenge.description && (
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
            </div>
          )}

          {challenge.location && (
            <div>
              <h4 className="text-sm font-medium mb-2">Location</h4>
              <p className="text-sm text-muted-foreground">{challenge.location}</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-2">Challenge Details</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="ml-2">
                  {format(new Date(challenge.created_at), 'MMM d, yyyy')}
                </span>
              </div>
              {challenge.start_date && (
                <div>
                  <span className="text-sm text-muted-foreground">Started:</span>
                  <span className="ml-2">
                    {format(new Date(challenge.start_date), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
              {daysRemaining !== null && (
                <div>
                  <span className="text-sm text-muted-foreground">Days Remaining:</span>
                  <span className="ml-2">{daysRemaining}</span>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">Break Days:</span>
                <span className="ml-2">
                  {challenge.break_days_allowed 
                    ? `Allowed (max ${challenge.max_break_days} days)`
                    : 'Not allowed'}
                </span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Visibility:</span>
                <Badge variant="outline" className="ml-2">
                  {challenge.is_public ? 'Public' : 'Private'}
                </Badge>
              </div>
              {challenge.is_group_challenge && (
                <div>
                  <span className="text-sm text-muted-foreground">Max Participants:</span>
                  <span className="ml-2">{challenge.max_participants}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}