import React from 'react';
import { render } from '../test/test-utils';
import LandingPage from './LandingPage';

describe('<Landing>', () => {
  it('matches snapshot', () => {
    const { container } = render(<LandingPage />);
    expect(container).toMatchSnapshot();
  });

  it('should show login text on button', () => {
    const { getByRole } = render(<LandingPage />);
    expect(getByRole('button').textContent).toBe('L O G I N');
  });
});
