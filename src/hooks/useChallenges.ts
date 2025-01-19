import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface Challenge {
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

const mockChallenges: Challenge[] = [
  {
    id: '1',
    challenger_id: 'mock-1',
    challenged_id: 'mock-2',
    habit_name: 'Daily Meditation',
    status: 'pending',
    is_public: true,
    created_at: new Date().toISOString(),
    challenger: {
      username: 'MeditationMaster',
      avatar_url: '/placeholder.svg'
    },
    challenged: {
      username: 'ZenLearner',
      avatar_url: '/placeholder.svg'
    }
  },
  {
    id: '2',
    challenger_id: 'mock-2',
    challenged_id: 'mock-1',
    habit_name: 'Morning Workout',
    status: 'accepted',
    is_public: true,
    created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    challenger: {
      username: 'FitnessGuru',
      avatar_url: '/placeholder.svg'
    },
    challenged: {
      username: 'WorkoutBeginner',
      avatar_url: '/placeholder.svg'
    }
  },
  {
    id: '3',
    challenger_id: 'mock-3',
    challenged_id: 'mock-1',
    habit_name: 'Reading',
    status: 'completed',
    is_public: false,
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    challenger: {
      username: 'BookWorm',
      avatar_url: '/placeholder.svg'
    },
    challenged: {
      username: 'NewReader',
      avatar_url: '/placeholder.svg'
    }
  }
];

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // If no authenticated user, return mock data
      if (!user) {
        console.log('No authenticated user found, returning mock challenges');
        setChallenges(mockChallenges);
        setLoading(false);
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from('heads_up_challenges')
        .select(`
          id,
          challenger_id,
          challenged_id,
          habit_name,
          status,
          is_public,
          created_at,
          challenger:profiles!heads_up_challenges_challenger_id_fkey(username, avatar_url),
          challenged:profiles!heads_up_challenges_challenged_id_fkey(username, avatar_url)
        `)
        .or(`challenger_id.eq.${user.id},challenged_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      const typedData = (data || []).map(challenge => ({
        ...challenge,
        status: challenge.status as Challenge['status']
      }));

      setChallenges(typedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { challenges, loading, error };
};