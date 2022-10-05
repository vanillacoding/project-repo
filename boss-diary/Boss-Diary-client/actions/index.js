import * as actionType from '../constants/actionType';

export const fetchUserData = userData => ({
  type: actionType.FETCH_USER_DATA,
  userData,
  profilePhoto: userData.profile_photo,
});

export const fetchUserReports = reports => ({
  type: actionType.FETCH_USER_REPORTS,
  reports
});

export const fetchAllUserReports = reports => ({
  type: actionType.FETCH_USER_ALL_REPORTS,
  reports
});

export const fetchApprovalRequests = reports => ({
  type: actionType.FETCH_APPROVAL_REQUESTS,
  reports
});

export const fetchUserTemplates = templates => ({
  type: actionType.FETCH_USER_TEMPLATES,
  templates
});

export const fetchTemplates = templates => ({
  type: actionType.FETCH_TEMPLATES,
  templates
});

export const addNewReport = newReport => ({
  type: actionType.ADD_NEW_REPORT,
  newReport
});

export const addNewTemplate = newTemplate => ({
  type: actionType.ADD_NEW_TEMPLATE,
  newTemplate
});

export const refreshUserReports = reports => ({
  type: actionType.REFRESH_REPORTS,
  reports
});

export const refreshRequests = reports => ({
  type: actionType.REFRESH_REQUESTS,
  reports
});

export const deleteReport = reportId => ({
  type: actionType.DELETE_REPORT,
  reportId
});

export const clearData = () => ({
  type: actionType.CLEAR_DATA
});
