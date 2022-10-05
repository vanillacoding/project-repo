import { gameReducer } from '../game.reducer';
import * as actions from '../../constants/index';

const initialState = {
  gameHost: '',
  players: [],
  readyStatus: {},
  chatMessages: [],
  score: {},
  playLog: [],
  isGameReady: false,
  currentTrack: '',
  isGameEnded: false,
  loading: false,
  error: null
};

describe('game reducer', () => {
  it('should return initial state', () => {
    expect(gameReducer(initialState, {})).toEqual(initialState);
  });

  it('should update ready status when user ready', () => {
    const readyStatus = { dummyUser: true };
    const readyAction = { type: actions.UPDATE_READY_STATUS, readyStatus };

    expect(gameReducer(initialState, readyAction)).toEqual({
      gameHost: '',
      players: [],
      readyStatus: { dummyUser: true },
      chatMessages: [],
      score: {},
      playLog: [],
      isGameReady: false,
      currentTrack: '',
      isGameEnded: false,
      loading: false,
      error: null
    });
  });

  it('should update chat message when receives new message.', () => {
    const message = { username: 'dummy user', message: 'some dummy message' };
    const updateMessageAction = { type: actions.UPDATE_CHAT_MESSAGES, message };

    expect(gameReducer(initialState, updateMessageAction)).toEqual({
      gameHost: '',
      players: [],
      readyStatus: {},
      chatMessages: [{ username: 'dummy user', message: 'some dummy message' }],
      score: {},
      playLog: [],
      isGameReady: false,
      currentTrack: '',
      isGameEnded: false,
      loading: false,
      error: null
    });
  });

  it('should update current track', () => {
    const currentTrack = {
      _id: '5e93253811efad2323e18b93',
      title: ['beautiful', '뷰티풀'],
      spotify_track_id: '6mzF8HvHdVrzJNd8M1uFCS',
      album_type: 'single',
      thumbnail: {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b2733321fdb436c8c61308207658',
        width: 640
      },
      release_date: '2016-12-17',
      artist: '5e93253811efad2323e18b92',
      audio_url: 'https://musicnerd.s3.ap-northeast-2.amazonaws.com/tracks/1-01+Beautiful.mp3'
    };
    const updateCurrentTrackAction = { type: actions.UPDATE_CURRENT_TRACK, currentTrack };

    expect(gameReducer(initialState, updateCurrentTrackAction)).toEqual({
      gameHost: '',
      players: [],
      readyStatus: {},
      chatMessages: [],
      score: {},
      playLog: [],
      isGameReady: false,
      currentTrack: {
        _id: '5e93253811efad2323e18b93',
        title: ['beautiful', '뷰티풀'],
        spotify_track_id: '6mzF8HvHdVrzJNd8M1uFCS',
        album_type: 'single',
        thumbnail: {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2733321fdb436c8c61308207658',
          width: 640
        },
        release_date: '2016-12-17',
        artist: '5e93253811efad2323e18b92',
        audio_url: 'https://musicnerd.s3.ap-northeast-2.amazonaws.com/tracks/1-01+Beautiful.mp3'
      },
      isGameEnded: false,
      loading: false,
      error: null
    });
  });

  it('should update playLog and score', () => {
    const message = { username: 'dummy user', message: 'some dummy message' };
    const updatePlayLogAndScoreAction = { type: actions.UPDATE_SCORE_AND_PLAYLOG, message };

    expect(gameReducer(initialState, updatePlayLogAndScoreAction)).toEqual({
      gameHost: '',
      players: [],
      readyStatus: {},
      chatMessages: [{ username: 'dummy user', message: 'some dummy message' }],
      score: { 'dummy user': 10 },
      playLog: ['dummy user'],
      isGameReady: false,
      currentTrack: '',
      isGameEnded: false,
      loading: false,
      error: null
    });
  });

  it('should update final score when game ends', () => {
    const updateGameStateToEndAction = { type: actions.UPDATE_GAMESTATE_TO_END };

    expect(gameReducer(initialState, updateGameStateToEndAction)).toEqual({
      gameHost: '',
      players: [],
      readyStatus: {},
      chatMessages: [],
      score: {},
      playLog: [],
      isGameReady: false,
      currentTrack: '',
      isGameEnded: true,
      loading: false,
      error: null
    });
  });
});
