import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFriends } from '../contexts/FriendsContext';
import Navigation from './Navigation';
import { Search, UserPlus, Check, X, Users as UsersIcon } from 'lucide-react';

interface FriendsPageProps {
  onNavigate: (page: 'home' | 'prTracker' | 'newPost') => void;
  onLogout: () => void;
}

// Mock suggested users
const suggestedUsers = [
  { id: 'u1', username: 'PowerLifter88', isOnline: true },
  { id: 'u2', username: 'CardioKing', isOnline: false },
  { id: 'u3', username: 'YogaMaster21', isOnline: true },
  { id: 'u4', username: 'CrossFitPro', isOnline: false },
  { id: 'u5', username: 'RunnerGirl99', isOnline: true },
];

export default function FriendsPage({ onNavigate, onLogout }: FriendsPageProps) {
  const { user } = useAuth();
  const { friends, friendRequests, acceptRequest, declineRequest, sendFriendRequest, sentRequests, removeFriend} = useFriends();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends');

  if (!user) return null;

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRequestTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
      <Navigation 
        currentPage="friends" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        username={user.username}
      />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <div className="bg-[#2a2a2a] rounded-xl shadow-lg border border-[#404040]">
          {/* Header */}
          <div className="p-6 border-b border-[#404040]">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-2xl text-white">Friends</h2>
                <p className="text-gray-400">Connect with your workout partners</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search friends..."
                className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setActiveTab('friends')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'friends'
                    ? 'bg-[#4caeff] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Friends ({friends.length})
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-2 rounded-lg transition-colors relative ${
                  activeTab === 'requests'
                    ? 'bg-[#4caeff] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Requests ({friendRequests.length})
                {friendRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {friendRequests.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'suggestions'
                    ? 'bg-[#4caeff] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Suggestions
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Friends Tab */}
            {activeTab === 'friends' && (
              <div className="space-y-4">
                {filteredFriends.length === 0 ? (
                  <div className="text-center py-12">
                    <UsersIcon className="mx-auto text-gray-600 mb-4" size={48} />
                    <p className="text-gray-400">
                      {searchQuery ? 'No friends found' : 'No friends yet. Add some friends to get started!'}
                    </p>
                  </div>
                ) : (
                  filteredFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-4 bg-[#1f1f1f] rounded-lg border border-[#404040] hover:border-[#4caeff]/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full flex items-center justify-center">
                          <span className="text-white">{friend.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <h3 className="text-white">{friend.username}</h3>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFriend(friend.id)}
                        className="px-4 py-2 customRemoveButton text-white rounded-lg hover:customRemoveButton transition-colors flex items-center gap-2">
                        <X size={16} />
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-4">
                {friendRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <UserPlus className="mx-auto text-gray-600 mb-4" size={48} />
                    <p className="text-gray-400">No pending friend requests</p>
                  </div>
                ) : (
                  friendRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-[#1f1f1f] rounded-lg border border-[#404040]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full flex items-center justify-center">
                          <span className="text-white">{request.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <h3 className="text-white">{request.username}</h3>
                          <p className="text-gray-400 text-sm">
                            {formatRequestTime(request.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => acceptRequest(request.id)}
                          className="px-4 py-2 bg-[#4caeff] text-white rounded-lg hover:bg-[#3a9eef] transition-colors flex items-center gap-2"
                        >
                          <Check size={16} />
                          Accept
                        </button>
                        <button
                          onClick={() => declineRequest(request.id)}
                          className="px-4 py-2 bg-[#1f1f1f] border border-[#404040] text-gray-400 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-2"
                        >
                          <X size={16} />
                          Decline
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Suggestions Tab */}
            {activeTab === 'suggestions' && (
              <div className="space-y-4">
                {suggestedUsers.map((suggestedUser) => (
                  <div key={suggestedUser.id} className="flex items-center justify-between p-4 bg-[#1f1f1f] rounded-lg border border-[#404040] hover:border-[#4caeff]/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full flex items-center justify-center">
                          <span className="text-white">{suggestedUser.username.charAt(0).toUpperCase()}</span>
                        </div>
                        {suggestedUser.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1f1f1f]"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white">{suggestedUser.username}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => sendFriendRequest(suggestedUser.id)}
                      disabled={sentRequests.includes(suggestedUser.id)}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        sentRequests.includes(suggestedUser.id)
                          ? 'bg-[#1f1f1f] border border-[#404040] text-gray-400 cursor-not-allowed'
                          : 'bg-[#4caeff] text-white hover:bg-[#3a9eef]'
                      }`}
                    >
                      <UserPlus size={16} />
                      {sentRequests.includes(suggestedUser.id) ? 'Requested' : 'Add Friend'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
