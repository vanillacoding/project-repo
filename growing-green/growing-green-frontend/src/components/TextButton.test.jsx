import React from 'react';
import TextButton from './TextButton';
import 'jest-styled-components';
import { render, fireEvent } from '../test/test-utils';
import { buttonSizes, buttonColors, buttons } from '../assets/styles/theme';

describe.only('<TextButton>', () => {
  const sampleText = 'sampleButton';

  it('matches snapshot', () => {
    const { container } = render(
      <TextButton
        onClick={() => {}}
        variant="rounded"
        size="short"
        color="translucentRed"
        label={sampleText}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should have style element according to the given attribute value', () => {
    const size = 'short';
    const color = 'translucentRed';
    const variant = 'rounded';

    const { getByRole } = render(
      <TextButton
        onClick={() => {}}
        variant={variant}
        size={size}
        color={color}
        label={sampleText}
      />,
    );

    expect(getByRole('button')).toHaveStyleRule(
      'width',
      buttonSizes[size].width,
    );
    expect(getByRole('button')).toHaveStyleRule(
      'height',
      buttonSizes[size].height,
    );
    expect(getByRole('button')).toHaveStyleRule(
      'color',
      buttonColors[color].text,
    );
    expect(getByRole('button')).toHaveStyleRule(
      'color',
      buttonColors[color].text,
    );
    expect(getByRole('button')).toHaveStyleRule(
      'border-width',
      buttons[variant].borderWidth,
    );
  });

  it('should event occurs when the user clicks the button', () => {
    jest.spyOn(global.console, 'log');

    const { getByText } = render(
      <TextButton
        onClick={() => console.log('click')}
        variant="rounded"
        size="short"
        color="translucentRed"
        label={sampleText}
      />,
    );

    const button = getByText(sampleText);

    fireEvent.click(button);

    expect(console.log).toHaveBeenCalledWith('click');
  });
});
