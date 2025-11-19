import normalLogo from "../assets/LiftTogether.png";
import { Home, Users, TrendingUp, PlusCircle, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'friends' | 'prTracker' | 'newPost') => void;
  onLogout: () => void;
  username: string;
}

export default function Navigation({ currentPage, onNavigate, onLogout, username }: NavigationProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#4caeff] to-[#179AFF] h-16 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={normalLogo} width="50px" className="center-image"/>
          <h1 className="text-white text-2xl text-navigation-bold">LiftTogether</h1>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentPage === 'home' 
                ? 'bg-white/30 text-white' 
                : 'text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Home size={20} />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={() => onNavigate('friends')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentPage === 'friends' 
                ? 'bg-white/30 text-white' 
                : 'text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Users size={20} />
            <span className="hidden sm:inline">Friends</span>
          </button>

          <button
            onClick={() => onNavigate('prTracker')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentPage === 'prTracker' 
                ? 'bg-white/30 text-white' 
                : 'text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            <TrendingUp size={20} />
            <span className="hidden sm:inline">PR Tracker</span>
          </button>

          <button
            onClick={() => onNavigate('newPost')}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#4caeff] rounded-lg hover:bg-white/90 transition-all"
          >
            <PlusCircle size={20} />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#4caeff]">{username.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-white hidden md:inline">{username}</span>
          </div>
          <button
            onClick={onLogout}
            className="text-white/80 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
