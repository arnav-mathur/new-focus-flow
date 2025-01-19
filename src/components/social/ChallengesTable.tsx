import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useChallenges } from "@/hooks/useChallenges";
import { ChallengeStatusBadge } from './ChallengeStatusBadge';
import { ChallengeDetailsDialog } from './ChallengeDetailsDialog';

export const ChallengesTable = () => {
  const { challenges, loading, error } = useChallenges();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading challenges: {error}
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-4">Loading challenges...</div>;
  }

  if (challenges.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No challenges found. Try challenging a friend!
      </div>
    );
  }

  const handleRowClick = (challenge) => {
    setSelectedChallenge(challenge);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Habit</TableHead>
              <TableHead>Challenger</TableHead>
              <TableHead>Challenged</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Visibility</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challenges.map((challenge) => (
              <TableRow 
                key={challenge.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(challenge)}
              >
                <TableCell className="font-medium">{challenge.habit_name}</TableCell>
                <TableCell>{challenge.challenger.username}</TableCell>
                <TableCell>{challenge.challenged.username}</TableCell>
                <TableCell>
                  <ChallengeStatusBadge status={challenge.status} />
                </TableCell>
                <TableCell>
                  {format(new Date(challenge.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {challenge.is_public ? 'Public' : 'Private'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ChallengeDetailsDialog 
        challenge={selectedChallenge}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};