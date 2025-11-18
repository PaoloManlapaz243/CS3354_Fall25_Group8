import { createContext, useContext, useState, ReactNode } from 'react';

export interface FriendRequest {
  id: string;
  username: string;
  mutualFriends: number;
  timestamp: Date;
}

export interface Friend {
  id: string;
  username: string;
  mutualFriends: number;
}

interface FriendsContextType {
  friends: Friend[];
  friendRequests: FriendRequest[];
  sentRequests: string[];
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  sendFriendRequest: (userId: string) => void;
  removeFriend: (friendId: string) => void;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

// Mock initial data
const initialFriends: Friend[] = [
  { id: '1', username: 'JohnDoe123', mutualFriends: 5 },
  { id: '2', username: 'FitnessFan22', mutualFriends: 3 },
  { id: '3', username: 'GymRat99', mutualFriends: 7 },
  { id: '4', username: 'LiftQueen', mutualFriends: 2 },
];

const initialRequests: FriendRequest[] = [
  { id: '5', username: 'NewLifter42', mutualFriends: 1, timestamp: new Date('2025-11-17T08:00:00') },
  { id: '6', username: 'SquatMaster', mutualFriends: 4, timestamp: new Date('2025-11-16T14:30:00') },
  { id: '7', username: 'BenchPress200', mutualFriends: 2, timestamp: new Date('2025-11-15T10:00:00') },
];

export function FriendsProvider({ children }: { children: ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(initialRequests);
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  const acceptRequest = (requestId: string) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      setFriends([...friends, {
        id: request.id,
        username: request.username,
        mutualFriends: request.mutualFriends
      }]);
      setFriendRequests(friendRequests.filter(r => r.id !== requestId));
    }
  };

  const declineRequest = (requestId: string) => {
    setFriendRequests(friendRequests.filter(r => r.id !== requestId));
  };

  const sendFriendRequest = (userId: string) => {
    if (!sentRequests.includes(userId)) {
      setSentRequests([...sentRequests, userId]);
    }
  };

  const removeFriend = (friendId: string) => {
    setFriends(friends.filter(f => f.id !== friendId));
  };

  return (
    <FriendsContext.Provider value={{
      friends,
      friendRequests,
      sentRequests,
      acceptRequest,
      declineRequest,
      sendFriendRequest,
      removeFriend
    }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriends() {
  const context = useContext(FriendsContext);
  if (context === undefined) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
}
