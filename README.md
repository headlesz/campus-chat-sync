````markdown
# 🌐 CampusMatch — AI-Powered Campus Connection Platform

**Tagline:** Turn voice intros and chat into real, meaningful campus meetups — verified, contextual, and scheduled.

---

## 💡 Inspiration

Campus life is full of opportunities, yet it’s often hard to meet people who share your interests. We wanted to make finding genuine connections — romantic, social, or professional — easier and more natural. That’s why we built **CampusMatch**, an AI-powered, campus-verified platform that connects students through shared experiences, conversations, and real-world meetups.

---

## 💬 What It Does

CampusMatch verifies students through university email and voice-based onboarding. The AI transcribes and understands a student’s self-introduction to automatically generate a personalized profile.

- **Phase 1:** Recommends campus clubs, events, and venues based on the profile.
- **Phase 2:** Analyzes chat topics to suggest shared activities or nearby meet-up spots — for example, recommending a bubble tea café when two users chat about boba.
- Syncs with **Google Calendar** to help users find mutual availability and schedule meetups effortlessly.

---

## 🛠️ How We Built It

- **Frontend:** React with responsive design for web and mobile.
- **Backend:** Node.js + Express APIs with PostgreSQL for structured data.
- **AI Integration:** Claude API for chat analysis and icebreaker generation.
- **Voice Onboarding:** Speech-to-text using the Web Speech API to capture introductions.
- **Recommendations:** Context-aware engine powered by Google Places API and interest matching.
- **Calendar Scheduling:** Google Calendar API for automatic time slot suggestions.
- **Collaboration:** Managed through Git with coordinated branching and merging.

---

## ⚡ Challenges We Ran Into

- Managing real-time AI chat analysis while maintaining low latency.
- Achieving accurate voice transcription from varied accents and noisy environments.
- Handling secure OAuth flows for Google Calendar without complicating UX.
- Synchronizing backend updates with a rapidly evolving React frontend.

---

## 🏆 Accomplishments We’re Proud Of

- Built a fully functional AI-driven matching and recommendation system.  
- Successfully integrated Claude for contextual conversation support.  
- Created voice-based onboarding that turns spoken intros into structured profiles.  
- Implemented calendar scheduling that respects privacy and consent.  

---

## 📚 What We Learned

- How to build AI features that **enhance** human connection rather than replace it.  
- The importance of team collaboration and Git discipline during a hackathon.  
- Balancing privacy, usability, and intelligence in personal-data-heavy apps.  
- The power of combining LLMs with real-world APIs to create personalized experiences.  

---

## 🚀 What’s Next

- Launching a personalized event feed powered by embeddings and interest clustering.  
- Introducing AI safety assistants to promote secure meetups and verify venues.  
- Expanding beyond campuses to alumni networks and city-based communities.  
- Refining recommendation models with real user feedback to improve match quality.  

---

## 🧠 Tech Stack

**Frontend**
- React (responsive web + mobile-friendly UI)
- Web Speech API for speech capture

**Backend**
- Node.js + Express
- PostgreSQL for structured data

**AI & Services**
- Claude API (chat analysis + icebreaker generation)
- Google Places API (venue suggestions)
- Google Calendar API (scheduling)

**Collaboration & Tools**
- Git for version control
- Postman for API testing

**Built With**
> claude · coderabbit · elastic · google · groq · node.js · postman · react · vapi · y-combinator

---

## ⚙️ Getting Started

This project was bootstrapped with **Create React App**.

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Google API credentials (Places + Calendar)
- Claude API Key

### 1. Clone the Repo

```bash
git clone https://github.com/headlesz/campus-chat-sync.git
cd campus-chat-sync
````

### 2. Install Dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

### 3. Set Up Environment Variables

Create `.env` files for frontend and backend.

**Backend (`/backend/.env`):**

```
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/campusmatch
CLAUDE_API_KEY=your_claude_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_PLACES_API_KEY=your_google_places_api_key
SESSION_SECRET=your_secret
```

**Frontend (`/frontend/.env`):**

```
REACT_APP_API_BASE_URL=http://localhost:4000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_PLACES_API_KEY=your_google_places_api_key
```

### 4. Run Locally

Frontend:

```bash
cd frontend
npm start
```

Backend:

```bash
cd backend
npm run dev
```

Frontend: [http://localhost:3000](http://localhost:3000)
Backend: [http://localhost:4000](http://localhost:4000)

---

## 🧩 Available Scripts

In the frontend project directory, you can run:

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
Optimizes React in production mode and minifies the build.

### `npm run eject`

**Note:** This is a one-way operation. Once you eject, you can’t go back!

---

## 💡 Challenges & Learnings (Condensed)

* Real-time AI chat analysis without latency spikes
* Accurate voice-to-text for diverse accents
* Smooth and secure Google OAuth integration
* Balancing privacy and contextual intelligence

---

## 🗺️ Roadmap

* [ ] Personalized event feed using embeddings
* [ ] AI safety assistant for secure meetups
* [ ] Alumni and community expansion
* [ ] Improved recommendation feedback loop

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🧾 License

This project is licensed under the **MIT License** — you’re free to use, modify, and distribute this software for any purpose, provided that the original copyright and license notice appear in all copies or substantial portions of the Software.

```
MIT License

Copyright (c) 2025 CampusMatch Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

* **Claude API** for chat understanding and icebreaker generation
* **Google APIs** (Places + Calendar) for venue discovery and scheduling
* **Web Speech API** for speech onboarding
* **Hackathon mentors, Y Combinator, and team collaboration** for inspiration

---

## 📫 Contact

**Team:** CampusMatch Developers
**Email:** [xyz@gmail.com](mailto:xyz@gmail.com)
**GitHub:** [headlesz](https://github.com/headlesz)

---

> *“Connecting students through voice, context, and conversation — one chat at a time.”*

