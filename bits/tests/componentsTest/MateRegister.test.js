import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MateRegister from '../../components/LiveBoard/MateRegister/MateRegister';
import { STRINGS, TESTID } from '../../constants/index';

const mockedDispatch = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockedDispatch,
    }),
  };
});

describe('Mate register component', () => {
  beforeEach(() => {
    mockedDispatch.mockClear();
  });

  it ('Should not response if wrong elements are pressed', () => {
    const { getByTestId } = render(<MateRegister />);
    const icon = getByTestId(TESTID.REGISTER_PAGE_ICON);

    fireEvent.press(icon);

    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });

  it ('Should have register mate,, follow new mate text', () => {
    const { queryByText } = render(<MateRegister />);

    expect(queryByText(STRINGS.NO_REGISTERED_MATE)).not.toBeNull();
    expect(queryByText(STRINGS.FOLLOW_NEW_MATE)).not.toBeNull();
  });
});

