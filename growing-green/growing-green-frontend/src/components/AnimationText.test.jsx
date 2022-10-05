import React from 'react';
import { render } from '../test/test-utils';
import AnimationText from './AnimationText';

describe('<AnimationText>', () => {
  const sampleText = 'sample';

  it('matches snapshot', () => {
    const { container } = render(<AnimationText children={sampleText} />);
    expect(container).toMatchSnapshot();
  });

  it('should render texts in each element correctly', () => {
    const texts = sampleText.split('');
    const { getByText } = render(<AnimationText children={sampleText} />);

    texts.forEach((text) => {
      const renderText = getByText(text);
      expect(renderText).toBeInTheDocument();
    });
  });
});
