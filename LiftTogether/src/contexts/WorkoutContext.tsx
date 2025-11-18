import { createContext, useContext, useState, ReactNode } from 'react';

export interface WorkoutPost {
  id: string;
  userId: string;
  username: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  caption: string;
  timestamp: Date;
  likes: number;
  isNewPR?: boolean;
}

export interface PersonalRecord {
  exercise: string;
  weight: number;
  reps: number;
  date: Date;
}

interface WorkoutContextType {
  posts: WorkoutPost[];
  personalRecords: PersonalRecord[];
  addPost: (post: Omit<WorkoutPost, 'id' | 'timestamp' | 'likes' | 'isNewPR'>) => boolean;
  toggleLike: (postId: string, userId: string) => void;
  getLikedPosts: (userId: string) => Set<string>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// Valid exercises database
export const VALID_EXERCISES = [
  'Squat',
  'Bench Press',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Pull Up',
  'Dip',
  'Leg Press',
  'Romanian Deadlift',
  'Front Squat',
  'Incline Bench Press',
  'Lunges',
  'Bicep Curl',
  'Tricep Extension',
  'Lat Pulldown'
];

// Mock initial posts from different users
const initialPosts: WorkoutPost[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'MarwanM',
    exercise: 'Bench Press',
    sets: 3,
    reps: 8,
    weight: 225,
    caption: 'Finally hit 225 for reps! Feeling strong 💪',
    timestamp: new Date('2025-11-17T10:30:00'),
    likes: 12,
    isNewPR: true
  },
  {
    id: '2',
    userId: 'user2',
    username: 'MaxL',
    exercise: 'Squat',
    sets: 5,
    reps: 5,
    weight: 315,
    caption: 'Heavy squats today. Form felt solid!',
    timestamp: new Date('2025-11-17T09:15:00'),
    likes: 8
  },
  {
    id: '3',
    userId: 'user3',
    username: 'PaoloM',
    exercise: 'Deadlift',
    sets: 1,
    reps: 5,
    weight: 405,
    caption: 'New PR! 405 deadlift lets gooo! 🔥',
    timestamp: new Date('2025-11-17T08:00:00'),
    likes: 25,
    isNewPR: true
  },
  {
    id: '4',
    userId: 'user4',
    username: 'OsmanA',
    exercise: 'Overhead Press',
    sets: 4,
    reps: 6,
    weight: 95,
    caption: 'Shoulder day complete! Getting stronger every week',
    timestamp: new Date('2025-11-16T16:45:00'),
    likes: 6
  },
  {
    id: '5',
    userId: 'user1',
    username: 'MarwanM',
    exercise: 'Barbell Row',
    sets: 4,
    reps: 8,
    weight: 185,
    caption: 'Back gains coming in nicely',
    timestamp: new Date('2025-11-16T11:20:00'),
    likes: 4
  },
  {
    id: '7',
    userId: 'user2',
    username: 'MaxL',
    exercise: 'Pull Up',
    sets: 5,
    reps: 12,
    weight: 0,
    caption: 'Bodyweight gains! Finally hit 60 total pull ups',
    timestamp: new Date('2025-11-15T14:30:00'),
    likes: 11
  }
];

// Validation functions
export const validateExercise = (exercise: string): { valid: boolean; error?: string } => {
  if (!exercise || exercise.trim() === '') {
    return { valid: false, error: 'Please enter a value' };
  }
  
  if (!VALID_EXERCISES.includes(exercise)) {
    return { valid: false, error: 'Please enter a valid exercise' };
  }
  
  return { valid: true };
};

export const validateSets = (sets: string | number): { valid: boolean; error?: string; value?: number } => {
  if (sets === '' || sets === null || sets === undefined) {
    return { valid: false, error: 'Please enter a number of sets' };
  }
  
  const numValue = typeof sets === 'string' ? parseFloat(sets) : sets;
  
  if (isNaN(numValue)) {
    return { valid: false, error: 'Please enter a numerical value for the number of sets' };
  }
  
  if (numValue <= 0) {
    return { valid: false, error: 'Please enter a nonzero positive number for the number of sets' };
  }
  
  return { valid: true, value: numValue };
};

