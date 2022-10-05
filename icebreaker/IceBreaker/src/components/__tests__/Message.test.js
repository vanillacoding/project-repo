import React from 'react';
import { useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';

import Message from '../share/Message';

describe('<Message />', () => {
  it('should show message received as a prop', () => {
    const MESSAGE = '게임이 곧 시작됩니다';

    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          message: {
            type: 'break',
            text: MESSAGE,
          },
        },
      }),
    );

    render(<Message />);

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();
  });
});
