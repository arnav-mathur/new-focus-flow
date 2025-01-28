import { format, differenceInDays } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Challenge } from "@/hooks/useChallenges";

interface ChallengeMetadataProps {
  challenge: Challenge;
}

export function ChallengeMetadata({ challenge }: ChallengeMetadataProps) {
  const getDaysRemaining = () => {
    if (!challenge.start_date || !challenge.challenge_duration_days) return null;
    const startDate = new Date(challenge.start_date);
    const daysElapsed = differenceInDays(new Date(), startDate);
    return Math.max(0, challenge.challenge_duration_days - daysElapsed);
  };

  const daysRemaining = getDaysRemaining();

  return (
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
  );
}