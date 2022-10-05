import user from './user';

const action = {
  type: 'SET_USER_DATA',
  user: {
    id: 'qwertyuiopasdfghjklzxcvbnm',
    email: 'test@gmail.com',
    picture: 'https://picture.com/photos/1',
    name: 'test user'
  }
};

describe('User reducer', () => {
  it('Should return the user information entered', () => {
    expect(user({}, action)).toEqual(action.user);
  });
});
