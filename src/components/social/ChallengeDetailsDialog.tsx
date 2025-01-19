import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ChallengeStatusBadge } from "./ChallengeStatusBadge";
import { Challenge } from "@/hooks/useChallenges";

interface ChallengeDetailsDialogProps {
  challenge: Challenge | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChallengeDetailsDialog({
  challenge,
  open,
  onOpenChange,
}: ChallengeDetailsDialogProps) {
  if (!challenge) return null;

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
            <h4 className="text-sm font-medium mb-2">Participants</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Challenger:</span>
                <span className="ml-2">{challenge.challenger.username}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Challenged:</span>
                <span className="ml-2">{challenge.challenged.username}</span>
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
            <h4 className="text-sm font-medium mb-2">Details</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="ml-2">
                  {format(new Date(challenge.created_at), 'MMM d, yyyy')}
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