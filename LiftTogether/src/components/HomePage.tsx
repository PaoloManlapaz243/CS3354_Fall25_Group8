import { useAuth } from '../contexts/AuthContext';
import { useWorkout } from '../contexts/WorkoutContext';
import { useFriends } from '../contexts/FriendsContext';
import Navigation from './Navigation';
import { Heart, MessageCircle, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'newPost' | 'friends' | 'prTracker') => void;
  onLogout: () => void;
}

export default function HomePage({ onNavigate, onLogout }: HomePageProps) {
  const { user } = useAuth();
  const { posts, toggleLike, getLikedPosts } = useWorkout();
  const { friends, friendRequests } = useFriends();

  const likedPosts = user ? getLikedPosts(user.id) : new Set<string>();

  // Filter posts so that only posts from the current user or current friends are shown.
  // This ensures that if a friend is removed from the friends list, their posts no longer appear.
  const visiblePosts = user
    ? posts.filter(
        (p) => p.id === user.id || friends.some((f) => f.id === p.id)
      )
    : [];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
      <Navigation 
        currentPage="home" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        username={user.username}
      />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl text-white mb-6">Your Feed</h2>
            
            {visiblePosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-[#404040] hover:border-[#4caeff]/50 transition-all"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full flex items-center justify-center">
                      <span className="text-white">{post.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="text-white">{post.username}</h3>
                      <p className="text-gray-400 text-sm">{formatDate(post.timestamp)}</p>
                    </div>
                  </div>
                  {post.isNewPR && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <TrendingUp size={14} />
                      New PR!
                    </div>
                  )}
                </div>

                {/* Workout Details */}
                <div className="bg-[#1f1f1f] rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-[#4caeff]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💪</span>
                    </div>
                    <div>
                      <h4 className="text-white">{post.exercise}</h4>
                      <p className="text-gray-400 text-sm">
                        {post.weight > 0 ? `${post.weight} lbs` : 'Bodyweight'} • {post.sets} sets × {post.reps} reps
                      </p>
                    </div>
                  </div>
                  {post.caption && (
                    <p className="text-gray-300 text-sm">{post.caption}</p>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-6 text-gray-400">
                  <button
                    onClick={() => toggleLike(post.id, user.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      likedPosts.has(post.id) 
                        ? 'text-blue-500' 
                        : 'hover:text-blue-500'
                    }`}
                  >
                    <Heart 
                      size={20} 
                      fill={likedPosts.has(post.id) ? 'currentColor' : 'none'}
                    />
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Friend Requests */}
            {friendRequests.length > 0 && (
              <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-[#404040]">
                <h3 className="text-white mb-4 flex items-center justify-between">
                  Friend Requests
                  <span className="bg-[#4caeff] text-white text-xs px-2 py-1 rounded-full">
                    {friendRequests.length}
                  </span>
                </h3>
                <button
                  onClick={() => onNavigate('friends')}
                  className="w-full py-2 bg-[#4caeff] text-white rounded-lg hover:bg-[#3a9eef] transition-colors"
                >
                  View All Requests
                </button>
              </div>
            )}

            {/* Friends List */}
            <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-[#404040]">
              <h3 className="text-white mb-4">Friends ({friends.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {friends.slice(0, 6).map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">{friend.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{friend.username}</p>
                      <p className="text-gray-400 text-xs">{friend.mutualFriends} mutual friends</p>
                    </div>
                  </div>
                ))}
              </div>
              {friends.length > 6 && (
                <button
                  onClick={() => onNavigate('friends')}
                  className="w-full mt-4 py-2 text-[#4caeff] hover:text-[#3a9eef] transition-colors text-sm"
                >
                  See All Friends
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-xl p-6 shadow-lg">
              <h3 className="text-white mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-white">
                  <span>Posts</span>
                  <span className="text-xl">{posts.filter(p => p.userId === user.id).length}</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>Friends</span>
                  <span className="text-xl">{friends.length}</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>PRs Set</span>
                  <span className="text-xl">{posts.filter(p => p.userId === user.id && p.isNewPR).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
