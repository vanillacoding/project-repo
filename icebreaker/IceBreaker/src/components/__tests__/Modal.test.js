import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Modal from '../Modal';

function SampleComponent() {
  return <h1>Sample Heading</h1>;
}

describe('<Modal /> : render children', () => {
  it('should render text children', () => {
    render(<Modal onClose={() => {}}>Sample Test</Modal>);

    expect(screen.getByText('Sample Test')).toBeInTheDocument();
  });

  it('should render component children', () => {
    render(
      <Modal onClose={() => {}}>
        <SampleComponent />
      </Modal>,
    );

    expect(screen.getByText('Sample Heading')).toBeInTheDocument();
  });
});

describe('<Modal /> : execute onClose when clicked', () => {
  const closeModal = jest.fn();

  it('should execute onClose function when clicked dimmed or close button', () => {
    render(
      <Modal onClose={closeModal}>
        <SampleComponent />
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('dimmed'));
    expect(closeModal.mock.calls.length).toBe(1);

    fireEvent.click(screen.getByRole('button'));
    expect(closeModal.mock.calls.length).toBe(2);
  });
});
