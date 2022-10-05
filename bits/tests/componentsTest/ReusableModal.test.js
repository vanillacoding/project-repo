import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReusableModal from '../../components/ReusableModal/ReusableModal';
import { MESSAGE, STRINGS } from '../../constants/index';

describe('Reusable modal component', () => {
  it ('Should render prop message', () => {
    const { queryByText } = render(<ReusableModal message={MESSAGE.CHECK_INPUT} />);
    const message = queryByText(MESSAGE.CHECK_INPUT);

    expect(message).not.toBeNull();
  });

  it ('Should response when confirm button pressed', () => {
    const mockFunc = jest.fn();
    const { getByTestId } = render(<ReusableModal onButtonPress={mockFunc} />);
    const confirmButton = getByTestId(STRINGS.CONFIRM);

    fireEvent.press(confirmButton);

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
