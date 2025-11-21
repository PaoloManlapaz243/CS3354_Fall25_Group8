import { validateEmail, validatePassword } from '../contexts/AuthContext';

describe('validateEmail', () => {
  test('fails for invalid email format', () => {
    expect(validateEmail('bademail')).toEqual({
      valid: false,
      error: 'Please ensure you have entered a valid email',
    });
  });

  test('fails for missing domain', () => {
    expect(validateEmail('test@')).toEqual({
      valid: false,
      error: 'Please ensure you have entered a valid email',
    });
  });

  test('fails for missing @ symbol', () => {
    expect(validateEmail('test.example.com')).toEqual({
      valid: false,
      error: 'Please ensure you have entered a valid email',
    });
  });

  test('passes for valid email format', () => {
    expect(validateEmail('user@example.com')).toEqual({
      valid: true,
    });
  });
});

describe('validatePassword', () => {
  test('fails when missing capital letter', () => {
    expect(validatePassword('password12345')).toEqual({
      valid: false,
      error: 'Please include a capital letter in your password',
    });
  });

  test('fails when missing number', () => {
    expect(validatePassword('PasswordOnly')).toEqual({
      valid: false,
      error: 'Please include a number in your password',
    });
  });

  test('fails when too short', () => {
    expect(validatePassword('Short1A')).toEqual({
      valid: false,
      error: 'Please make sure your password is at least 12 characters long',
    });
  });

  test('passes for valid password', () => {
    expect(validatePassword('StrongPassword123')).toEqual({
      valid: true,
    });
  });
});
