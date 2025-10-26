# Supabase Setup Instructions

## 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

## 2. Get Your Credentials
1. Go to Settings > API in your Supabase dashboard
2. Copy the Project URL and anon public key

## 3. Create Environment File
Create a `.env.local` file in the root directory with:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Configure Authentication
1. Go to Authentication > Settings in Supabase dashboard
2. Enable "Email" provider
3. Set Site URL to `http://localhost:8080` (or your dev URL)
4. Add redirect URLs:
   - `http://localhost:8080/auth/callback`
   - `http://localhost:8080/**`

## 5. Email Templates (Optional)
Customize email templates in Authentication > Email Templates to match your app branding.
