import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth, validateEmail, validatePassword } from '../contexts/AuthContext';

function TestComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? <span data-testid="user-email">{user.email}</span> : <span data-testid="no-user">No user</span>}
      <button onClick={() => login('PreviousUser@gmail.com', 'GeorgeWashington1')} data-testid="login-btn">
        Login
      </button>
      <button onClick={() => logout()} data-testid="logout-btn">
        Logout
      </button>
    </div>
  );
}

describe('Auth validation functions', () => {
  test('validateEmail - invalid email', () => {
    const result = validateEmail('not-an-email');
    expect(result.valid).toBe(false);
  });

  test('validateEmail - valid email', () => {
    const result = validateEmail('test@example.com');
    expect(result.valid).toBe(true);
  });

  test('validatePassword - missing capital letter', () => {
    const result = validatePassword('password1234');
    expect(result.valid).toBe(false);
  });

  test('validatePassword - missing number', () => {
    const result = validatePassword('PasswordPassword');
    expect(result.valid).toBe(false);
  });

  test('validatePassword - too short', () => {
    const result = validatePassword('Pass1');
    expect(result.valid).toBe(false);
  });

  test('validatePassword - valid password', () => {
    const result = validatePassword('Password12345');
    expect(result.valid).toBe(true);
  });
});

describe('AuthContext login/logout', () => {
  test('User starts logged out', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('no-user')).toBeInTheDocument();
  });

  test('User can login with correct credentials', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('user-email')).toHaveTextContent('PreviousUser@gmail.com');
    });
  });

  test('User can logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // login first
    fireEvent.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('user-email')).toBeInTheDocument();
    });

    // then logout
    fireEvent.click(screen.getByTestId('logout-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('no-user')).toBeInTheDocument();
    });
  });
});
