import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdcpzswpecntlqiyzxac.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkY3B6c3dwZWNudGxxaXl6eGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2OTIxODEsImV4cCI6MjA3NTI2ODE4MX0.I1su73bg66XNU1MYAbO3OOoreGZxzgRQrMCmRyS2urw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verify access token
export async function verifyAccessToken(token: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, access_token')
      .eq('access_token', token)
      .single();

    if (error || !data) {
      return null;
    }

    // Update last_login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id);

    return {
      id: data.id,
      name: data.name || data.email,
      email: data.email
    };
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}
