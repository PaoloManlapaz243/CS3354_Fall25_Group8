import { Friend, FriendRequest } from "../contexts/FriendsContext";

describe("FriendsProvider CRUD operations", () => {
  test("loadUserFriendsData loads user friends and requests", () => {
    const mockUser = "PreviousUser@gmail.com";
    let friends: Friend[] = [];
    let friendRequests: FriendRequest[] = [];
    let sentRequests: string[] = [];

    const loadUserFriendsData = (userName: string) => {
      const mockDatabase: any = {
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
      const userData = mockDatabase[userName];
      if (userData) {
        friends = userData.friends;
        friendRequests = userData.friendRequests;
      } else {
        friends = [];
        friendRequests = [];
        sentRequests = [];
      }
    };

    loadUserFriendsData(mockUser);

    expect(friends.length).toBe(4);
    expect(friendRequests.length).toBe(3);
  });

  test("acceptRequest moves request to friends", () => {
    let friends: Friend[] = [];
    let friendRequests: FriendRequest[] = [
      { id: '5', username: 'NicholasA', timestamp: new Date() }
    ];

    const acceptRequest = (requestId: string) => {
      const request = friendRequests.find(r => r.id === requestId);
      if (request) {
        friends = [...friends, { id: request.id, username: request.username }];
        friendRequests = friendRequests.filter(r => r.id !== requestId);
      }
    };

    acceptRequest('5');

    expect(friends.some(f => f.id === '5')).toBe(true);
    expect(friendRequests.some(r => r.id === '5')).toBe(false);
  });

  test("declineRequest removes the request", () => {
    let friendRequests: FriendRequest[] = [
      { id: '6', username: 'ManhaK', timestamp: new Date() }
    ];

    const declineRequest = (requestId: string) => {
      friendRequests = friendRequests.filter(r => r.id !== requestId);
    };

    declineRequest('6');

    expect(friendRequests.some(r => r.id === '6')).toBe(false);
  });

  test("sendFriendRequest adds to sentRequests without duplicates", () => {
    let sentRequests: string[] = [];

    const sendFriendRequest = (userId: string) => {
      if (!sentRequests.includes(userId)) sentRequests.push(userId);
    };

    sendFriendRequest("abc123");
    sendFriendRequest("abc123");

    expect(sentRequests).toEqual(["abc123"]);
  });

  test("removeFriend deletes friend", () => {
    let friends: Friend[] = [
      { id: '1', username: 'MarwanH' },
      { id: '2', username: 'MaxL' }
    ];

    const removeFriend = (friendId: string) => {
      friends = friends.filter(f => f.id !== friendId);
    };

    removeFriend('1');

    expect(friends.some(f => f.id === '1')).toBe(false);
    expect(friends.length).toBe(1);
  });
});
