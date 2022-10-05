import React from 'react';
import { render } from '@testing-library/react';

import Preview from '../src/components/Main/Preview';

const episodes = [
  {
    _id: '6135b2b8e3f537719f72d05d',
    thumbnail: 'https://picsum.photos/200/300',
    title: '호박 고구마',
    videoUrl:
      'https://awwdwd.s3.ap-northeast-2.amazonaws.com/sweetpotato_video.mp4',
  },
  {
    _id: '6135b09d8a6125ac561aba9e',
    thumbnail: 'https://picsum.photos/200/300',
    title: '타짜',
    videoUrl:
      'https://awwdwd.s3.ap-northeast-2.amazonaws.com/sweetpotato_video.mp4',
  },
];

jest.mock('../src/hooks/channel/useEpisodes', () => ({
  __esModule: true,
  default: function () {
    return {
      episodes,
      error: null,
    };
  },
}));

describe('Preview', () => {
  it('renders Preview component', () => {
    const { getByText } = render(<Preview />);

    episodes.map((episode) => {
      expect(getByText(episode.title)).toBeInTheDocument();
    });
  });
});
