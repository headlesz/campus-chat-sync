# Google Calendar Integration Setup

## ✅ What's Done:
1. ✅ Packages installed (`@react-oauth/google`, `gapi-script`)
2. ✅ Calendar library created (`src/lib/calendar.ts`)
3. ✅ ChatDemo updated with calendar integration
4. ✅ .env configured with your Client ID

## 🔧 What You Need to Do:

### Step 1: Add API Key (Optional but recommended)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to "APIs & Services" → "Credentials"
3. Click "Create Credentials" → "API Key"
4. Copy the API key
5. Add to `.env`:
   ```
   VITE_GOOGLE_API_KEY=your-api-key-here
   ```

### Step 2: Add Test Users
1. In Google Cloud Console, go to "OAuth consent screen"
2. Scroll to "Test users"
3. Click "Add Users"
4. Add both emails:
   - Your email
   - `janiadarsh2@gmail.com`
5. Save

### Step 3: Share Calendar Access
**From janiadarsh2@gmail.com account:**
1. Go to Google Calendar
2. Settings → Your calendar name
3. "Share with specific people"
4. Add your main email with "See all event details" permission
5. Save

### Step 4: Configure OAuth Redirect URIs
1. Google Cloud Console → "Credentials"
2. Click your OAuth 2.0 Client ID
3. Add to "Authorized JavaScript origins":
   - `http://localhost:5173`
   - `http://localhost:8080`
4. Add to "Authorized redirect URIs":
   - `http://localhost:5173`
   - `http://localhost:8080`
5. Save

## 🚀 How to Use:

1. **Start the app**: `npm run dev`
2. **Go to chat demo**: Opens automatically at `/chat-demo`
3. **Click "Connect Calendar"** button in header
4. **Sign in with your Google account**
5. **Grant calendar permissions**
6. **Type**: `@claude can you find a time for us?`
7. **Claude will**:
   - Check both calendars (yours + janiadarsh2@gmail.com)
   - Find common free slots
   - Suggest specific days/times
   - Recommend places based on interests

## 📅 How It Works:

- **Your calendar**: Fetched from your Google account (primary)
- **AI date calendar**: Fetched from `janiadarsh2@gmail.com`
- **Claude analyzes**: Both calendars to find free slots
- **Suggests**: Top 3-5 common free times in the next week
- **Smart scheduling**: Only suggests 9 AM - 8 PM slots

## 🧪 Test It:

1. Add some events to both calendars
2. Connect calendar in the app
3. Ask: `@claude when are we both free?`
4. Claude will respond with actual calendar data!

## 🐛 Troubleshooting:

- **"Access blocked"**: Add test users in OAuth consent screen
- **"Calendar not found"**: Make sure janiadarsh2@gmail.com calendar is shared
- **"Redirect URI mismatch"**: Add localhost URLs to authorized URIs
- **No free slots found**: Check if calendars have events, or they might actually be fully booked!
