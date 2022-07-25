import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { UserSignupPage } from '../src/UserSignupPage';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

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

  describe('Interactions', () => {
    it('should sets the displayName value into state', function () {
      render(<UserSignupPage />);
      const displayNameInput =
        screen.queryByPlaceholderText('Your display name');
      fireEvent.changeText(displayNameInput, 'my-display-name');
      expect(displayNameInput.props.value).toBe('my-display-name');
    });

    it('should sets the username value into state', function () {
      render(<UserSignupPage />);
      const usernameInput = screen.queryByPlaceholderText('Your username');
      fireEvent.changeText(usernameInput, 'my-user-name');
      expect(usernameInput.props.value).toBe('my-user-name');
    });

    it('should sets the password value into state', function () {
      render(<UserSignupPage />);
      const passwordInput = screen.queryByPlaceholderText('Your password');
      fireEvent.changeText(passwordInput, 'P4sword');
      expect(passwordInput.props.value).toBe('P4sword');
    });

    it('should sets the password repeat value into state', function () {
      render(<UserSignupPage />);
      const passwordRepeatInput = screen.queryByPlaceholderText(
        'Repeat your password',
      );
      fireEvent.changeText(passwordRepeatInput, 'P4sword');
      expect(passwordRepeatInput.props.value).toBe('P4sword');
    });

    let button,
      displayNameInput,
      usernameInput,
      passwordInput,
      passwordRepeatInput;

    function setupForSubmit(props) {
      const rendered = render(<UserSignupPage {...props} />);
      const { queryByPlaceholderText, queryByRole } = rendered;

      displayNameInput = queryByPlaceholderText('Your display name');
      usernameInput = queryByPlaceholderText('Your username');
      passwordInput = queryByPlaceholderText('Your password');
      passwordRepeatInput = queryByPlaceholderText('Repeat your password');

      fireEvent.changeText(displayNameInput, 'James Zhang');
      fireEvent.changeText(usernameInput, 'zhang');
      fireEvent.changeText(passwordInput, 'P4sword');
      fireEvent.changeText(passwordRepeatInput, 'P4sword');

      button = queryByRole('button');
      return rendered;
    }

    it('should calls postSignup when the fields are valid and actions are provided in props', function () {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };
      setupForSubmit({ actions });
      fireEvent.press(button);
      const expectedUserObject = {
        username: 'zhang',
        displayName: 'James Zhang',
        password: 'P4sword',
      };

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });

    function mockAsyncDelayed() {
      return jest.fn().mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({});
          }, 100);
        });
      });
    }

    it('should not allow user to click the Sign up button when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };
      setupForSubmit({ actions });
      fireEvent.press(button);
      fireEvent.press(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('should displays spinner when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.press(button);
      const spinner = queryByText('Loading...');
      expect(spinner).toBeTruthy();
    });

    it('should hide spinner after api call finishes successfully', async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.press(button);
      await waitFor(() => {
        expect(queryByText('Loading...')).toBeNull();
      });
    });

    it('should hide spinner after api call finishes with error', async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({ response: { data: {} } });
            }, 100);
          });
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.press(button);
      await waitFor(() => {
        expect(queryByText('Loading...')).toBeNull();
      });
    });

    it('should display validation error for displayName when error is received for the field', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null.',
              },
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.press(button);
      await waitFor(() => {
        expect(queryByText('Cannot be null.')).toBeTruthy();
      });
    });

    it('should enable the signup button when password and repeat password have same value', () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });

    it('should disable the signup button when password repeat does not match to password', () => {
      setupForSubmit();
      fireEvent.changeText(passwordRepeatInput, 'new-pass');
      expect(button).toBeDisabled();
    });

    it('should disable the signup button when password does not match to password repeat', () => {
      setupForSubmit();
      fireEvent.changeText(passwordInput, 'new-pass');
      expect(button).toBeDisabled();
    });

    it('should display error style for password repeat input when password repeat mismatch', () => {
      const { queryByText } = setupForSubmit();
      fireEvent.changeText(passwordRepeatInput, 'new-pass');
      const mismatchWarning = queryByText('Does not match to password');
      expect(mismatchWarning).not.toBeNull();
    });

    it('should display error style for password repeat input when password mismatch', () => {
      const { queryByText } = setupForSubmit();
      fireEvent.changeText(passwordInput, 'new-pass');
      const mismatchWarning = queryByText('Does not match to password');
      expect(mismatchWarning).not.toBeNull();
    });
  });
});
