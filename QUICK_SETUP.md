# Quick Supabase Setup Guide

## The "load failed" error means you need to set up Supabase credentials.

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project" 
3. Sign up/login with GitHub
4. Click "New Project"
5. Choose organization and enter project details
6. Wait for project to be ready (2-3 minutes)

### Step 2: Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 3: Update the Code
Replace the placeholder values in `src/lib/supabase.ts`:

```typescript
// Replace these lines:
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

// With your actual values:
const SUPABASE_URL = 'https://abcdefgh.supabase.co'  // Your actual URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // Your actual key
```

### Step 4: Configure Authentication
1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:8080`
3. Under **Redirect URLs**, add: `http://localhost:8080/auth/callback`
4. Save changes

### Step 5: Test
1. Restart your dev server: `npm run dev`
2. Try signing up with a `.edu` email
3. Check your email for the magic link

## Need Help?
- Supabase docs: https://supabase.com/docs
- Check browser console for detailed error messages
