# Backend API Integration Guide

## Overview
This document describes the integration of backend API functionality into the polished frontend. The frontend UI/UX has been preserved while adding real authentication, voice onboarding, and profile management capabilities.

## What Was Integrated

### 1. **Supabase Authentication** ✅
- **File**: `src/pages/Auth.tsx`
- **Features**:
  - Magic link email authentication
  - .edu email validation
  - User signup with name and age
  - Session management with auto-refresh
- **Context**: `src/contexts/AuthContext.tsx`

### 2. **Voice Onboarding with Claude AI** ✅
- **File**: `src/pages/VoiceOnboarding.tsx`
- **Features**:
  - Browser-based speech recognition
  - Text-to-speech responses
  - Claude AI conversation flow
  - Profile data collection (interests, partner preferences, qualities)
  - Automatic profile saving to Supabase
- **Dependencies**: Claude API proxy server

### 3. **Profile Management** ✅
- **File**: `src/lib/profile.ts`
- **Features**:
  - Get user profile from Supabase
  - Upsert profile data
  - TypeScript types for profile records

### 4. **Backend Utilities** ✅
- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/claude.ts` - Claude API integration
- `src/lib/vapi.ts` - VAPI voice AI client
- `src/lib/profile.ts` - Profile management functions

### 5. **Context Providers** ✅
- `AuthContext` - Authentication state management
- `OnboardingContext` - Onboarding data management
- `UserContext` - User preferences (existing, preserved)

## File Structure

```
frontend/campus-chat-sync/
├── .env                          # Environment variables (NEW)
├── server.js                     # Claude API proxy server (NEW)
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client (NEW)
│   │   ├── claude.ts            # Claude API client (NEW)
│   │   ├── vapi.ts              # VAPI client (NEW)
│   │   └── profile.ts           # Profile management (NEW)
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Auth state (NEW)
│   │   ├── OnboardingContext.tsx # Onboarding state (NEW)
│   │   └── UserContext.tsx      # User preferences (EXISTING)
│   ├── pages/
│   │   ├── Auth.tsx             # Updated with real auth
│   │   └── VoiceOnboarding.tsx  # Updated with Claude AI
│   └── vite-env.d.ts            # Updated with env types
└── package.json                  # Updated with new deps
```

## Environment Variables

The following environment variables are required (already configured in `.env`):

```env
VITE_SUPABASE_URL=https://sjetttagqvwvvgrflwsg.supabase.co
VITE_SUPABASE_ANON_KEY=<key>
VITE_VAPI_PUBLIC_API_KEY=<key>
VITE_VAPI_ASSISTANT_ID=<id>
VITE_ANTHROPIC_API_KEY=<key>
VITE_GOOGLE_CLIENT_ID=<id>
VITE_AI_DATE_CALENDAR_ID=<email>
```

## Running the Application

### 1. Start the Claude API Proxy Server
```bash
npm run server
```
This starts the Express server on `http://localhost:3001` that proxies requests to Claude API.

### 2. Start the Frontend Development Server
```bash
npm run dev
```
This starts the Vite development server (usually on `http://localhost:5173`).

### 3. Access the Application
Open your browser to the Vite dev server URL and you'll see:
- Landing page with "Get Started" button
- Auth page with magic link email authentication
- Voice onboarding with Claude AI
- All other existing pages with preserved UI/UX

## New Dependencies Added

```json
{
  "@supabase/supabase-js": "^2.76.1",
  "@vapi-ai/web": "^2.5.0",
  "cors": "^2.8.5",
  "dotenv": "^16.6.1",
  "express": "^4.21.2"
}
```

## API Endpoints

### Claude API Proxy
- **Endpoint**: `POST http://localhost:3001/api/claude`
- **Purpose**: Proxies requests to Claude API to avoid CORS issues
- **Request Body**:
  ```json
  {
    "messages": [{"role": "user", "content": "..."}],
    "system": "System prompt..."
  }
  ```

## Authentication Flow

1. User enters .edu email on `/auth`
2. Supabase sends magic link to email
3. User clicks link → redirected to `/onboarding/voice`
4. Session is stored in localStorage
5. AuthContext manages session state globally

## Voice Onboarding Flow

1. User lands on `/onboarding/voice`
2. Microphone permission requested
3. User speaks or types responses
4. Claude AI asks 4 questions:
   - Interests
   - Partner gender preference
   - Partner's interests
   - Desired qualities
5. Profile data saved to Supabase
6. User redirected to dashboard/discover

## What Was NOT Changed

The following frontend features remain unchanged to preserve the polished UX:
- ✅ All UI components (shadcn/ui)
- ✅ Tailwind CSS styling
- ✅ Page layouts and designs
- ✅ Navigation structure
- ✅ Dating/Friends mode toggle
- ✅ Discover page with swipe cards
- ✅ Matches and Chat pages
- ✅ Profile pages
- ✅ Calendar integration UI
- ✅ Recommended page

## Testing the Integration

### Test Authentication
1. Go to `/auth`
2. Enter a .edu email (e.g., `test@stanford.edu`)
3. Enter name and age
4. Click "Send sign-up link"
5. Check email for magic link
6. Click link to authenticate

### Test Voice Onboarding
1. After authentication, you'll be on `/onboarding/voice`
2. Click microphone button or type responses
3. Answer the 4 questions
4. Verify profile is saved (check browser console)
5. Should redirect to dashboard

### Test Profile Management
```javascript
import { getProfile, upsertProfile } from '@/lib/profile';

// Get current user's profile
const profile = await getProfile();

// Update profile
await upsertProfile({
  bio: "Updated bio",
  interests: ["AI", "Hiking"]
});
```

## Troubleshooting

### "Cannot find module" errors
Run `npm install` to install all dependencies.

### Claude API errors
Make sure the proxy server is running (`npm run server`).

### Authentication not working
1. Check Supabase credentials in `.env`
2. Verify email is a valid .edu address
3. Check browser console for errors

### Voice recognition not working
1. Grant microphone permissions in browser
2. Use Chrome/Edge (best support)
3. Try typing instead (fallback option)

## Next Steps

To complete the integration:

1. **Connect Discover Page**: Update `/discover` to fetch real profiles from Supabase
2. **Connect Matches Page**: Integrate real match data
3. **Connect Chat**: Add real-time messaging with Supabase Realtime
4. **Add Calendar Integration**: Connect Google Calendar OAuth
5. **Deploy**: Set up production environment variables

## Architecture Decisions

### Why Proxy Server?
The Claude API requires server-side API key management to avoid exposing keys in the browser. The Express proxy server handles this securely.

### Why Magic Links?
Magic links provide passwordless authentication, reducing friction and improving security. Users don't need to remember passwords.

### Why Browser Speech Recognition?
Using the Web Speech API avoids additional API costs and provides instant feedback. VAPI is available as a fallback for better quality.

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure both servers (proxy and dev) are running
4. Check Supabase dashboard for auth logs
