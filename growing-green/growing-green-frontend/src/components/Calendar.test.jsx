import React from 'react';
import Calendar from './Calendar';
import { render } from '../test/test-utils';
import { getFormatedDate } from '../utils/getFormatedDate';

describe('<Calendar>', () => {
  it('matches snapshot', () => {
    const { container } = render(<Calendar />);
    expect(container).toMatchSnapshot();
  });

  it('should render currnet Date', () => {
    const { getByText } = render(<Calendar />);
    const date = getFormatedDate(new Date());
    expect(getByText(date.month)).toHaveClass('month-name');
    expect(getByText(date.week)).toHaveClass('week-name');
    expect(getByText(date.day)).toHaveClass('day');
  });
});
