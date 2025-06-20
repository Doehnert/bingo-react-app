import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext'
import LoginPage from './pages/Login/LoginPage'
import GamePage from './pages/Game/GamePage'
import './App.css'
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';

function AppContent() {
  const { isLoggedIn } = useUser()

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <GamePage /> : <LoginPage />} />
        <Route path="/board" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App
