import React from 'react';
import { mount } from 'enzyme';
import Profile from '../Profile';

describe('<Profile /> component', () => {
  const userProfile = {
    favoriteArtists: [{
      _id: 'some id',
      thumbnail: {
        height: 200,
        url: 'some url',
        width: 200
      },
      names: ['name1', 'name2'],
      genres: ['genre1'],
      tracks: ['track1', 'track2'],
      liked_by: ['user1']
    }],
    favoriteTracks: [{
      _id: 'some track id',
      title: ['title'],
      album_type: 'single',
      thumbnail: {
        height: 200,
        url: 'some track url',
        width: 200
      },
      release_date: '2010-01-01',
      artist: {
        names: ['some name']
      },
      audio_url: 'some url'
    }],
    username: 'test',
    email: 'test@test.com',
    thumbnailUrl: 'some url',
    playLog: []
  }
  it('should render profile page', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Profile userId='userId' userProfile={userProfile} requestData={mockFn} />);

    const userInfo = wrapper.find('.user-info');
    expect(userInfo.exists()).toEqual(true);
    expect(userInfo.contains(<h1>username: test</h1>)).toBe(true);
    expect(userInfo.contains(<h1>email: test@test.com</h1>)).toBe(true);
    expect(userInfo.contains(<h3>Total Score: 0 points</h3>)).toBe(true);

    const cardWrapper = wrapper.find('.card-wrapper');
    expect(cardWrapper).toHaveLength(2);
    expect(cardWrapper.at(0).contains(<h2>Favorite Artists</h2>));
    expect(cardWrapper.at(1).contains(<h2>Favorite Tracks</h2>));
  });
});
