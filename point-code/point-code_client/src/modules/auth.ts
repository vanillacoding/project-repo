import { createAction, createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { signupAPI, loginAPI, loadUserAPI, logoutAPI, ISignupForm, ILoginForm, IUser } from '../lib/api/auth';
import { RootState } from './index';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const SET_USER = 'auth/SET_USER';
const LOGOUT = 'auth/LOGOUT';

const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const LOAD_USER_REQUEST = 'auth/LOAD_USER_REQUEST';
const LOAD_USER_SUCCESS = 'auth/LOAD_USER_SUCCESS';
const LOAD_USER_FAILURE = 'auth/LOAD_USER_FAILURE';

export const changeField = createAction(CHANGE_FIELD)<{ form: 'login' | 'signup'; key: string; value: string; }>();
export const initializeForm = createAction(INITIALIZE_FORM)<'login' | 'signup'>();
export const setUser = createAction(SET_USER)<IUser>();
export const logout = createAction(LOGOUT)();

const signupAsync = createAsyncAction(
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
)<undefined, IUser, AxiosError>();

const loginAsync = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<undefined, IUser, AxiosError>();

const loadUserAsync = createAsyncAction(
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
)<undefined, IUser, undefined>();

export const signupThunk = (form: ISignupForm): ThunkAction<void, RootState, null, AuthAction> => async dispatch => {
  const { request, success, failure } = signupAsync;

  dispatch(request());
  try {
    const { data: user } = await signupAPI(form);
    dispatch(success(user));
  } catch (e) {
    dispatch(failure(e));
  }
};

export const loginThunk = (form: ILoginForm): ThunkAction<void, RootState, null, AuthAction> => async dispatch => {
  const { request, success, failure } = loginAsync;

  dispatch(request());
  try {
    const { data: user } = await loginAPI(form);
    dispatch(success(user));
  } catch (e) {
    dispatch(failure(e));
  }
};

export const loadUserThunk = (): ThunkAction<void, RootState, null, AuthAction> => async dispatch => {
  const { request, success, failure } = loadUserAsync;

  dispatch(request());
  try {
    const { data: user } = await loadUserAPI();
    dispatch(success(user));
  } catch (e) {
    dispatch(failure());
  }
};

const actions = { changeField, initializeForm, setUser, logout, signupAsync, loginAsync, loadUserAsync };
export type AuthAction = ActionType<typeof actions>;

type AuthState = {
  signup: ISignupForm;
  login: ILoginForm;
  user: IUser | null;
  isLoading: boolean;
  error: AxiosError | null;
};

export const initialState: AuthState = {
  signup: {
    name: '',
    email: '',
    password: '',
    confirmation: ''
  },
  login: {
    email: '',
    password: ''
  },
  user: null,
  isLoading: false,
  error: null
};

const auth = createReducer<AuthState, AuthAction>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => ({
    ...state,
    [form]: {
      ...state[form],
      [key]: value
    }
  }),
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
    error: null
  }),
  [SET_USER]: (state, { payload: user }) => ({
    ...state,
    user
  }),
  [LOGOUT]: state => {
    logoutAPI();
    localStorage.removeItem('user');

    return {
      ...state,
      user: null
    };
  },
  [SIGNUP_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [SIGNUP_SUCCESS]: (state, { payload: user }) => ({
    ...state,
    isLoading: false,
    user,
    error: null
  }),
  [SIGNUP_FAILURE]: (state, { payload: error }) => ({
    ...state,
    isLoading: false,
    error
  }),
  [LOGIN_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [LOGIN_SUCCESS]: (state, { payload: user }) => ({
    ...state,
    isLoading: false,
    user,
    error: null
  }),
  [LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    isLoading: false,
    error
  }),
  [LOAD_USER_REQUEST]: state => ({
    ...state
  }),
  [LOAD_USER_SUCCESS]: (state, { payload: user }) => {
    localStorage.setItem('user', JSON.stringify(user).replace(/(?:\\[rn])+/g, ''));

    return {
      ...state,
      user
    };
  },
  [LOAD_USER_FAILURE]: state => {
    localStorage.removeItem('user');

    return {
      ...state,
      user: null
    };
  }
});

export default auth;
