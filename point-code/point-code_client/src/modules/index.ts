import { combineReducers } from 'redux';
import auth from './auth';
import problems from './problems';
import problem from './problem';
import solution from './solution';
import solutions from './solutions';
import modal from './modal';

const rootReducer = combineReducers({
  auth,
  problems,
  problem,
  solution,
  solutions,
  modal
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

