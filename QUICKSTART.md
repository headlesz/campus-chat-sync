# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd /Users/kushagraaitha/Documents/calhacks_/merge2/frontend/campus-chat-sync
npm install
```

### Step 2: Start the Claude API Proxy Server
Open a terminal and run:
```bash
npm run server
```
Keep this terminal open. You should see:
```
Claude proxy server running on http://localhost:3001
```

### Step 3: Start the Frontend Dev Server
Open a **new terminal** and run:
```bash
npm run dev
```
You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser
Visit `http://localhost:5173/` and you'll see the CampusMatch landing page!

## 🎯 Test the Integration

### Test 1: Authentication
1. Click "Get Started" on the landing page
2. Enter a .edu email (e.g., `yourname@stanford.edu`)
3. Enter your name and age
4. Click "Send sign-up link"
5. Check your email and click the magic link
6. You'll be redirected to voice onboarding

### Test 2: Voice Onboarding
1. After authentication, you're on the voice onboarding page
2. Click the microphone button (or type your responses)
3. Answer the 4 questions:
   - What are your interests?
   - What gender are you interested in dating?
   - What interests should your match have?
   - What qualities do you value?
4. Your profile will be saved automatically
5. You'll be redirected to the dashboard

### Test 3: Explore the App
- Navigate to `/discover` to see the swipe interface
- Toggle between Dating and Friends modes
- Check out `/matches` to see your matches
- Visit `/profile` to view your profile

## 📁 Project Structure

```
frontend/campus-chat-sync/
├── server.js              # Claude API proxy (port 3001)
├── .env                   # Environment variables
├── src/
│   ├── lib/              # Backend utilities
│   │   ├── supabase.ts   # Supabase client
│   │   ├── claude.ts     # Claude AI client
│   │   ├── vapi.ts       # Voice AI client
│   │   └── profile.ts    # Profile management
│   ├── contexts/         # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── OnboardingContext.tsx
│   │   └── UserContext.tsx
│   └── pages/            # Page components
│       ├── Auth.tsx      # Authentication
│       ├── VoiceOnboarding.tsx
│       ├── Discover.tsx
│       ├── Matches.tsx
│       └── ...
```

## 🔧 Configuration

All environment variables are already configured in `.env`:
- ✅ Supabase URL and API key
- ✅ VAPI API key
- ✅ Claude API key
- ✅ Google Calendar credentials

## ⚠️ Important Notes

1. **Two Servers Required**: You need BOTH servers running:
   - Claude proxy server (port 3001)
   - Vite dev server (port 5173)

2. **Email Requirement**: Authentication requires a valid .edu email address

3. **Microphone Permission**: Voice onboarding needs microphone access (or use text input as fallback)

4. **Browser Compatibility**: Best experience in Chrome/Edge for voice features

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Claude API not responding
Make sure the proxy server is running:
```bash
npm run server
```

### Authentication fails
1. Check `.env` file exists with Supabase credentials
2. Verify email is a .edu address
3. Check browser console for errors

### Voice recognition not working
1. Allow microphone permissions in browser
2. Use Chrome or Edge browser
3. Use text input as fallback (type your responses)

## 📚 Documentation

- **Full Integration Guide**: See `INTEGRATION_GUIDE.md`
- **Backend Code**: Located in `/backend/calhacks/`
- **Frontend Code**: Located in `/frontend/campus-chat-sync/`

## 🎨 What's Preserved

The polished frontend UX is completely preserved:
- ✅ Beautiful UI with shadcn/ui components
- ✅ Smooth animations and transitions
- ✅ Responsive design
- ✅ Dating/Friends mode toggle
- ✅ Swipe card interface
- ✅ Chat interface
- ✅ Profile pages

## 🔄 What's New

Backend functionality now integrated:
- ✅ Real Supabase authentication
- ✅ Claude AI voice onboarding
- ✅ Profile data persistence
- ✅ Session management
- ✅ Magic link email authentication

## 🚧 Next Steps

To complete the app:
1. Connect Discover page to fetch real profiles from Supabase
2. Implement real-time chat with Supabase Realtime
3. Add Google Calendar OAuth integration
4. Implement matching algorithm
5. Deploy to production

## 💡 Tips

- Use the browser's DevTools console to see API calls and responses
- Check the Network tab to debug authentication issues
- The voice onboarding saves data to Supabase automatically
- You can skip voice onboarding and use the text input instead

## 🎉 You're All Set!

The backend API functionality is now fully integrated into your polished frontend. The app maintains its beautiful UX while now having real authentication, AI-powered voice onboarding, and database persistence.

Happy coding! 🚀
