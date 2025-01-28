import { Brain, MapPin, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { VerificationMode } from "@/hooks/useChallenges";

interface VerificationBadgesProps {
  modes: VerificationMode[];
}

const VerificationModeIcon = ({ mode }: { mode: VerificationMode }) => {
  switch (mode) {
    case 'ai':
      return <Brain className="h-4 w-4" />;
    case 'location':
      return <MapPin className="h-4 w-4" />;
    case 'partner':
      return <Users className="h-4 w-4" />;
    default:
      return null;
  }
};

export function VerificationBadges({ modes }: VerificationBadgesProps) {
  return (
    <div className="flex gap-2">
      {modes?.map((mode, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1">
          <VerificationModeIcon mode={mode} />
          <span className="capitalize">{mode}</span>
        </Badge>
      ))}
    </div>
  );
}