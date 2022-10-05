import { createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { readSolutionsAPI, IPopulatedSolution } from '../lib/api/problems';
import { RootState } from './index';

const READ_SOLUTIONS_REQUEST = 'solutions/READ_SOLUTIONS_REQUEST';
const READ_SOLUTIONS_SUCCESS = 'solutions/READ_SOLUTIONS_SUCCESS';
const READ_SOLUTIONS_FAILURE = 'solutions/READ_SOLUTIONS_FAILURE';

const readSolutionsAsync = createAsyncAction(
  READ_SOLUTIONS_REQUEST,
  READ_SOLUTIONS_SUCCESS,
  READ_SOLUTIONS_FAILURE
)<undefined, IPopulatedSolution[], AxiosError>();

export const readSolutionsThunk = (id?: string): ThunkAction<void, RootState, null, SolutionsAction> => async dispatch => {
  const { request, success, failure } = readSolutionsAsync;

  dispatch(request());
  try {
    const { data: solutions } = await readSolutionsAPI(id);
    dispatch(success(solutions));
  } catch (e) {
    dispatch(failure(e));
  }
};

const actions = { readSolutionsAsync };
type SolutionsAction = ActionType<typeof actions>;

type SolutionsState = {
  solutions: IPopulatedSolution[] | null,
  error: AxiosError | null;
  isLoading: boolean;
};

export const initialState: SolutionsState = {
  solutions: null,
  error: null,
  isLoading: false
};

const solutions = createReducer<SolutionsState, SolutionsAction>(initialState, {
  [READ_SOLUTIONS_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [READ_SOLUTIONS_SUCCESS]: (state, { payload: solutions }) => ({
    ...state,
    solutions,
    error: null,
    isLoading: false
  }),
  [READ_SOLUTIONS_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    isLoading: false
  })
});

export default solutions;
