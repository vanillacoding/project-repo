import reduecer from './index.js';
import * as actionTypes from '../constants/actionType';
import { statement } from '@babel/template';

const initialState = {
  userData: null,
  userReports: [],
  userAllReports: [],
  approvalRequests: [],
  profilePhoto: null,
  userTemplates: [],
  templates: [],
  numOfNewReport: 0
};

const mockUser = {
  name: 'yejinh',
  email: 'example@exmapl.com',
  profilePhoto: 'https://'
};

const mockReports = ['1', '2', '3'];

describe('Reducer', () => {
  it('should handle initial state', () => {
    expect(
      reduecer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle FETCH_USER_DATA', () => {
    expect(
      reduecer(initialState, {
        type: actionTypes.FETCH_USER_DATA,
        userData: mockUser,
        profilePhoto: mockUser.profilePhoto
      })
    ).toEqual({
      ...initialState,
      userData: mockUser,
      profilePhoto: mockUser.profilePhoto
    });
  });

  it('should handle FETCH_USER_REPORTS', () => {
    reduecer(initialState, {
      type: actionTypes.FETCH_USER_REPORTS,
      reports: mockReports
    });

    expect(
      reduecer(initialState, {
        type: actionTypes.FETCH_USER_REPORTS,
        reports: mockReports
      })
    ).toEqual({
      ...initialState,
      userReports: mockReports
    });
  });
});
