import { userReducer } from '../user.reducer';
import * as actions from '../../constants/index';

const initialState = {
  userId: null,
  loading: false,
  error: null,
  artistList: [],
  selectedArtists: {},
  result: '',
  userProfile: {
    favoriteArtists: [],
    favoriteTracks: [],
    username: '',
    email: '',
    thumbnailUrl: '',
    playLog: []
  }
};

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });

  it('should fetch artist and selected artist info.', () => {
    const artistList = ['artist1', 'artist2', 'artist3'];
    const selectedArtists = { artist1: true, artist2: true };
    const getArtistAction = { type: actions.GET_ARTISTS_SUCCESS, artistList, selectedArtists };

    expect(userReducer(initialState, getArtistAction)).toEqual({
      userId: null,
      loading: false,
      error: null,
      artistList: ['artist1', 'artist2', 'artist3'],
      selectedArtists: { artist1: true, artist2: true },
      result: '',
      userProfile: {
        favoriteArtists: [],
        favoriteTracks: [],
        username: '',
        email: '',
        thumbnailUrl: '',
        playLog: []
      }
    });
  });

  it('should deselect favorite artist', () => {
    const initialState = {
      userId: null,
      loading: false,
      error: null,
      artistList: ['artist1', 'artist2', 'artist3', 'artist4'],
      selectedArtists: { artist1: true, artist2: true, artist3: true, artist4: true },
      result: '',
      userProfile: {
        favoriteArtists: [],
        favoriteTracks: [],
        username: '',
        email: '',
        thumbnailUrl: '',
        playLog: []
      }
    };

    const deselectArtistAction = { type: actions.DESELECT_FAVORITE_ARTIST, artistId: 'artist1' };

    expect(userReducer(initialState, deselectArtistAction)).toEqual({
      userId: null,
      loading: false,
      error: null,
      artistList: ['artist1', 'artist2', 'artist3', 'artist4'],
      selectedArtists: { artist2: true, artist3: true, artist4: true },
      result: '',
      userProfile: {
        favoriteArtists: [],
        favoriteTracks: [],
        username: '',
        email: '',
        thumbnailUrl: '',
        playLog: []
      }
    });
  });
});
