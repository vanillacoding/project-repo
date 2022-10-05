import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../components/shared/Button';

describe('Button component test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress prop when pressed', () => {
    const handlePress = jest.fn();
    const buttonText = 'button';
    const { getByText } = render(
      <Button
        onPress={handlePress}
        text={buttonText}
      />
    );
    const button = getByText(buttonText);

    fireEvent.press(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
