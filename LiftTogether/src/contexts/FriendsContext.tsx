import { createContext, useContext, useState, ReactNode } from 'react';

export interface FriendRequest {
  id: string;
  username: string;
  timestamp: Date;
}

export interface Friend {
  id: string;
  username: string;
}

interface FriendsContextType {
  friends: Friend[];
  friendRequests: FriendRequest[];
  sentRequests: string[];
  loadUserFriendsData: (userId: string) => void;
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  sendFriendRequest: (userId: string) => void;
  removeFriend: (friendId: string) => void;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);


var mockDatabase = {
  "PreviousUser@gmail.com": {
    friends: [
      { id: '1', username: 'MarwanH'},
      { id: '2', username: 'MaxL'},
      { id: '3', username: 'PaoloM'},
      { id: '4', username: 'OsmanA'},
    ],
    friendRequests: [
      { id: '5', username: 'NicholasA', timestamp: new Date('2025-11-17T08:00:00') },
      { id: '6', username: 'ManhaK', timestamp: new Date('2025-11-16T14:30:00') },
      { id: '7', username: 'MichaelM', timestamp: new Date('2025-11-15T10:00:00') },
    ],
  },
};

// Mock initial data
const initialFriends: Friend[] = [];

const initialRequests: FriendRequest[] = [];

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

  const loadUserFriendsData = (userName: string) => { 
    console.log(userName);
    const userData = mockDatabase[userName];

    console.log(mockDatabase);
    console.log(mockDatabase[userName]);

    if (userData) {
      setFriends(userData.friends);
      setFriendRequests(userData.friendRequests);
    } else {
      // user has no entry in our mock database
      setFriends([]);
      setFriendRequests([]);
      setSentRequests([]);
    }
  }

  return (
    <FriendsContext.Provider value={{
      friends,
      friendRequests,
      sentRequests,
      loadUserFriendsData,
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
