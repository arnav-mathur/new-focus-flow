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
      if (!user) {
        setError('User not authenticated');
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