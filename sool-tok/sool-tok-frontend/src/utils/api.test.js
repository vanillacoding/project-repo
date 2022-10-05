import axios from 'axios';

import { userService } from './api';

const FAKE_URL = 'http://fakeUrl';
const FAKE_TOKEN = 'fakeToken';

jest.mock('axios', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    defaults: {
      baseURL: FAKE_URL,
    },
  };
});

beforeEach(() => {
  localStorage.setItem('jwt-token', FAKE_TOKEN);
});

describe('api call test', () => {
  it('get method should call fetch login with token', async () => {
    const USER = 'fakeUser';
    const TOKEN_DATA = { token: FAKE_TOKEN };

    axios.post.mockImplementation(input => ({
      data: {
        user: USER,
      },
    }));

    await userService.tokenLogin();

    expect(axios.post.mock.calls[0][0]).toEqual('/users/login/token');
    expect(axios.post.mock.calls[0][1]).toEqual(TOKEN_DATA);

    return;
  });

  it('post method should call when user logout', async () => {
    const USER_ID = 'userId';
    const USER_DATA = 'fakeUser';

    axios.post.mockImplementation(input => ({
      data: {
        user: USER_DATA,
      },
    }));

    await userService.logout(USER_ID);

    expect(axios.post.mock.calls[0][0]).toEqual(`/users/${USER_ID}/logout`);
    expect(axios.post.mock.calls[0][1]).toEqual(null);
    expect(axios.post.mock.calls[0][2].headers['jwt-token']).toEqual(FAKE_TOKEN);

    return;
  });

  it('get method should call fetch friend list with path', async () => {
    const USER_ID = 'userId';
    const FRIEND_LIST = ['1', '2'];

    axios.get.mockImplementation(input => ({
      data: {
        friendList: FRIEND_LIST,
      },
    }));

    await userService.getFriendList(USER_ID);

    expect(axios.get.mock.calls[0][0]).toEqual(`/users/${USER_ID}/friends`);
    expect(axios.get.mock.calls[0][1].headers['jwt-token']).toEqual(FAKE_TOKEN);

    return;
  });

  it('get method should call fetch friend request list with path', async () => {
    const USER_ID = 'userId';
    const FRIEND_LIST = ['1', '2'];

    axios.get.mockImplementation(input => ({
      data: {
        friendRequestList: FRIEND_LIST,
      },
    }));

    await userService.getFriendRequestList(USER_ID);

    expect(axios.get.mock.calls[0][0]).toEqual(`/users/${USER_ID}/friends/request`);
    expect(axios.get.mock.calls[0][1].headers['jwt-token']).toEqual(FAKE_TOKEN);

    return;
  });

  it('post method should call fetch with path', async () => {
    const USER_ID = 'userId';
    const MESSAGE = 'message';
    const FRIEND_EMAIL = 'friendEmail';
    const EMAIL_DATA = { email: FRIEND_EMAIL };

    axios.post.mockImplementation(input => ({
      email: FRIEND_EMAIL,
      data: {
        message: MESSAGE,
      },
    }));

    await userService.requestFriend(USER_ID, FRIEND_EMAIL);

    expect(axios.post.mock.calls[0][0]).toEqual(`/users/${USER_ID}/friends/request`);
    expect(axios.post.mock.calls[0][1]).toEqual(EMAIL_DATA);
    expect(axios.post.mock.calls[0][2].headers['jwt-token']).toEqual(FAKE_TOKEN);

    return;
  });

  it('put method should call fetch with path and body', async () => {
    const TARGET_EMAIL = 'targetEmail';
    const USER_ID = 'userId';
    const IS_ACCEPTED = true;
    const FRIEND_REQUEST_LIST = ['1', '2'];
    const FAKE_BODY = { isAccepted: IS_ACCEPTED, target_user_id: TARGET_EMAIL };

    axios.put.mockImplementation(input => ({
      data: {
        friendRequestList: FRIEND_REQUEST_LIST,
      },
    }));

    await userService.responseFriendRequest(USER_ID, IS_ACCEPTED, TARGET_EMAIL);

    expect(axios.put.mock.calls[0][0]).toEqual(`/users/${USER_ID}/friends/request`);
    expect(axios.put.mock.calls[0][1]).toEqual(FAKE_BODY);
    expect(axios.put.mock.calls[0][2].headers['jwt-token']).toEqual(FAKE_TOKEN);

    return;
  });
});
