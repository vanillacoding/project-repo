import {
  UPDATE_GAME_HOST,
  UPDATE_PLAYERS_AND_READY_STATUS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES,
  UPDATE_GAME_STATUS,
  UPDATE_CURRENT_TRACK,
  UPDATE_SCORE_AND_PLAYLOG,
  UPDATE_PLAYLOG,
  UPDATE_GAMESTATE_TO_END,
  RESET_GAME_STATE
} from '../constants/index';

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

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAME_HOST:
      return {
        ...state,
        gameHost: action.gameHost
      };

    case UPDATE_PLAYERS_AND_READY_STATUS:
      return {
        ...state,
        players: action.players,
        readyStatus: action.readyStatus
      };

    case UPDATE_READY_STATUS:
      return {
        ...state,
        readyStatus: action.readyStatus
      };

    case UPDATE_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: [ ...state.chatMessages, action.message ]
      };

    case UPDATE_GAME_STATUS:
      return {
        ...state,
        isGameReady: true
      };

    case UPDATE_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.currentTrack
      };

    case UPDATE_SCORE_AND_PLAYLOG:
      const updatedScore = state.score[action.message.username] ?
        state.score[action.message.username] + 10 : 10;

      return {
        ...state,
        score: { ...state.score, [action.message.username]: updatedScore },
        chatMessages: [ ...state.chatMessages, action.message ],
        playLog: [ ...state.playLog, action.message.username ]
      };

    case UPDATE_PLAYLOG:
      return {
        ...state,
        playLog: [ ...state.playLog, null ]
      };

    case UPDATE_GAMESTATE_TO_END:
      return {
        ...state,
        isGameEnded: true
      };

    case RESET_GAME_STATE:
      return {
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

    default:
      return state;
  }
};
