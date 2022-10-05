import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Modal from '../src/components/Modal';

function SampleComponent() {
  return <h1>Sample Heading</h1>;
}

describe('Modal', () => {
  it('renders children', () => {
    const { getByText } = render(<Modal onClose={() => {}}>Sample Text</Modal>);

    expect(getByText('Sample Text')).toBeInTheDocument();
  });

  it('renders component', () => {
    const { getByText } = render(
      <Modal onClose={() => {}}>
        <SampleComponent />
      </Modal>,
    );

    expect(getByText('Sample Heading')).toBeInTheDocument();
  });

  it('execute onClose function when clicked dimmed', () => {
    const myMock = jest.fn();
    const { getByTestId } = render(
      <Modal onClose={myMock}>
        <SampleComponent />
      </Modal>,
    );

    fireEvent.click(getByTestId('dimmed'));
    expect(myMock.mock.calls.length).toBe(1);
  });
});
