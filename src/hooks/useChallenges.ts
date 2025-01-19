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
  description?: string;
  location?: string;
  is_group_challenge?: boolean;
  max_participants?: number;
  break_days_allowed?: boolean;
  max_break_days?: number;
  challenge_duration_days?: number;
  start_date?: string;
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
    id: '123e4567-e89b-12d3-a456-426614174000',
    challenger_id: 'mock-1',
    challenged_id: 'mock-2',
    habit_name: 'Daily Meditation',
    status: 'pending',
    is_public: true,
    created_at: new Date().toISOString(),
    description: 'Join me for a daily meditation practice!',
    location: 'Zen Garden',
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
    id: '123e4567-e89b-12d3-a456-426614174001',
    challenger_id: 'mock-2',
    challenged_id: 'mock-1',
    habit_name: 'Morning Workout',
    status: 'accepted',
    is_public: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    description: 'Let\'s start the day with energy!',
    location: 'Local Gym',
    is_group_challenge: true,
    max_participants: 4,
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
    id: '123e4567-e89b-12d3-a456-426614174002',
    challenger_id: 'mock-3',
    challenged_id: 'mock-1',
    habit_name: 'Reading',
    status: 'completed',
    is_public: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    description: 'Read for 30 minutes every day',
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

  const fetchChallenges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
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
          description,
          location,
          is_group_challenge,
          max_participants,
          break_days_allowed,
          max_break_days,
          challenge_duration_days,
          start_date,
          challenger:profiles!heads_up_challenges_challenger_id_fkey(username, avatar_url),
          challenged:profiles!heads_up_challenges_challenged_id_fkey(username, avatar_url)
        `)
        .or(`challenger_id.eq.${user.id},challenged_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      const validatedData = (data || []).map(challenge => {
        const validStatus = validateStatus(challenge.status);
        return {
          ...challenge,
          status: validStatus
        };
      }) as Challenge[];

      setChallenges(validatedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const validateStatus = (status: string): Challenge['status'] => {
    const validStatuses: Challenge['status'][] = ['pending', 'accepted', 'declined', 'completed'];
    return validStatuses.includes(status as Challenge['status']) 
      ? (status as Challenge['status']) 
      : 'pending';
  };

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  return { challenges, loading, error };
};
