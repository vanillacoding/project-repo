import { user, initialState } from '../user';
import * as actions from '../../action/index';

describe('user reducer', () => {
  const userData = {
    choosenCategory: ['objectId'],
    bookmarks: ['objectId'],
    _id: 'objectId',
    email: 'mock_email',
    imageUrl: 'mock_image_url',
    name: 'Hyojeong Jang'
  }

  it('should return the initial state', () => {
    expect(user(initialState, {})).toEqual(initialState);
  });

  it('should handle RECEIVE_USER_DATA', () => {
    const receivedData = user(initialState, actions.receiveUserData(userData));

    expect(receivedData.imageUrl).toEqual(userData.imageUrl);
    expect(receivedData.email).toEqual(userData.email);
    expect(receivedData.name).toEqual(userData.name);
    expect(receivedData.choosenCategory).toEqual([userData.choosenCategory]);
    expect(receivedData.choosenCategory).toBeInstanceOf(Array);
    expect(receivedData.authorization).toEqual(true);
  });
});
