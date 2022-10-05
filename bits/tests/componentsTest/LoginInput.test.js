import React from 'react';
import { render } from '@testing-library/react-native';
import LoginInput from '../../components/LoginBoard/LoginInput/LoginInput';
import { MESSAGE, STRINGS } from '../../constants/index';

describe('Login input component', () => {
  it ('Should have email, password input', () => {
    const { getByPlaceholderText } = render(<LoginInput />);
    const emailTextInput = getByPlaceholderText(MESSAGE.TYPE_EMAIL);
    const passwordTextInput = getByPlaceholderText(MESSAGE.TYPE_PASSWORD);

    expect(emailTextInput).toBeDefined();
    expect(passwordTextInput).toBeDefined();
  });

  it ('Should render Email, PW text', () => {
    const { queryByText } = render(<LoginInput />);

    expect(queryByText(STRINGS.EMAIL)).not.toBeNull();
    expect(queryByText(STRINGS.PW)).not.toBeNull();
  });
});
