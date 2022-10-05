import React from 'react';
import * as nextRouter from 'next/router';
import { render } from '@testing-library/react';

import History from '../src/components/History';

jest.mock('../src/components/History/RecentHistory', () => ({
  __esModule: true,
  default: function () {
    return <h2>RecentHistory</h2>;
  },
}));

describe('History', () => {
  it('renders History component', () => {
    const { getByText } = render(<History />);
    expect(getByText('RecentHistory')).toBeInTheDocument();
  });
});
