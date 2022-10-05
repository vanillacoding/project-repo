import * as actionTypes from '../constants/actionType';
import _ from 'lodash';

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

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.FETCH_USER_DATA:
    return {
      ...state,
      userData: action.userData,
      profilePhoto: action.profilePhoto
    };

  case actionTypes.FETCH_USER_REPORTS:
    return {
      ...state,
      userReports: state.userReports.concat(action.reports)
    };

  case actionTypes.FETCH_USER_ALL_REPORTS:
    return {
      ...state,
      userAllReports: action.reports
    };

  case actionTypes.FETCH_APPROVAL_REQUESTS:
    return {
      ...state,
      approvalRequests: state.approvalRequests.concat(action.reports)
    };

  case actionTypes.FETCH_USER_TEMPLATES:
    return {
      ...state,
      userTemplates: action.templates
    };

  case actionTypes.FETCH_TEMPLATES:
    return {
      ...state,
      templates: action.templates
    };

  case actionTypes.DELETE_REPORT:
    return {
      ...state,
      userReports: _.filter(state.userReports, report => report._id !== action.reportId),
      numOfNewReport: state.numOfNewReport - 1
    };

  case actionTypes.REFRESH_REPORTS:
    return {
      ...state,
      userReports: action.reports,
      numOfNewReport: 0
    };

  case actionTypes.REFRESH_REQUESTS:
    return {
      ...state,
      approvalRequests: action.reports
    };

  case actionTypes.ADD_NEW_REPORT:
    return {
      ...state,
      userReports: [ action.newReport, ...state.userReports ],
      numOfNewReport: state.numOfNewReport + 1
    };

  case actionTypes.ADD_NEW_TEMPLATE:
    return {
      ...state,
      userTemplates: [ actions.newTemplate, ...state.userTemplates ]
    };

  case actionTypes.CLEAR_DATA:
    return initialState;

  default:
    return state;
  }
}
