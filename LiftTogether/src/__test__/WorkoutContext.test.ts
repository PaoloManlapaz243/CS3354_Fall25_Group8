import React, { ReactElement } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WorkoutProvider, useWorkout } from '../contexts/WorkoutContext';

function TestConsumer(): ReactElement {
  const { posts, personalRecords, addPost, toggleLike, getLikedPosts } = useWorkout();

  return React.createElement(
    'div',
    null,
    [
      React.createElement('div', { key: 'post-count', 'data-testid': 'post-count' }, posts.length),
      React.createElement('div', { key: 'pr-count', 'data-testid': 'pr-count' }, personalRecords.length),

      React.createElement('button', {
        key: 'add-post',
        'data-testid': 'add-post',
        onClick: () =>
          addPost({
            userId: 'testUser',
            username: 'TestUser',
            exercise: 'Bench Press',
            sets: 3,
            reps: 5,
            weight: 200,
            caption: 'Test Caption'
          })
      }),

      React.createElement('button', {
        key: 'like-btn',
        'data-testid': 'like-btn',
        onClick: () => {
          const first = posts[0];
          if (first) toggleLike(first.id, 'testUser');
        }
      }),

      React.createElement(
        'div',
        { key: 'liked-count', 'data-testid': 'liked-count' },
        (Array.from(getLikedPosts('testUser')).length).toString()
      )
    ]
  );
}

describe('WorkoutContext (no JSX, TS-friendly)', () => {
  test('addPost adds a post and registers a PR', async () => {
    render(
      React.createElement(
        WorkoutProvider,
        null,
        React.createElement(TestConsumer, null)
      )
    );

    await waitFor(() => {
      expect(screen.getByTestId('post-count').textContent).not.toBe('0');
    });

    const initialPostCount = Number(screen.getByTestId('post-count').textContent);
    const initialPrCount = Number(screen.getByTestId('pr-count').textContent);

    fireEvent.click(screen.getByTestId('add-post'));

    await waitFor(() => {
      expect(Number(screen.getByTestId('post-count').textContent)).toBe(initialPostCount + 1);
    });

    expect(Number(screen.getByTestId('pr-count').textContent)).toBe(initialPrCount + 1);
  });

  test('toggleLike toggles like correctly', async () => {
    render(
      React.createElement(
        WorkoutProvider,
        null,
        React.createElement(TestConsumer, null)
      )
    );

    await waitFor(() => {
      expect(screen.getByTestId('post-count').textContent).not.toBe('0');
    });

    expect(screen.getByTestId('liked-count').textContent).toBe('0');

    fireEvent.click(screen.getByTestId('like-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('liked-count').textContent).toBe('1');
    });

    fireEvent.click(screen.getByTestId('like-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('liked-count').textContent).toBe('0');
    });
  });

  test('useWorkout throws outside provider', () => {
    const BadComponent = () => {
      // immediate call to useWorkout will throw
      useWorkout();
      return React.createElement('div');
    };

    expect(() => render(React.createElement(BadComponent))).toThrow();
  });
});
