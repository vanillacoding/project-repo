import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignupInput from '../../components/SignupBoard/SignupInput/SignupInput';
import { STRINGS } from '../../constants/index';

describe('Signup input component', () => {
  it ('Should render signup form texts', () => {
    const { queryByText } = render(<SignupInput />);

    expect(queryByText(STRINGS.EMAIL)).not.toBeNull();
    expect(queryByText(STRINGS.NAME)).not.toBeNull();
    expect(queryByText(STRINGS.PW)).not.toBeNull();
    expect(queryByText(STRINGS.CHECK)).not.toBeNull();
  });

  it ('Should change text input when typed', () => {
    const mockFunc = jest.fn();
    const mockFunc2 = jest.fn();
    const mockFunc3 = jest.fn();
    const mockFunc4 = jest.fn();

    const { getByTestId } = render(<SignupInput
      email={STRINGS.EMAIL}
      userName={STRINGS.NAME}
      password={STRINGS.PW}
      confirmPassword={STRINGS.CONFIRM}
      onEmailChange={mockFunc}
      onUserNameChange={mockFunc2}
      onPasswordChange={mockFunc3}
      onConfirmChange={mockFunc4}
    />);

    const emailInput = getByTestId(STRINGS.EMAIL);
    const userNameInput = getByTestId(STRINGS.NAME);
    const passwordInput = getByTestId(STRINGS.PW);
    const confirmInput = getByTestId(STRINGS.CHECK);

    fireEvent.changeText(emailInput);
    fireEvent.changeText(userNameInput);
    fireEvent.changeText(passwordInput);
    fireEvent.changeText(confirmInput);

    expect(emailInput.props.value).toBe(STRINGS.EMAIL);
    expect(userNameInput.props.value).toBe(STRINGS.NAME);
    expect(passwordInput.props.value).toBe(STRINGS.PW);
    expect(confirmInput.props.value).toBe(STRINGS.CONFIRM);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc2).toHaveBeenCalledTimes(1);
    expect(mockFunc3).toHaveBeenCalledTimes(1);
    expect(mockFunc4).toHaveBeenCalledTimes(1);
  });
});

