import { createAction, createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { AxiosError, AxiosResponse } from 'axios';
import { readProblemsAPI, IProblem } from '../lib/api/problems';
import { RootState } from './index';

const INITIALIZE_PROBLEMS = 'problems/INITIALIZE_PROBLEMS';

const READ_PROBLEMS_REQUEST = 'problems/READ_PROBLEMS_REQUEST';
const READ_PROBLEMS_SUCCESS = 'problems/READ_PROBLEMS_SUCCESS';
const READ_PROBLEMS_FAILURE = 'problems/READ_PROBLEMS_FAILURE';

export const initializeProblems = createAction(INITIALIZE_PROBLEMS)();

const readProblemsAsync = createAsyncAction(
  READ_PROBLEMS_REQUEST,
  READ_PROBLEMS_SUCCESS,
  READ_PROBLEMS_FAILURE
)<undefined, AxiosResponse<IProblem[]>, AxiosError>();

export const readProblemsThunk = (queryString: { page?: string, level?: string }): ThunkAction<void, RootState, null, ProblemsAction> => async dispatch => {
  const { request, success, failure } = readProblemsAsync;

  dispatch(request());
  try {
    const data = await readProblemsAPI(queryString);
    dispatch(success(data));
  } catch (e) {
    dispatch(failure(e));
  }
};

const actions = { initializeProblems, readProblemsAsync };
type ProblemsAction = ActionType<typeof actions>;

type ProblemsState = {
  problems: IProblem[] | null;
  lastPage: number;
  error: AxiosError | null;
  isLoading: boolean;
};

export const initialState: ProblemsState = {
  problems: null,
  lastPage: 0,
  error: null,
  isLoading: false
};

const problems = createReducer<ProblemsState, ProblemsAction>(initialState, {
  [INITIALIZE_PROBLEMS]: () => initialState,
  [READ_PROBLEMS_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [READ_PROBLEMS_SUCCESS]: (state, { payload: { data: problems, headers } }) => ({
    ...state,
    problems,
    error: null,
    isLoading: false,
    lastPage: Number(headers['last-page'])
  }),
  [READ_PROBLEMS_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    isLoading: false
  })
});

export default problems;
