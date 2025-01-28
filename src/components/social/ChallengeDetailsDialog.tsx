import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChallengeStatusBadge } from './ChallengeStatusBadge';
import { Challenge } from "@/hooks/useChallenges";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { VerificationBadges } from './challenge-details/VerificationBadges';
import { ParticipantsTable } from './challenge-details/ParticipantsTable';
import { ChallengeMetadata } from './challenge-details/ChallengeMetadata';

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{challenge.habit_name} Challenge</DialogTitle>
          <DialogDescription>Track your progress and verification methods</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Status</h4>
            <ChallengeStatusBadge status={challenge.status} />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Verification Methods</h4>
            <VerificationBadges modes={challenge.verification_modes || []} />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Participants Progress</h4>
            <ParticipantsTable 
              challenge={challenge}
              participantsProgress={participantsProgress}
            />
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
            <ChallengeMetadata challenge={challenge} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}