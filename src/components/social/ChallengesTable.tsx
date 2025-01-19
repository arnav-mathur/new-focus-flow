import React, { useEffect, useState } from 'react';
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
import { supabase } from "@/integrations/supabase/client";

interface Challenge {
  id: string;
  challenger_id: string;
  challenged_id: string;
  habit_name: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  is_public: boolean;
  created_at: string;
  challenger: {
    username: string;
    avatar_url: string;
  };
  challenged: {
    username: string;
    avatar_url: string;
  };
}

export const ChallengesTable = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('heads_up_challenges')
      .select(`
        *,
        challenger:challenger_id(username, avatar_url),
        challenged:challenged_id(username, avatar_url)
      `)
      .or(`challenger_id.eq.${user.id},challenged_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching challenges:', error);
      return;
    }

    setChallenges(data || []);
    setLoading(false);
  };

  const getStatusBadgeColor = (status: Challenge['status']) => {
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

  return (
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
            <TableRow key={challenge.id}>
              <TableCell className="font-medium">{challenge.habit_name}</TableCell>
              <TableCell>{challenge.challenger.username}</TableCell>
              <TableCell>{challenge.challenged.username}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(challenge.status)}>
                  {challenge.status}
                </Badge>
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
  );
};