import { Flame } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Challenge } from "@/hooks/useChallenges";

interface ParticipantProgress {
  userId: string;
  daysCompleted: number;
  breakDaysUsed: number;
  currentStreak: number;
}

interface ParticipantsTableProps {
  challenge: Challenge;
  participantsProgress: ParticipantProgress[];
}

export function ParticipantsTable({ challenge, participantsProgress }: ParticipantsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Participant</TableHead>
          <TableHead>Days Completed</TableHead>
          <TableHead>Break Days Used</TableHead>
          <TableHead>Current Streak</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{challenge.challenger.username}</TableCell>
          <TableCell>
            {participantsProgress.find(p => p.userId === challenge.challenger_id)?.daysCompleted || 0}
          </TableCell>
          <TableCell>
            {participantsProgress.find(p => p.userId === challenge.challenger_id)?.breakDaysUsed || 0}
          </TableCell>
          <TableCell className="flex items-center">
            {participantsProgress.find(p => p.userId === challenge.challenger_id)?.currentStreak || 0}
            <Flame className="h-4 w-4 text-orange-500 ml-1" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{challenge.challenged.username}</TableCell>
          <TableCell>
            {participantsProgress.find(p => p.userId === challenge.challenged_id)?.daysCompleted || 0}
          </TableCell>
          <TableCell>
            {participantsProgress.find(p => p.userId === challenge.challenged_id)?.breakDaysUsed || 0}
          </TableCell>
          <TableCell className="flex items-center">
            {participantsProgress.find(p => p.userId === challenge.challenged_id)?.currentStreak || 0}
            <Flame className="h-4 w-4 text-orange-500 ml-1" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}