import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginSignupButtons from '../../components/shared/LoginSignupButtons/LoginSignupButtons';
import { STRINGS } from '../../constants/index';

describe('Signup buttons component', () => {
  it ('Should render login signup text', () => {
    const { queryByText } = render(<LoginSignupButtons />);

    expect(queryByText(STRINGS.LOGIN)).not.toBeNull();
    expect(queryByText(STRINGS.SIGNUP)).not.toBeNull();
  });

  it ('Should response when login, signup button pressed', () => {
    const mockFunc = jest.fn();
    const mockFunc2 = jest.fn();
    const { getByTestId } = render(<LoginSignupButtons
      onLoginPress={mockFunc}
      onSignupPress={mockFunc2}
    />);

    const loginButton = getByTestId(STRINGS.LOGIN_EN);
    const signupButton = getByTestId(STRINGS.SIGNUP_EN);

    fireEvent.press(loginButton);
    fireEvent.press(signupButton);

    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc2).toHaveBeenCalledTimes(1);
  });
});
