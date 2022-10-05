import {
  reducer,
  signOut,
  initError,
  createError,
} from '../../features/userSlice';

describe('user slice test', () => {
  it('test sign out', () => {
    const prevState = {
      userId: 'test',
      username: 'test',
      email: 'test@test.com',
      isFetching: false,
      isSignedIn: false,
      isError: false,
      errorMessage: '',
    };
    const result = reducer(prevState, signOut());

    expect(result.userId).toEqual('');
    expect(result.username).toEqual('');
  });
  it('test error handling', () => {
    const prevState = {
      isError: false,
      errorMessage: ''
    };
    const errorMessage = 'test error';
    const result = reducer(prevState, createError(errorMessage));

    expect(result.errorMessage).toEqual(errorMessage);
    expect(result.isError).toEqual(true);

    const initialized = reducer(result, initError());

    expect(initialized.errorMessage).toEqual('');
    expect(initialized.isError).toEqual(false);
  });
});
