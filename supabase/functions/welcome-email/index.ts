import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FocusFlow <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to FocusFlow!',
        html: `
          <h1>Welcome to FocusFlow!</h1>
          <p>Thank you for joining our productivity platform. We're excited to help you achieve your goals!</p>
          <p>Here's what you can do with FocusFlow:</p>
          <ul>
            <li>Use our Focus Timer to stay productive</li>
            <li>Track your habits with AI verification</li>
            <li>Plan your day with our smart calendar</li>
            <li>Connect with friends and stay motivated</li>
          </ul>
          <p>Get started by setting up your first focus session!</p>
        `,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});