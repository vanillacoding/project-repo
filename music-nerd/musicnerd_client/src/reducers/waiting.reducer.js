import {
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,
  JOIN_GAME_REQUEST,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILED,
  CLAER_CREATE_GAME_ERROR
} from '../constants/index';

const initialState = {
  gameId: '',
  gameList: [],
  loading: false,
  createGameLoading: false,
  getGameListError: null,
  createGameError: null,
  joinGameError: null
};

export const waitingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES_REQUEST:
      return {
        ...state,
        loading: true
      };

    case GET_GAMES_SUCCESS:
      return {
        ...state,
        gameList: action.gameList,
        loading: false,
        getGameListError: null
      };

    case GET_GAMES_FAILURE:
      return {
        ...state,
        gameList: [],
        loading: false,
        getGameListError: action.error
      };

      case CREATE_GAME_REQUEST:
        return {
          ...state,
          createGameLoading: true
        };

      case CREATE_GAME_SUCCESS:
        return {
          ...state,
          gameId: action.gameId,
          createGameLoading: false,
          createGameError: null
        };

      case CREATE_GAME_FAILED:
        return {
          ...state,
          createGameLoading: false,
          gameId: '',
          createGameError: action.error
        };

    case JOIN_GAME_REQUEST:
      return {
        ...state,
        loading: true
      };

    case JOIN_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        gameId: action.gameId,
        joinGameError: null
      };

    case JOIN_GAME_FAILED:
      return {
        ...state,
        loading: false,
        gameId: '',
        joinGameError: action.error
      };

    case CLAER_CREATE_GAME_ERROR:
      return {
        ...state,
        createGameError: null
      };

    default:
      return state;
  }
};
