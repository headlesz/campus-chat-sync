import { supabase } from '@/lib/supabase';

export type ProfileRecord = {
  user_id: string;
  name?: string | null;
  age?: number | null;
  bio?: string | null;
  major?: string | null;
  year?: string | null;
  interests?: string[] | null;
  partner_gender?: 'male' | 'female' | 'non-binary' | 'no-preference' | null;
  partner_interests?: string[] | null;
  qualities?: string[] | null;
  avatar_url?: string | null; // If later you upload to storage
  updated_at?: string;
};

export async function getProfile(): Promise<ProfileRecord | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single();
  if (error) return null;
  return data as ProfileRecord;
}

export async function upsertProfile(partial: Omit<Partial<ProfileRecord>, 'user_id'>) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');
  const payload: ProfileRecord = {
    user_id: session.user.id,
    ...partial,
  } as any;
  
  console.log('💾 Saving profile data:', payload);
  
  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'user_id' })
    .select()
    .single();
  
  if (error) {
    console.error('❌ Profile save error:', error);
    // Tolerate missing table or restricted policies in client flows
    const msg = `${error.message || ''}`.toLowerCase();
    if (error.code === '42P01' || // undefined_table
        error.code === 'PGRST116' || // postgrest not found
        msg.includes('not found') || msg.includes('404')) {
      return null;
    }
    return null;
  }
  
  console.log('✅ Profile saved successfully:', data);
  return data as ProfileRecord;
}
