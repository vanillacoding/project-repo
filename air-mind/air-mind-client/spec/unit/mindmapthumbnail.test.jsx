import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MindMapThumbnail from '../../components/mindmapthumbnail';

let iframeElement;

describe('MindMapThumbnail - iframe', () => {
  beforeEach(() => {
    const mockWidth = jest.fn();
    const mockHeight = jest.fn();

    Object.defineProperty(window, 'screen', {
      value: {
        get width() {
          return mockWidth();
        },
        get height() {
          return mockHeight();
        },
      },
    });

    mockWidth.mockReturnValue(1440);
    mockHeight.mockReturnValue(1080);
    act(() => {
      render(<MindMapThumbnail url="https://www.google.com/" width={300} />);
    });

    iframeElement = screen.getByTitle('mindmap-thumbnail');
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });
  it('should renders a iframe', () => {
    expect(iframeElement).toBeInTheDocument();
  });

  it('should be set allow-same-origin in the iframe', () => {
    expect(iframeElement).toHaveAttribute('allow', 'src');
    expect(iframeElement).toHaveAttribute(
      'sandbox',
      'allow-scripts allow-same-origin',
    );
  });

  it('The width and height of the iframe should be the same as the size of the screen.', () => {
    expect(iframeElement).toHaveAttribute('width', '1440');
    expect(iframeElement).toHaveAttribute('height', '1080');
  });
});

describe('MindMapThumbnail - loading', () => {
  it('Should display loading element', () => {
    render(<MindMapThumbnail url="https://www.google.com/" width={300} />);

    const element = screen.getByTestId('loading-element');

    expect(element.firstChild).toHaveClass('loader');
  });
});
