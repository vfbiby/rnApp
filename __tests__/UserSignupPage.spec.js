import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { UserSignupPage } from '../src/UserSignupPage';

describe('UserSignupPage', () => {
  describe('Layout', () => {
    beforeEach(() => render(<UserSignupPage />));

    it('should has header of Sign up', () => {
      const header = screen.queryByText('Sign Up');
      expect(header).toBeTruthy();
    });

    it('should has input of display name', () => {
      const displayNameInput =
        screen.queryByPlaceholderText('Your display name');
      expect(displayNameInput).toBeTruthy();
    });

    it('should has input of username', () => {
      const usernameInput = screen.queryByPlaceholderText('Your username');
      expect(usernameInput).toBeTruthy();
    });

    it('should has input of password', () => {
      const passwordInput = screen.queryByPlaceholderText('Your password');
      expect(passwordInput).toBeTruthy();
    });

    it('should has password type for password input', () => {
      const passwordInput = screen.queryByPlaceholderText('Your password');
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it('should has input for password repeat', () => {
      const passwordRepeatInput = screen.queryByPlaceholderText(
        'Repeat your password',
      );
      expect(passwordRepeatInput).toBeTruthy();
    });

    it('should has password type for password repeat input', () => {
      const passwordInput = screen.queryByPlaceholderText(
        'Repeat your password',
      );
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it('should has submit button', () => {
      const button = screen.queryByRole('button');
      expect(button).toBeTruthy();
    });
  });
});
