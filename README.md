# Bingo Game - Frontend Implementation

A React-based Bingo game application built with Chakra UI for the local community hall. Players can generate bingo cards, mark numbers as they're called, and share their progress with others.

## 🎯 Implemented Features

### ✅ Bingo Card (Core Requirements)
- **Name Entry**: Users enter their name to start playing
- **5x5 Grid**: Properly structured bingo board with BINGO column headers
- **FREE Center Tile**: Center tile is always labeled "FREE" and pre-marked
- **Random Number Generation**: Numbers(unique) 1-100 on all tiles
- **Tile Marking**: Click tiles to mark/unmark them with visual feedback
- **New Card Generation**: Button to generate new cards with confirmation dialog if tiles are marked
- **Visual Feedback**: Marked tiles show green background with checkmark indicator

### ✅ Sharing Functionality
- **URL Sharing**: "Share Board URL" button copies a unique URL to clipboard
- **URL Loading**: Visiting shared URLs loads the exact board layout and marking state
- **URL Structure**: `/board?numbers=[encoded-board-data]`

### ✅ Storage & Persistence
- **localStorage Integration**: Board state persists across browser refreshes and closures
- **User Session**: User name and authentication token saved locally
- **Complete State Preservation**: Board numbers, marked cells, and game progress all saved
- **Automatic Recovery**: App restores previous state on page reload

### ✅ Backend Integration
- **Authentication**: JWT token-based authentication system
- **API Endpoints**: Integrated with backend for:
  - User registration/login
  - Number validation
  - Score submission
  - Leaderboard data
- **Error Handling**: Proper error handling for API calls
- **Loading States**: Visual feedback during API operations

### ✅ Additional Features
- **Responsive Design**: Mobile-friendly with hamburger menu
- **Leaderboard Page**: Displays game winners and scores
- **Score Calculation**: Implements `score = abs(100 - callCount)` formula
- **Win Detection**: Automatic detection of completed rows, columns, and diagonals
- **Toast Notifications**: User feedback for actions and errors
- **Modern UI**: Clean, accessible interface using Chakra UI

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API server running (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bingo-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎮 How to Play

1. **Enter your name** on the login page
2. **Generate a bingo card** or load from URL/localStorage
3. **Wait for numbers to be called** by the presenter
4. **Click tiles** to mark numbers as they're called
5. **Get 5 in a row** (horizontally, vertically, or diagonally) to win
6. **Share your progress** using the "Share Board URL" button

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19**: Modern React with hooks and functional components
- **Chakra UI 2.8**: Component library for consistent design
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Vite**: Fast build tool and dev server

### Key Components
- `BingoBoard`: Main game board with 5x5 grid
- `Header`: Navigation with responsive hamburger menu
- `LoginPage`: User authentication
- `GamePage`: Main game interface
- `LeaderboardPage`: Score display
- `UserContext`: Global state management

### State Management
- **React Context**: User authentication and global state
- **localStorage**: Persistent game state
- **URL Parameters**: Shareable game state

### API Integration
- **Authentication**: JWT token-based
- **RESTful Endpoints**: Standard HTTP methods
- **Error Handling**: Graceful fallbacks and user feedback

## 📱 Responsive Design

- **Desktop**: Full menu with horizontal navigation
- **Mobile**: Hamburger menu with slide-out drawer
- **Touch-friendly**: Optimized for mobile interaction
- **Accessible**: Proper ARIA labels and keyboard navigation

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── pages/              # Page components
├── assets/             # Static assets
└── main.jsx           # Application entry point
```