import React from 'react';
import 'jest-styled-components';
import Loading from './Loading';
import { render } from '../test/test-utils';

describe('<Loading>', () => {
  it('matches snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
  
  it('should have given style elements', () => {
    const sampleSize = '100px';
    const sampleText = 'sample';
    const { getByTestId } = render(
      <Loading size={sampleSize} text={sampleText} />,
    );
    expect(getByTestId('loading-spinner')).toHaveStyleRule('width', sampleSize);
    expect(getByTestId('loading-spinner')).toHaveStyleRule(
      'height',
      sampleSize,
    );
  });
});
