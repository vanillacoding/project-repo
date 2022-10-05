import { AxiosError } from 'axios';
import auth, { initialState, changeField, initializeForm, setUser, logout } from '../../modules/auth';
import { IUser } from '../../lib/api/auth';

describe('reducer <auth>', () => {
  const mockUser: IUser = {
    _id: '5e979d7646645630c470fbab',
    name: 'test',
    email: 'test@gmail.com',
    avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
    tried_submissions: [],
    solved_problems: [],
    total_point: 0
  };

  const mockError: AxiosError<any> = {
    message: 'Request failed with status code 500',
    name: 'Error',
    stack: 'Error: Request failed with status code 500 at createError',
    config: {},
    isAxiosError: true,
    toJSON: () => ({})
  };

  describe('should handle action', () => {
    it('case: CHANGE_FIELD', () => {
      expect(auth(initialState, changeField({ form: 'signup', key: 'name', value: 'hanul' }))).toEqual({
        ...initialState,
        signup: {
          ...initialState.signup,
          name: 'hanul'
        }
      });

      expect(auth(initialState, changeField({ form: 'login', key: 'email', value: 'hanul@gmail.com' }))).toEqual({
        ...initialState,
        login: {
          ...initialState.login,
          email: 'hanul@gmail.com'
        }
      });
    });

    it('case: INITIALIZE_FORM', () => {
      expect(auth(initialState, initializeForm('login'))).toEqual({
        ...initialState,
        login: {
          name: undefined,
          email: '',
          password: '',
          confirmation: undefined
        },
        error: null
      });

      expect(auth(initialState, initializeForm('signup'))).toEqual({
        ...initialState,
        signup: {
          name: '',
          email: '',
          password: '',
          confirmation: ''
        },
        error: null
      });
    });

    it('case: SET_USER', () => {
      expect(auth(initialState, setUser(mockUser))).toEqual({
        ...initialState,
        user: mockUser
      });
    });

    it('case: LOGOUT', () => {
      localStorage.setItem('user', 'test');
      expect(localStorage.__STORE__.user).toBe('test');
      expect(auth(initialState, logout())).toEqual({
        ...initialState,
        user: null
      });
      expect(localStorage.__STORE__.user).toBeUndefined();
    });

    it('case: SIGNUP_ASYNC', () => {
      expect(auth(initialState, { type: 'auth/SIGNUP_REQUEST' })).toEqual({
        ...initialState,
        isLoading: true
      });

      expect(auth(initialState, { type: 'auth/SIGNUP_SUCCESS', payload: mockUser })).toEqual({
        ...initialState,
        isLoading: false,
        user: mockUser,
        error: null
      });

      expect(auth(initialState, { type: 'auth/SIGNUP_FAILURE', payload: mockError })).toEqual({
        ...initialState,
        isLoading: false,
        error: mockError
      });
    });

    it('case: LOGIN_ASYNC', () => {
      expect(auth(initialState, { type: 'auth/LOGIN_REQUEST' })).toEqual({
        ...initialState,
        isLoading: true
      });

      expect(auth(initialState, { type: 'auth/LOGIN_SUCCESS', payload: mockUser })).toEqual({
        ...initialState,
        isLoading: false,
        user: mockUser,
        error: null
      });

      expect(auth(initialState, { type: 'auth/LOGIN_FAILURE', payload: mockError })).toEqual({
        ...initialState,
        isLoading: false,
        error: mockError
      });
    });

    it('case: LOAD_USER_ASYNC', () => {
      expect(auth(initialState, { type: 'auth/LOAD_USER_REQUEST' })).toEqual({
        ...initialState
      });

      expect(auth(initialState, { type: 'auth/LOAD_USER_SUCCESS', payload: mockUser })).toEqual({
        ...initialState,
        user: mockUser
      });
      expect(localStorage.__STORE__.user).toEqual(JSON.stringify(mockUser).replace(/(?:\\[rn])+/g, ''));

      expect(auth(initialState, { type: 'auth/LOAD_USER_FAILURE' })).toEqual({
        ...initialState,
        user: null
      });
      expect(localStorage.__STORE__.user).toBeUndefined();
    });
  });
});
