import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import NewPostPage from './components/NewPostPage';
import FriendsPage from './components/FriendsPage';
import PRTrackerPage from './components/PRTrackerPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WorkoutProvider } from './contexts/WorkoutContext';
import { FriendsProvider } from './contexts/FriendsContext';

type Page = 'landing' | 'login' | 'register' | 'home' | 'newPost' | 'friends' | 'prTracker';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const { user, logout } = useAuth();

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  // If user is logged in and tries to go to landing, redirect to home
  if (user && currentPage === 'landing') {
    setCurrentPage('home');
  }

  // Render the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigation} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigation} />;
      case 'home':
        return <HomePage onNavigate={handleNavigation} onLogout={handleLogout} />;
      case 'newPost':
        return <NewPostPage onNavigate={handleNavigation} onLogout={handleLogout} />;
      case 'friends':
        return <FriendsPage onNavigate={handleNavigation} onLogout={handleLogout} />;
      case 'prTracker':
        return <PRTrackerPage onNavigate={handleNavigation} onLogout={handleLogout} />;
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return <>{renderPage()}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <FriendsProvider>
          <AppContent />
        </FriendsProvider>
      </WorkoutProvider>
    </AuthProvider>
  );
}
