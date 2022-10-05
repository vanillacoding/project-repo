import { createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { confirmSolutionAPI, IResponseConfirmSolution, ISolution } from '../lib/api/problems';
import { toggle } from './modal';
import { RootState } from './index';

const CONFIRM_SOLUTION_REQUEST = 'solution/CONFIRM_SOLUTION_REQUEST';
const CONFIRM_SOLUTION_SUCCESS = 'solution/CONFIRM_SOLUTION_SUCCESS';
const CONFIRM_SOLUTION_FAILURE = 'solution/CONFIRM_SOLUTION_FAILURE';

const confirmSolutionAsync = createAsyncAction(
  CONFIRM_SOLUTION_REQUEST,
  CONFIRM_SOLUTION_SUCCESS,
  CONFIRM_SOLUTION_FAILURE
)<undefined, IResponseConfirmSolution, AxiosError>();

export const confirmSolutionThunk = (userCode: string, id: string): ThunkAction<void, RootState, null, SolutionAction> => async dispatch => {
  const { request, success, failure } = confirmSolutionAsync;

  dispatch(request());
  try {
    const { data } = await confirmSolutionAPI(userCode, id);
    dispatch(success(data));
  } catch (e) {
    dispatch(failure(e));
  } finally {
    dispatch(toggle());
  }
};

const actions = { confirmSolutionAsync, toggle };
type SolutionAction = ActionType<typeof actions>;

type SolutionState = {
  solution: ISolution | null,
  failureTestsIndex: number[],
  error: AxiosError | null;
  isLoading: boolean;
};

export const initialState: SolutionState = {
  solution: null,
  failureTestsIndex: [],
  error: null,
  isLoading: false
};

const solution = createReducer<SolutionState, SolutionAction>(initialState, {
  [CONFIRM_SOLUTION_REQUEST]: state => ({
    ...state,
    failureTestsIndex: [],
    isLoading: true
  }),
  [CONFIRM_SOLUTION_SUCCESS]: (state, { payload: { solution, failureTestsIndex } }) => ({
    ...state,
    solution,
    failureTestsIndex,
    error: null,
    isLoading: false
  }),
  [CONFIRM_SOLUTION_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    isLoading: false
  })
});

export default solution;
