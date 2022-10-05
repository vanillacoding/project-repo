import { createAction, createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { readProblemAPI, IProblem } from '../lib/api/problems';
import { RootState } from './index';

const CHANGE_USER_CODE = 'problem/CHANGE_USER_CODE';
const INITIALIZE_PROBLEM = 'problem/INITIALIZE_PROBLEM';

const READ_PROBLEM_REQUEST = 'problem/READ_PROBLEM_REQUEST';
const READ_PROBLEM_SUCCESS = 'problem/READ_PROBLEM_SUCCESS';
const READ_PROBLEM_FAILURE = 'problem/READ_PROBLEM_FAILURE';

export const changeUserCode = createAction(CHANGE_USER_CODE)<string>();
export const initializeProblem = createAction(INITIALIZE_PROBLEM)();

const readProblemAsync = createAsyncAction(
  READ_PROBLEM_REQUEST,
  READ_PROBLEM_SUCCESS,
  READ_PROBLEM_FAILURE
)<undefined, IProblem, AxiosError>();

export const readProblemThunk = (id?: string): ThunkAction<void, RootState, null, ProblemAction> => async dispatch => {
  const { request, success, failure } = readProblemAsync;

  dispatch(request());
  try {
    const { data: problem } = await readProblemAPI(id);
    dispatch(success(problem));
  } catch (e) {
    dispatch(failure(e));
  }
};

const actions = { changeUserCode, initializeProblem, readProblemAsync };
type ProblemAction = ActionType<typeof actions>;

type ProblemState = {
  problem: IProblem | null;
  userCode: string;
  error: AxiosError | null;
  isLoading: boolean;
};

export const initialState: ProblemState = {
  problem: null,
  userCode: '',
  error: null,
  isLoading: false
};

const problem = createReducer<ProblemState, ProblemAction>(initialState, {
  [CHANGE_USER_CODE]: (state, { payload: value }) => ({
    ...state,
    userCode: value
  }),
  [INITIALIZE_PROBLEM]: () => initialState,
  [READ_PROBLEM_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [READ_PROBLEM_SUCCESS]: (state, { payload: problem }) => ({
    ...state,
    problem,
    userCode: problem.initial_code,
    error: null,
    isLoading: false
  }),
  [READ_PROBLEM_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    isLoading: false
  })
});

export default problem;
