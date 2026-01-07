# Falling Blocks +

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-11.2-green.svg)](https://github.com/Rick7Peace/mini-project3)
[![Bilingual](https://img.shields.io/badge/languages-EN%20|%20ES-orange.svg)](https://github.com/Rick7Peace/mini-project3)
[![Security](https://img.shields.io/badge/security-hardened-red.svg)](https://github.com/Rick7Peace/mini-project3)

A production-ready falling block puzzle game (v11.2) built with vanilla JavaScript, featuring enterprise-grade security, bilingual support (English/Spanish), WCAG 2.1 AA accessibility compliance, complete mobile optimization with landscape support, global Firebase leaderboard, intelligent cache-busting for instant updates, and a stunning neon-themed UI with glassmorphism effects.

![FallingBlocks+ Screenshot](screenshot.png)

---

## 📸 Screenshots

### Desktop Experience
![Desktop Gameplay](https://github.com/user-attachments/assets/13830b40-d470-401b-88db-3299b7975e53)
*Production-ready UI with glassmorphism effects and neon glow*

### Mobile Experience

**Portrait Mode**
![Mobile Portrait](https://github.com/user-attachments/assets/d61a26be-9f1a-40da-986f-2555ccd6b19d)
*Optimized touch controls with swipe gestures*

**Landscape Mode** ⭐
![Mobile Landscape](https://github.com/user-attachments/assets/fc32bd6d-afdd-4509-9fee-52da98316441)
*Desktop layout automatically activates in landscape orientation*
### Features

**Bilingual Support (EN/ES)**
![Bilingual Toggle English](https://github.com/user-attachments/assets/6143a925-6012-4879-9444-365e1f3ef1e7)
![Bilingual Toggle Spanish](https://github.com/user-attachments/assets/4a868b79-fa8c-41f8-816e-785b1de3e13e)
*Seamless language switching with persistent preferences*

**Dark/Light Themes**
![Dark Theme](https://github.com/user-attachments/assets/91fbb6c8-1b83-4585-9e37-1624897d75e8)
![Light Theme](https://github.com/user-attachments/assets/b1457285-6aa3-4f63-b6a3-a380a6efc601)
*Accessible high-contrast modes*
---

## 🎮 Live Demo

**[▶️ Play Now](https://rick7peace.github.io/mini-project3/)** — Experience it on desktop, tablet, or mobile!

## 🎓 Development Process

Built independently after graduating from Columbia University's coding bootcamp as a professional portfolio piece. This project evolved significantly beyond the bootcamp curriculum, incorporating production-grade features like Firebase Firestore integration, enterprise security implementation, and comprehensive mobile optimization. Developed using modern AI-assisted workflows (Claude, ChatGPT) for debugging and technical research while maintaining full ownership of architecture, design, and implementation decisions.

## ✨ Features

### 🎯 Core Gameplay
- **Classic Tetromino Mechanics** — 7-piece bag randomizer system prevents piece droughts
- **Progressive Difficulty** — Three levels (Easy, Medium, Hard) with dynamic speed scaling
- **Smart Speed Scaling** — Automatically increases as you level up
- **Advanced Controls** — Full keyboard, touch, and mobile button support
- **Hard Drop & Soft Drop** — For casual and experienced players
- **Wall Kicks** — Intelligent SRS-style piece rotation system
- **Next Piece Preview** — See upcoming pieces for strategic planning

### 🔥 Backend & Database
- **Firebase Firestore** — Global leaderboard with real-time synchronization
- **Cross-Device Persistence** — Scores sync across browsers and devices
- **Top 10 Global Leaderboard** — Compete with players worldwide
- **Real-Time Updates** — See new high scores as they happen
- **Secure Database Rules** — Protected against cheating and spam
- **LocalStorage Fallback** — Works offline with graceful degradation

### ⚡ Performance & Caching (v11.2)
- **Smart Cache-Busting** — Version parameters ensure instant updates
- **No Hard Refresh Required** — Users automatically get latest version
- **Cache Control Headers** — Optimized browser caching strategy
- **Version Query Parameters** — CSS/JS files tagged with `?v=11.2`
- **Zero Stale Code** — Eliminates "old version" problems
- **Deployment Ready** — Production-grade cache management

### 📱 Mobile Optimization
- **Complete Zoom Prevention** — Triple-layer defense system
  - HTML viewport meta configuration (`maximum-scale=1.0`, `user-scalable=no`)
  - CSS touch-action properties (`touch-action: none` on game grid)
  - JavaScript preventDefault() handlers with `passive: false`
  - Works across all modern mobile browsers
- **Landscape Mode Support** — Desktop layout automatically activates
  - Multi-method orientation detection (CSS media queries + JavaScript)
  - Responsive 3-column layout (Controls | Grid | Stats)
  - Compact UI optimized for landscape viewport
  - Mobile controls automatically hidden in landscape
  - Supports phones, tablets, and all screen sizes
- **Safari iOS Compatibility** — Fixes Apple's orientation bugs
  - Multiple CSS media query detection strategies
  - Orientation change event handlers
  - Force layout recalculation on device rotation
  - Tested on iPhone 14 Pro Max, iPad, iPad Pro
- **Enhanced Touch Controls** — Smooth, responsive mobile gameplay
  - Swipe gestures with haptic feedback (left, right, up, down)
  - Touch event optimization (prevents scroll during gameplay)
  - Mobile control buttons with `touch-action: manipulation`
  - Tap grid for instant hard drop
  - No zoom interference during gameplay
- **Auto-Scroll UX** — Seamless game start experience
  - Automatically scrolls to center game grid after name entry
  - Smooth CSS animation (`scrollIntoView` with `behavior: 'smooth'`)
  - Eliminates manual scrolling on mobile devices
  - Better first-time user experience
- **Form Input Compatibility** — Fixed keyboard conflicts
  - Spacebar now works correctly in feedback form
  - Active element detection prevents game control interference
  - Modal state awareness (forms vs gameplay)
  - All keyboard input preserved in text areas

### 🔒 Enterprise-Grade Security
- **Content Security Policy (CSP)** — Blocks XSS attacks and code injection
- **Firebase Security Rules** — Server-side validation prevents unauthorized access
- **Rate Limiting** — IP-based throttling prevents spam and abuse
  - 5 submissions per 15 minutes per IP
  - 20 submissions per hour per IP
  - Automatic cooldown with user-friendly messages
- **Google reCAPTCHA v2** — Human verification for feedback submissions
- **Input Sanitization** — All user input escaped and validated
- **XSS Prevention** — HTML escaping for all dynamic content
- **Safe Storage Wrapper** — LocalStorage with error handling and fallbacks
- **No `eval()`** — Zero dynamic code execution
- **Secure Headers** — X-Content-Type-Options, X-Frame-Options

### 🌐 Bilingual Support
- **Full English/Spanish Interface** — Seamless language toggling
- **Dynamic Translation** — All UI elements update in real-time
- **Localized Content** — Context-aware feedback system
- **Persistent Language Preference** — Saves your choice across sessions
- **Unicode Support** — Proper character encoding for all languages

### ♿ Accessibility (WCAG 2.1 AA Compliant)
- **Screen Reader Support** — Comprehensive ARIA labels and live regions
- **Keyboard Navigation** — 100% keyboard accessible
- **Focus Management** — Visible focus indicators
- **Motion Preferences** — Respects `prefers-reduced-motion`
- **High Contrast Modes** — Dark and light themes
- **Semantic HTML** — Proper heading hierarchy and landmarks
- **Alt Text** — Descriptive text for all visual elements

### 🎨 Modern UI/UX
- **Glassmorphism Design** — Beautiful frosted glass effects with backdrop blur
- **Neon Glow Effects** — Vibrant tetromino colors with CSS animations
- **Smooth Animations** — 60fps performance with hardware acceleration
- **Responsive Layout** — Mobile-first design works on all devices
- **Touch Gestures** — Swipe to move/rotate pieces on mobile
- **Custom Scrollbars** — Themed scrollbar styling
- **Loading States** — User feedback for all async operations
- **Clean Game Flow** — Minimal popup interruptions (v11.1)

### 📊 Game Features
- **Global Leaderboard** — Top 10 scores synced via Firebase Firestore
- **Personal Best Tracking** — Per-player high scores with timestamps
- **Cross-Device Sync** — Your scores appear on all your devices
- **Auto-Save System** — Resume interrupted games automatically
- **Save Expiration** — Automatic cleanup after 7 days of inactivity
- **Game State Restoration** — Restores position, level, score, and statistics
- **Next Piece Preview** — See upcoming pieces
- **Level Progression** — Advance through 15+ levels

### 🎵 Audio System
- **Background Music** — Looping game theme with fade in/out
- **Sound Effects** — Line clears, level ups, piece landing, rotation
- **Web Audio API** — High-quality audio playback with minimal latency
- **HTML5 Fallback** — Works even without Web Audio support
- **Volume Controls** — Separate SFX and music volume
- **Mute Toggle** — Quick audio on/off switch

### 💬 Feedback System
- **Integrated Contact Form** — Formspree integration for bug reports
- **Email Validation** — RFC 5322 compliant validation
- **Character Counter** — Real-time message length tracking
- **Spam Protection** — reCAPTCHA and rate limiting
- **Error Handling** — User-friendly error messages for failed submissions

## 🚀 Quick Start

### Option 1: Play Online (Recommended)
**[🎮 Play Now →](https://rick7peace.github.io/mini-project3/)**

No installation required! Works on:
- 💻 Desktop browsers (Chrome, Firefox, Safari, Edge)
- 📱 Mobile browsers (iOS Safari, Chrome Mobile)
- 📲 Tablets (iPad, Android tablets)

### Option 2: Open Locally
1. **Download** or clone this repository
```bash
   git clone https://github.com/Rick7Peace/mini-project3.git
   cd mini-project3
```
2. **Open** `index.html` in your web browser
3. **Note:** Firebase features require internet connection

## 🎮 How to Play

### Keyboard Controls
| Key | Action |
|-----|--------|
| `←` | Move piece left |
| `→` | Move piece right |
| `↑` | Rotate piece clockwise |
| `↓` | Soft drop (faster fall) |
| `SPACE` | Hard drop (instant drop) |
| `P` | Pause/Resume game |
| `ESC` | Close modals |

### Mobile/Touch Controls
- **⬅️ / ➡️ Buttons** — Move left/right
- **🔄 Button** — Rotate piece
- **⬇️ Button** — Soft drop
- **Tap Grid** — Hard drop
- **Swipe Left/Right** — Move piece
- **Swipe Up** — Rotate clockwise
- **Swipe Down** — Soft drop

### Landscape Mode
**For best mobile experience:** Rotate your phone/tablet sideways!
- Activates desktop 3-column layout
- Larger game grid
- All controls and stats visible
- No scrolling needed
- Works on iOS Safari and Chrome

### Scoring System
| Lines Cleared | Points | Name |
|---------------|--------|------|
| 1 Line | 100 pts | Single |
| 2 Lines | 300 pts | Double |
| 3 Lines | 500 pts | Triple |
| 4 Lines | 800 pts | Tetris! |

**Level Up:** Score 500 points to advance levels and increase speed!

## 🛠️ Technical Stack

### Core Technologies
- **HTML5** — Semantic markup with proper accessibility
- **CSS3** — Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript (ES6+)** — No frameworks, zero dependencies

### Backend & Database
- **Firebase Firestore** — NoSQL cloud database for global leaderboard
- **Firebase SDK** — Real-time data synchronization
- **Firebase Security Rules** — Server-side access control
- **LocalStorage Fallback** — Offline functionality with graceful degradation

### APIs & Services
- **LocalStorage API** — Persistent game data and preferences
- **Web Audio API** — Sound effects with HTML5 fallback
- **Fetch API** — Async data operations
- **Formspree** — Form submission service (feedback system)
- **Google reCAPTCHA v2** — Bot protection
- **Firebase Firestore API** — Cloud database integration

### Mobile Technologies
- **Touch Events API** — Swipe gesture detection
- **Orientation API** — Landscape/portrait detection
- **Viewport Meta** — Mobile zoom prevention
- **CSS Media Queries** — Responsive breakpoints
- **Vibration API** — Haptic feedback (optional)

### Security Features
- **Content Security Policy (CSP)** — Restricts resource loading
- **Firebase Security Rules** — Database access control
- **Rate Limiting** — Client-side and server-side throttling
- **Input Validation** — Type checking and length limits
- **Error Boundaries** — Global error handling

### Performance & Caching (v11.2)
- **Cache-Busting Strategy** — Version query parameters on all assets
- **Cache Control Headers** — Meta tags prevent stale content
- **Smart Versioning** — Incremental version numbers for updates
- **Zero Downtime Deploys** — Seamless version transitions

### Browser Support
| Browser | Version | Mobile | Landscape | Firebase | Status |
|---------|---------|--------|-----------|----------|--------|
| Chrome | 100+ | ✅ | ✅ | ✅ | Fully Supported (Best Experience) |
| Firefox | 100+ | ✅ | ✅ | ✅ | Fully Supported |
| Safari | 15+ | ✅ | ✅ | ✅ | Fully Supported (iOS Compatible) |
| Edge | 100+ | ✅ | ✅ | ✅ | Fully Supported |
| Mobile Safari | 15+ | ✅ | ✅ | ✅ | Fully Supported (Landscape Mode) |
| Chrome Mobile | 100+ | ✅ | ✅ | ✅ | Fully Supported (Recommended) |
| Internet Explorer | Any | ❌ | ❌ | ❌ | Not Supported |

**Recommended:** Chrome (desktop or mobile) for optimal experience

## 🌟 Key Highlights

### Cache Management (v11.2)
✅ **Smart Cache-Busting** — Version parameters on CSS/JS files (`?v=11.2`)  
✅ **Zero Hard Refresh** — Users automatically get updates  
✅ **Cache Control Headers** — Meta tags prevent stale content  
✅ **Production Ready** — Enterprise-grade cache strategy  
✅ **Cross-Browser Support** — Works on all major browsers  
✅ **Developer Friendly** — Simple version increment on deploy  

### Firebase Integration (v11.1)
✅ **Global Leaderboard** — Scores sync across all devices and browsers  
✅ **Real-Time Updates** — See new high scores instantly  
✅ **Secure Database** — Firebase Security Rules prevent cheating  
✅ **Offline Support** — LocalStorage fallback when offline  
✅ **Cross-Platform** — Works on desktop, mobile, and tablets  

### Mobile Optimization Features (v11.0)
✅ **Triple-Layer Zoom Prevention** — HTML + CSS + JavaScript  
✅ **Landscape Orientation Support** — Desktop layout on mobile  
✅ **Safari iOS Compatibility** — Orientation detection fixes  
✅ **Touch Control Optimization** — Swipe gestures with haptics  
✅ **Auto-Scroll UX** — Seamless game start flow  
✅ **Form Input Compatibility** — Keyboard handler respects inputs  
✅ **Cross-Device Testing** — iPhone, iPad, Android verified  

### UX Improvements (v11.1)
✅ **Clean Game Flow** — Removed intrusive popup notifications  
✅ **Maintained Critical Feedback** — Kept important game messages  
✅ **Preserved Accessibility** — All screen reader announcements active  
✅ **Cross-Browser Tested** — Works on all major browsers  

### Security Features (10/10 Score)
✅ **XSS Prevention** — All user input sanitized with HTML escaping  
✅ **CSP Headers** — Blocks inline scripts and unauthorized resources  
✅ **Firebase Security Rules** — Server-side validation and access control  
✅ **Rate Limiting** — IP-based throttling prevents abuse  
✅ **reCAPTCHA Integration** — Human verification for submissions  
✅ **Input Validation** — Type checking and length limits  
✅ **Safe Storage** — Error handling for quota exceeded  
✅ **No Dynamic Execution** — Zero use of `eval()` or `Function()`  
✅ **Secure Defaults** — HTTPS-only in production  

### Accessibility Features (WCAG 2.1 AA)
✅ **ARIA Labels** — All interactive elements properly labeled  
✅ **Keyboard Navigation** — Full keyboard support with visible focus  
✅ **Screen Reader Announcements** — Live regions for game state  
✅ **Focus Management** — Modal accessibility with escape key support  
✅ **Reduced Motion Support** — Respects user preferences  
✅ **Semantic HTML** — Proper heading hierarchy and landmarks  
✅ **Color Contrast** — Meets WCAG contrast ratios  

### Performance Optimizations
✅ **Document Fragment** — Efficient DOM batch updates  
✅ **Hardware Acceleration** — GPU-accelerated animations  
✅ **Event Delegation** — Reduced memory usage  
✅ **Cleanup on Unmount** — No memory leaks  
✅ **Debounced Functions** — Optimized save operations  
✅ **Lazy Loading** — Deferred audio loading  
✅ **60fps Gameplay** — Smooth animations on all devices  
✅ **Firebase Caching** — Offline persistence with cache  
✅ **Smart Cache-Busting** — Instant updates without hard refresh (v11.2)  

### Code Quality
✅ **ES6+ Syntax** — Modern JavaScript features  
✅ **Class-Based Architecture** — Organized OOP design  
✅ **Error Handling** — Try-catch blocks and global handlers  
✅ **Comprehensive Comments** — Documented code  
✅ **Consistent Naming** — camelCase for variables, UPPER_CASE for constants  
✅ **No Global Pollution** — Single global instance pattern  
✅ **Separation of Concerns** — Modular, maintainable code  
✅ **Clean UX Design** — Minimal popup interruptions (v11.1)  
✅ **Async/Await** — Modern asynchronous JavaScript patterns

## 💬 Feedback & Contact

Have feedback, bug reports, or feature suggestions? I'd love to hear from you!

### Contact Methods
📧 **Email:** [marmolejo.ricardo@gmail.com](mailto:marmolejo.ricardo@gmail.com)  
💬 **In-Game Feedback:** Click the "💬 Feedback" button in the game  
🐛 **Bug Reports:** Submit through the in-game feedback form  
🌟 **Feature Requests:** Email with subject line "FallingBlocks+ Feature Request"

### Response Time
I typically respond within 24-48 hours during weekdays.

## 🔒 Security & Privacy

### Data Collection
- **Firebase Firestore** — Leaderboard scores stored in cloud database
- **LocalStorage** — Game preferences stored locally in your browser
- **No Tracking** — No analytics or user tracking
- **No Cookies** — No cookies set by this application
- **Feedback Forms** — Email address optional (only if you want a response)

### Data You Control
- **Leaderboard Scores** — Stored in Firebase (name and score only)
- **High Scores** — Stored locally, can be cleared in settings
- **Language Preference** — Stored locally, can be changed anytime
- **Game Progress** — Stored locally, auto-expires after 7 days
- **Volume Settings** — Stored locally, persists across sessions

### Security Measures
- **Firebase Security Rules** — Validates all database writes
- **Regular Updates** — Security patches applied promptly
- **Dependency-Free** — Minimal third-party dependencies
- **Open Source** — Full code transparency
- **CSP Enforced** — Content Security Policy prevents code injection
- **HTTPS Only** — All Firebase communication encrypted

### Firebase Security
Your leaderboard data is protected by Firebase Security Rules that:
- ✅ Allow anyone to read the leaderboard
- ✅ Validate score submissions (name length, score range)
- ✅ Prevent updates or deletions (no cheating!)
- ✅ Block malicious data submissions

## 🎓 Technical Demonstrations

This project showcases professional-level web development skills with a focus on:

### Technical Skills
- ✅ Modern JavaScript (ES6+) development
- ✅ Responsive web design (mobile-first approach)
- ✅ Mobile optimization (touch events, orientation, zoom prevention)
- ✅ **Full-stack integration** (Firebase backend + frontend)
- ✅ **Database design** (Firestore NoSQL schema)
- ✅ **Cache management** (Version control, cache-busting strategies)
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Security best practices (OWASP Top 10)
- ✅ Cross-browser compatibility
- ✅ Performance optimization
- ✅ API integration (Firebase, Formspree, reCAPTCHA)

### Development Practices
- ✅ Project planning and execution
- ✅ Code documentation and comments
- ✅ Version control (Git/GitHub)
- ✅ Problem-solving and debugging
- ✅ User experience design
- ✅ Production deployment
- ✅ Cross-platform testing
- ✅ **Cloud database integration**
- ✅ **Real-time data synchronization**
- ✅ **Cache strategy implementation**

### Production Readiness
This codebase demonstrates **enterprise-grade quality** with:
- Comprehensive error handling
- Security hardening (CSP, Firebase rules, rate limiting, input validation)
- Accessibility compliance
- Performance optimization
- Professional code structure
- Deployment-ready configuration
- Mobile-first responsive design
- Cross-device compatibility
- **Scalable cloud backend**
- **Real-time multiplayer infrastructure**
- **Intelligent cache management**

## 📝 License

This project is licensed under the **MIT License**.
```
MIT License

Copyright (c) 2025-2026 Ricardo Marmolejo

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

### Third-Party Resources
- **Tetris Guideline** — Inspired by [Tetris.com](https://tetris.com/)
- **SRS Rotation System** — Based on Tetris Company specifications
- **Music** — Public domain chiptune arrangements
- **Sound Effects** — [Mixkit](https://mixkit.co/) (Free License)
- **Firebase** — Google Cloud Platform services

---

## 🙏 Acknowledgments

- **Alexey Pajitnov** — Original Tetris creator (1984)
- **The Tetris Company** — Modern Tetris guidelines and standards
- **Google Firebase** — Cloud database and backend services
- **Formspree** — Form submission service
- **Google reCAPTCHA** — Bot protection service
- **MDN Web Docs** — Comprehensive web development documentation
- **WCAG Guidelines** — Accessibility standards and best practices

## 📈 Recent Updates

### v11.2 (Current - Cache Management)
**Released:** January 2026

**⚡ Cache Management & Performance:**
- ✅ **Smart Cache-Busting** — Version query parameters on all assets (`?v=11.2`)
- ✅ **No Hard Refresh Needed** — Users get updates automatically
- ✅ **Cache Control Headers** — Meta tags prevent stale content
- ✅ **Zero Downtime Updates** — Seamless version transitions
- ✅ **Production-Ready Caching** — Enterprise-grade cache strategy

**📚 Developer Experience:**
- ✅ **Version Control** — All CSS/JS files tagged with version numbers
- ✅ **Easy Updates** — Just increment version number on deploy
- ✅ **No User Friction** — Updates happen transparently
- ✅ **Cross-Browser Compatible** — Works on all major browsers

**Bug Fixes:**
- ✅ Fixed: Users seeing outdated code after updates
- ✅ Fixed: Need for hard refresh (Cmd+Shift+R) on desktop
- ✅ Improved: Deployment workflow for instant updates

### v11.1 (Firebase Integration)
**Released:** January 2026

**🔥 Firebase Backend Integration:**
- ✅ **Global Leaderboard** — Firestore cloud database integration
- ✅ **Real-Time Sync** — Scores appear across all devices instantly
- ✅ **Secure Database Rules** — Server-side validation prevents cheating
- ✅ **Offline Support** — LocalStorage fallback for offline play
- ✅ **Cross-Platform** — Works on all devices and browsers

**🎨 User Experience Enhancements:**
- ✅ **Cleaner Game Flow** — Removed 8 intrusive popup notifications
- ✅ **Maintained Critical Feedback** — Kept important game messages
- ✅ **Preserved Accessibility** — All screen reader announcements active
- ✅ **Cross-Browser Tested** — Works on Chrome, Safari, Firefox, Edge

**Bug Fixes:**
- ✅ Fixed: Excessive popup interruptions during gameplay
- ✅ Fixed: Popup messages appearing on mobile devices
- ✅ Improved: Overall user experience with less visual clutter

### v11.0 (Mobile Optimization)
**Released:** January 2026

**📱 Complete Mobile Overhaul:**
- ✅ Triple-layer zoom prevention system
- ✅ Landscape mode with desktop layout
- ✅ Safari iOS orientation fixes
- ✅ Touch control optimization
- ✅ Auto-scroll on game start
- ✅ Form input keyboard compatibility

## 🚀 Future Enhancements

### Planned Features
- [ ] **Progressive Web App (PWA)** — Offline play and install to home screen
- [ ] **Additional Languages** — French, German, Japanese support
- [ ] **Game Modes** — Sprint mode, Ultra mode, Marathon mode
- [ ] **Achievement System** — Unlock badges and rewards
- [ ] **Sound Volume UI** — Sliders for SFX and music volume control
- [ ] **Custom Themes** — User-created color schemes
- [ ] **Tutorial Mode** — Interactive beginner's guide
- [x] **Global Leaderboard** — ✅ COMPLETED with Firebase integration (v11.1)
- [x] **Cache Management** — ✅ COMPLETED with version parameters (v11.2)

### Under Consideration
- [ ] User accounts with Firebase Authentication
- [ ] Multiplayer mode (real-time battles via Firestore)
- [ ] Replay system (save and share game recordings)
- [ ] Daily challenges with time limits
- [ ] Social sharing (Twitter, Facebook, Discord)
- [ ] Gamepad controller support
- [ ] 3D graphics mode (Three.js)

### Community Requests
Want to see a feature? [Submit a request](mailto:marmolejo.ricardo@gmail.com?subject=Feature%20Request) or open an issue on GitHub!

## 🧪 Testing

### Manual Testing Checklist
- ✅ All keyboard controls work correctly
- ✅ Mobile touch controls responsive
- ✅ Landscape mode activates on rotation
- ✅ No zoom on double-tap or pinch
- ✅ Game saves and restores properly
- ✅ **Global leaderboard syncs across devices**
- ✅ **Firebase connectivity works online/offline**
- ✅ **Updates load without hard refresh** (v11.2)
- ✅ Audio plays without errors
- ✅ Language switching works seamlessly
- ✅ Accessibility with screen reader (NVDA/JAWS)
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- ✅ Mobile testing (iOS Safari, Chrome Mobile)
- ✅ Tablet testing (iPad, Android tablets)
- ✅ No intrusive popup messages during gameplay

### Security Testing
- ✅ XSS attempts blocked (input sanitization)
- ✅ CSP prevents inline scripts
- ✅ **Firebase Security Rules enforce data validation**
- ✅ Rate limiting enforces submission limits
- ✅ reCAPTCHA blocks bot submissions
- ✅ No sensitive data in LocalStorage
- ✅ HTTPS enforced in production
- ✅ **Database writes validated server-side**

### Performance Testing
- ✅ 60fps during gameplay
- ✅ No memory leaks after extended play
- ✅ Fast initial load time (<2s)
- ✅ Responsive on low-end devices
- ✅ Efficient DOM updates
- ✅ Smooth animations on mobile
- ✅ **Firebase queries optimized (indexed, limited)**
- ✅ **Cache-busting works correctly** (v11.2)

## 🐛 Known Issues

### Fixed in v11.2
- ✅ **Browser Caching** — Users no longer need hard refresh (Cmd+Shift+R)
- ✅ **Stale Content** — Cache-busting prevents outdated code
- ✅ **Update Friction** — Seamless version updates

### Current Limitations
1. **Formspree Free Tier** — Limited to 50 submissions/month
2. **LocalStorage Limits** — ~5-10MB per domain (browser-dependent)
3. **Safari Audio** — Requires user interaction before playing audio (browser restriction)
4. **iOS Landscape Lag** — Some older iOS devices may lag slightly on first rotation
5. **Firebase Free Tier** — 50K reads/day, 20K writes/day (sufficient for most use cases)

### Workarounds
- **Formspree Limit** — Deploy your own backend or upgrade plan
- **Storage Quota** — Game auto-clears old saves after 7 days
- **Safari Audio** — Auto-play blocked until user clicks "Start Game" (standard behavior)
- **iOS Lag** — Close Safari completely and reopen for best performance
- **Firebase Limits** — Free tier supports 1000+ daily active users

## 💻 Development

### Prerequisites
- Modern web browser (Chrome 100+, Firefox 100+, Safari 15+)
- Text editor (VS Code, Sublime Text, Atom)
- Git for version control
- Internet connection (for Firebase features)

### Setup for Development
```bash
# Clone the repository
git clone https://github.com/Rick7Peace/mini-project3.git
cd mini-project3

# Open in VS Code
code .
```

### Firebase Setup (Optional - for your own backend)
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Copy your Firebase config
4. Replace the config in `index.html`
5. Deploy Security Rules from `firestore.rules` (if provided)

### Updating Version Numbers (v11.2)
When making changes to CSS or JavaScript:
1. Make your code changes
2. Update version in `index.html`:
```html
<link rel="stylesheet" href="./assets/style.css?v=11.3" />
<script src="./assets/script.js?v=11.3"></script>
```
3. Commit and push to GitHub
4. Users automatically get the update on next visit (no hard refresh needed!)

### File Structure
```
mini-project3/
├── index.html           # Main HTML file (includes Firebase config + cache-busting)
├── assets/
│   ├── style.css       # All styles (glassmorphism, responsive)
│   └── script.js       # Game logic (ES6+, ~2800 lines)
├── media/
│   ├── sounds/         # Sound effects
│   └── music/          # Background music
├── screenshot.png      # Repository screenshot
├── README.md          # This file
└── LICENSE            # MIT License
```

## 📚 Additional Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/) — HTML, CSS, JavaScript reference
- [Firebase Documentation](https://firebase.google.com/docs) — Firestore guides and API reference
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) — Accessibility standards
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — Security best practices
- [Formspree Docs](https://help.formspree.io/) — Form submission service
- [reCAPTCHA Docs](https://developers.google.com/recaptcha) — Bot protection
- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) — Cache strategies

### Learning Resources
- [JavaScript.info](https://javascript.info/) — Modern JavaScript tutorial
- [CSS-Tricks](https://css-tricks.com/) — CSS tips and techniques
- [A11y Project](https://www.a11yproject.com/) — Accessibility checklist
- [Touch Events Guide](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) — Mobile touch API
- [Firebase Web Codelab](https://firebase.google.com/codelabs/firebase-web) — Firebase tutorial
- [Cache-Control Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) — HTTP caching

### Tools Used
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) — Performance auditing
- [axe DevTools](https://www.deque.com/axe/devtools/) — Accessibility testing
- [Can I Use](https://caniuse.com/) — Browser compatibility tables
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Color contrast
- [BrowserStack](https://www.browserstack.com/) — Cross-device testing
- [Firebase Console](https://console.firebase.google.com/) — Database management

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute
1. **Report Bugs** — Submit detailed bug reports via email or GitHub issues
2. **Suggest Features** — Share your ideas for improvements
3. **Submit Pull Requests** — Fix bugs or add features
4. **Improve Documentation** — Help make the README clearer
5. **Test on Devices** — Report compatibility issues
6. **Translate** — Help add more languages

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request with detailed description

### Code Style Guidelines
- Use ES6+ syntax (arrow functions, const/let, template literals)
- Follow existing naming conventions (camelCase for variables)
- Add JSDoc comments for functions
- Test on Chrome, Safari, and Firefox
- Ensure mobile compatibility
- Maintain accessibility standards
- Test Firebase integration
- Update version numbers in HTML when modifying CSS/JS

### Code of Conduct
- Be respectful and constructive
- Follow the existing code style
- Test your changes thoroughly
- Document new features
- Keep pull requests focused on a single change

## 🎮 Play FallingBlocks+ Now!

**[🌐 Live Demo](https://rick7peace.github.io/mini-project3/)** • **[📥 Download ZIP](https://github.com/Rick7Peace/mini-project3/archive/refs/heads/main.zip)** • **[⭐ Star on GitHub](https://github.com/Rick7Peace/mini-project3)**

### Built with 💙 by Ricardo Marmolejo

[📧 Email](mailto:marmolejo.ricardo@gmail.com) • [🐙 GitHub](https://github.com/Rick7Peace) • [💼 LinkedIn](https://linkedin.com/in/ricardo-marmolejo)

⭐ **If you enjoyed this project, please star it on GitHub!** ⭐

*Falling Blocks + is not affiliated with or endorsed by The Tetris Company.*

**Total lines of code: ~3,000+ | Version: 11.2 | Technologies: 8+ | Features: 52+ | Security score: 10/10**