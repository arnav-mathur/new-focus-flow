import { Badge } from "@/components/ui/badge";

interface ChallengeStatusBadgeProps {
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export const ChallengeStatusBadge = ({ status }: ChallengeStatusBadgeProps) => {
  const getStatusBadgeColor = (status: ChallengeStatusBadgeProps['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'accepted':
        return 'bg-green-500';
      case 'declined':
        return 'bg-red-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Badge className={getStatusBadgeColor(status)}>
      {status}
    </Badge>
  );
};