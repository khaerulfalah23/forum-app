import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm component', () => {
  afterEach(cleanup);

  it('should handle email typing correctly', async () => {
    const onLoginSpy = vi.fn();
    render(<LoginForm onLogin={onLoginSpy} />);
    const emailInput = screen.getByPlaceholderText(/nama@contoh.com/i);

    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    const onLoginSpy = vi.fn();
    render(<LoginForm onLogin={onLoginSpy} />);
    const passwordInput = screen.getByPlaceholderText('••••••••');

    await userEvent.type(passwordInput, 'password123');
    expect(passwordInput.value).toBe('password123');
  });

  it('should call onLogin function with correct credentials when login button is clicked', async () => {
    // Arrange
    const onLoginSpy = vi.fn();
    render(<LoginForm onLogin={onLoginSpy} />);

    const emailInput = screen.getByPlaceholderText(/nama@contoh.com/i);
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const loginButton = screen.getByRole('button', { name: /masuk sekarang/i });

    // Action
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    // Assert
    await waitFor(() => {
      expect(onLoginSpy).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          password: 'password123',
        },
        expect.any(Object),
      );
    });

    expect(onLoginSpy).toHaveBeenCalledTimes(1);
  });

  it('should disable the button and show loading text when isLoading is true', () => {
    const onLoginSpy = vi.fn();
    render(<LoginForm onLogin={onLoginSpy} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /masuk.../i });

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/masuk.../i)).toBeInTheDocument();
  });
});
