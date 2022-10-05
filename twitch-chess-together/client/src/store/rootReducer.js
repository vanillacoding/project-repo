import { combineReducers } from 'redux';

import chatServerReducer from '../features/chatServer/slices';
import gameServerReducer from '../features/gameServer/slices';
import userReducer from '../features/user/slices';
import gameReducer from '../features/game/slices';
import loadingReducer from '../features/loading/slices';
import chessReducer from '../features/chess/slices';

const rootReducer = combineReducers({
  chatServer: chatServerReducer,
  gameServer: gameServerReducer,
  user: userReducer,
  game: gameReducer,
  loading: loadingReducer,
  chess: chessReducer,
});

export default rootReducer;