export const validateReps = (reps: string | number): { valid: boolean; error?: string; value?: number } => {
  if (reps === '' || reps === null || reps === undefined) {
    return { valid: false, error: 'Please enter a number of reps' };
  }
  
  const numValue = typeof reps === 'string' ? parseFloat(reps) : reps;
  
  if (isNaN(numValue)) {
    return { valid: false, error: 'Please enter a numerical value for the number of reps' };
  }
  
  if (numValue <= 0) {
    return { valid: false, error: 'Please enter a nonzero positive number for the number of reps' };
  }
  
  return { valid: true, value: numValue };
};

export const validateWeight = (weight: string | number): { valid: boolean; error?: string; value?: number } => {
  if (weight === '' || weight === null || weight === undefined) {
    return { valid: false, error: 'Please enter a number of weight' };
  }
  
  const numValue = typeof weight === 'string' ? parseFloat(weight) : weight;
  
  if (isNaN(numValue)) {
    return { valid: false, error: 'Please enter a numerical value for the number of weight' };
  }
  
  if (numValue < 0) {
    return { valid: false, error: 'Please enter a nonzero positive number for the number of weight' };
  }
  
  return { valid: true, value: numValue };
};

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<WorkoutPost[]>(initialPosts);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([]);
  const [likesMap, setLikesMap] = useState<Map<string, Set<string>>>(new Map());

  const addPost = (post: Omit<WorkoutPost, 'id' | 'timestamp' | 'likes' | 'isNewPR'>): boolean => {
    // Check if this is a new PR for the user
    const userPRs = personalRecords.filter(pr => pr.exercise === post.exercise);
    let isNewPR = false;

    if (userPRs.length === 0) {
      // First time doing this exercise
      isNewPR = true;
      setPersonalRecords([...personalRecords, {
        exercise: post.exercise,
        weight: post.weight,
        reps: post.reps,
        date: new Date()
      }]);
    } else {
      // Check if it's a new PR (higher weight or same weight with more reps)
      const currentPR = userPRs.reduce((max, pr) => {
        if (pr.weight > max.weight || (pr.weight === max.weight && pr.reps > max.reps)) {
          return pr;
        }
        return max;
      });

      if (post.weight > currentPR.weight || (post.weight === currentPR.weight && post.reps > currentPR.reps)) {
        isNewPR = true;
        setPersonalRecords([...personalRecords, {
          exercise: post.exercise,
          weight: post.weight,
          reps: post.reps,
          date: new Date()
        }]);
      }
    }

    const newPost: WorkoutPost = {
      ...post,
      id: Math.random().toString(),
      timestamp: new Date(),
      likes: 0,
      isNewPR
    };
    
    setPosts([newPost, ...posts]);
    return isNewPR;
  };

  const toggleLike = (postId: string, userId: string) => {
    const newLikesMap = new Map(likesMap);
    
    if (!newLikesMap.has(postId)) {
      newLikesMap.set(postId, new Set());
    }
    
    const postLikes = newLikesMap.get(postId)!;
    
    if (postLikes.has(userId)) {
      postLikes.delete(userId);
      setPosts(posts.map(p => 
        p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p
      ));
    } else {
      postLikes.add(userId);
      setPosts(posts.map(p => 
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      ));
    }
    
    setLikesMap(newLikesMap);
  };

  const getLikedPosts = (userId: string): Set<string> => {
    const likedPosts = new Set<string>();
    likesMap.forEach((likes, postId) => {
      if (likes.has(userId)) {
        likedPosts.add(postId);
      }
    });
    return likedPosts;
  };

  return (
    <WorkoutContext.Provider value={{ posts, personalRecords, addPost, toggleLike, getLikedPosts }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
