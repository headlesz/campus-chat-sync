# CampusMatch 🎓💙

**Meaningful Connections. Authentic Experiences. Campus Life Reimagined.**

CampusMatch is a dual-mode social platform designed specifically for college students to build genuine connections—whether for dating, making friends, or finding their community on campus.

---

## 🌟 Philosophy

### **Connection Over Swipes**
Traditional dating apps reduce people to profiles. CampusMatch takes a different approach by:
- **Voice-First Onboarding**: Capture personality and authenticity through voice instead of just photos
- **Mutual Privacy**: GPA sharing is opt-in for both parties, ensuring fair information exchange
- **AI-Powered Matching**: Smart recommendations based on interests, conversations, and compatibility
- **Dual Mode Design**: Seamlessly switch between dating and friend-finding contexts

### **Campus-Centric Experience**
We believe meaningful connections happen in real places:
- **Personalized Venue Recommendations**: AI suggests coffee shops, study spots, and hangout locations
- **Club Discovery**: Find student organizations aligned with your interests
- **Campus Events**: Stay connected to what's happening around you
- **Proximity-Based**: Focus on people and places within your campus community

---

## 🎯 User Experience Flow

### **1. Authentic Onboarding**
```
Landing Page → Voice Introduction → Profile Setup (Interests, Major, GPA opt-in)
```
- Users introduce themselves via voice recording
- Select interests, major, and academic preferences
- Choose whether to share GPA (privacy-first, mutual opt-in system)

### **2. Discovery Mode**
```
Swipe Interface → Match Modal → Direct Messaging
```
- **Dating Mode**: Find romantic connections with students on campus
- **Friends Mode**: Connect with peers to build friendships and expand your social circle
- Swipeable cards with rich profiles (photo, bio, interests, academic info)
- Instant match notifications when both users like each other
- Option to message immediately or keep swiping

### **3. Connections Hub**
```
Matches List → Chat Interface → Venue Suggestions
```
- View all your matches in one place
- Real-time messaging with match previews
- Suggested venues appear based on mutual interests

### **4. Personalized Recommendations**
```
Venues Tab → Clubs Tab → Events Tab
```
- **Venues**: Coffee shops, restaurants, study spots with ratings and directions
- **Clubs**: Student organizations with meeting times and membership info
- **Events**: Campus activities, career fairs, social gatherings with RSVP
- AI explains why each recommendation matches your interests

### **5. Profile Management**
```
View Profile → Edit Settings → Privacy Controls
```
- Manage personal information and photos
- Toggle GPA visibility (affects what you see from others)
- Academic information display with sharing status
- Quick access to settings and logout

---

## ✨ Key Features

### **🎤 Voice Onboarding**
- Capture authentic personality beyond photos
- Optional voice introductions for genuine first impressions

### **🔄 Dual Mode System**
- **Dating Mode**: For romantic connections
- **Friends Mode**: For building friendships and social connections
- Seamless toggle between contexts

### **🔒 Privacy-First GPA Sharing**
- Mutual opt-in system: both users must enable sharing
- Default privacy: GPA hidden unless explicitly enabled
- Fair information exchange policy

### **🤖 AI-Powered Recommendations**
- Smart venue suggestions based on interests and match preferences
- Personalized club recommendations aligned with your major
- Event suggestions that match your social and academic goals

### **💬 Real-Time Messaging**
- Instant notifications on matches
- Message history with last message previews
- Smooth chat interface with timestamp tracking

### **📍 Location Intelligence**
- Distance-based venue recommendations
- Campus-focused discovery radius
- Google Maps integration for directions

### **🎨 Beautiful, Modern UI**
- Sleek card-based design
- Smooth animations and transitions
- Mobile-first responsive layout
- Dark mode support via shadcn-ui theming

---

## 🛠️ Technical Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon system

### **State Management**
- **React Context API** - Global user settings (GPA preferences)
- **React Query** - Server state management (ready for backend integration)

### **Key Libraries**
- `sonner` - Toast notifications
- `framer-motion` - Smooth animations
- `react-hook-form` - Form handling

### **Architecture**
- Component-based architecture for scalability
- Context providers for shared state
- Modular page structure
- Reusable UI components
- API integration comments for backend hookup

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/headlesz/campus-chat-sync.git

# Navigate to project directory
cd campus-chat-sync

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### **Build for Production**

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SwipeCard.tsx           # Swipeable profile card
│   ├── MatchModal.tsx          # Match notification modal
│   ├── VenueDetailModal.tsx    # Venue information modal
│   ├── ClubDetailModal.tsx     # Club details modal
│   └── EventDetailModal.tsx    # Event details modal
├── pages/              # Route-level pages
│   ├── Index.tsx              # Landing page
│   ├── Auth.tsx               # Authentication
│   ├── VoiceOnboarding.tsx    # Voice intro recording
│   ├── ProfileSetup.tsx       # Profile creation
│   ├── Discover.tsx           # Swipe interface
│   ├── Matches.tsx            # Connections list
│   ├── Recommended.tsx        # Venues, clubs, events
│   ├── Chat.tsx               # Messaging interface
│   ├── Profile.tsx            # User profile view
│   └── ProfileSettings.tsx    # Settings & preferences
├── contexts/           # React Context providers
│   └── UserContext.tsx        # User settings state
└── App.tsx            # Main app component with routing
```

---

## 🎨 Design Philosophy

### **User-Centric**
Every feature is designed with the user's authentic experience in mind. We prioritize:
- **Genuine connections** over superficial interactions
- **Privacy and consent** in information sharing
- **Meaningful recommendations** over random suggestions
- **Smooth, intuitive flows** over complex navigation

### **Campus-First**
Built specifically for the college experience:
- Student-focused features (GPA sharing, clubs, campus events)
- Location-aware recommendations
- Academic and social integration
- Community-building tools

### **Mobile-Optimized**
Designed for students on the go:
- Touch-friendly swipe gestures
- Responsive layout for all screen sizes
- Fast load times and smooth animations
- Progressive enhancement approach

---

## 🔮 Future Roadmap

### **Backend Integration**
- [ ] User authentication (Firebase/Supabase)
- [ ] Real-time messaging (WebSocket/Firebase)
- [ ] Profile storage and retrieval
- [ ] Match algorithm implementation
- [ ] Push notifications

### **Enhanced Features**
- [ ] Video profile introductions
- [ ] Group chat for clubs
- [ ] Event RSVP tracking
- [ ] Advanced matching filters
- [ ] Verified student status
- [ ] Photo verification

### **External APIs**
- [ ] Google Places API for venue data
- [ ] Google Maps API for directions
- [ ] Campus Organizations API integration
- [ ] Campus Events Calendar sync
- [ ] Eventbrite API for event tickets

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is part of a hackathon submission and is available for educational purposes.

---

## 👥 Team

Built with ❤️ for college students who deserve authentic connections.

---

## 🐛 Known Issues

- Mock data currently used (backend integration pending)
- GPA settings persist only in session (needs backend storage)
- Voice recording UI implemented but needs audio processing backend

---

**CampusMatch** - Where Campus Life Meets Meaningful Connections 🎓✨
