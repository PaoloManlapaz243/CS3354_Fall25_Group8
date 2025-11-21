import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { WorkoutProvider, useWorkout } from '../contexts/WorkoutContext';

// Test consumer to access context
function TestConsumer() {
  const { posts, personalRecords, addPost, toggleLike, getLikedPosts } = useWorkout();

  return (
    <div>
      <div data-testid="posts-count">{posts.length}</div>
      <div data-testid="prs-count">{personalRecords.length}</div>

      <button
        data-testid="add-post"
        onClick={() =>
          addPost({
            userId: 'test-user',
            username: 'TestUser',
            exercise: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 300,
            caption: 'New test PR',
          })
        }
      >
        Add Post
      </button>

      <button
        data-testid="toggle-like"
        onClick={() => toggleLike(posts[0]?.id, 'test-user')}
      >
        Toggle Like
      </button>

      <button
        data-testid="get-liked"
        onClick={() => {
          const liked = getLikedPosts('test-user');
          (window as any).__liked = liked;
        }}
      >
        Get Liked
      </button>

      <div data-testid="first-post-likes">
        {posts[0]?.likes ?? 0}
      </div>
    </div>
  );
}

// Helper to wrap in provider
const renderWithProvider = () =>
  render(
    <WorkoutProvider>
      <TestConsumer />
    </WorkoutProvider>
  );

describe('WorkoutContext', () => {

  it('loads with initial posts', () => {
    renderWithProvider();

    // You have 6 initial posts
    expect(screen.getByTestId('posts-count')).toHaveTextContent('6');
  });

  it('adds a new post correctly', async () => {
    renderWithProvider();

    fireEvent.click(screen.getByTestId('add-post'));

    await waitFor(() => {
      expect(screen.getByTestId('posts-count')).toHaveTextContent('7');
    });
  });

  it('creates a personal record (PR) when appropriate', async () => {
    renderWithProvider();

    fireEvent.click(screen.getByTestId('add-post'));

    await waitFor(() => {
      const prCount = Number(screen.getByTestId('prs-count').textContent);
      expect(prCount).toBeGreaterThan(0);
    });
  });

  it('toggles a like on a post correctly', async () => {
    renderWithProvider();

    const initialLikes = Number(screen.getByTestId('first-post-likes').textContent);

    fireEvent.click(screen.getByTestId('toggle-like'));

    await waitFor(() => {
      const updatedLikes = Number(screen.getByTestId('first-post-likes').textContent);
      expect(updatedLikes).toBe(initialLikes + 1);
    });
  });

  it('can get liked posts for a user', async () => {
    renderWithProvider();

    // Like the first post
    fireEvent.click(screen.getByTestId('toggle-like'));

    // Get liked posts
    fireEvent.click(screen.getByTestId('get-liked'));

    await waitFor(() => {
      const liked: Set<string> = (window as any).__liked;
      expect(liked.size).toBe(1);
    });
  });

});
