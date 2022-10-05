import user from '../../../reducers/user';
import { LOG_IN_SUCCESS_USER, LOCATION_SUCCESS, UPDATE_USER_CATS } from '../../../constants';

describe('user reducer', () => {
  const initialState = {
    facebookId: null,
    name: null,
    location: null,
    cats: null,
  };

  const USER = {
    cats: [],
    facebookId: 'testeset',
    name: 'Harry Potter',
    location: [135, 333],
  };

  it('should handle LOG_IN_SUCCESS', () => {
    expect(user(initialState, {
        type: LOG_IN_SUCCESS_USER,
        user: {
          cats: [],
          facebookId: 'testeset',
          name: 'Harry Potter',
          location: [135, 333],
        },
      })
    ).toEqual(USER);
  });

  it('should handle LOCATION_SUCCESS', () => {
    expect(user(USER, {
      type: LOCATION_SUCCESS,
      location: [444, 444]
    })
    ).toEqual({
      cats: [],
      facebookId: 'testeset',
      name: 'Harry Potter',
      location: [444, 444],
    });
  });

  it('should handle UPDATE_USER_CATS', () => {
    expect(user(USER, {
      type: UPDATE_USER_CATS,
      cats: [{ name: '뭐하냥' }],
    })
    ).toEqual({
      cats: [{ name: '뭐하냥' }],
      facebookId: 'testeset',
      name: 'Harry Potter',
      location: [135, 333],
    });
  });
});
