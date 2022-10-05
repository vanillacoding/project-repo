import React from 'react';
import { connect } from 'react-redux';
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import getEnvVars from '../environment';
import {
  fetchUserData,
  fetchUserReports,
  fetchAllUserReports,
  fetchApprovalRequests,
  fetchUserTemplates,
  fetchTemplates,
  refreshUserReports,
  refreshRequests,
  addNewReport,
  addNewTemplate,
  deleteReport,
  clearData,
} from '../actions';
import { getDate, getTime } from '../utils';

const { API_URL, FACEBOOK_APP_ID } = getEnvVars();

const getAccessToken = async() => await SecureStore.getItemAsync('ACCESS_TOKEN');
const getUserId = async() => await SecureStore.getItemAsync('USER_ID');

const dispatchFacebookData = dispatch => async() => {
  try {
    await Facebook.initializeAsync(FACEBOOK_APP_ID);

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FACEBOOK_APP_ID,
      { permissions: ['public_profile', 'email'] }
    );

    if (type !== 'success') return;

    const FBres = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture.type(large)`);
    const { name, email, picture } = await FBres.json();
    const profilePhoto = picture.data.url;

    const res = await fetch(`${API_URL}/api/auth/authenticate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name, profilePhoto })
    });

    const { user_id, access_token } = await res.json();

    await SecureStore.setItemAsync('ACCESS_TOKEN', access_token);
    await SecureStore.setItemAsync('USER_ID', user_id);

    Alert.alert('로그인', `안녕하세요, ${name} 부장님`);
    return;
  } catch(err) {
    Alert.alert('로그인 에러', err.message);
    console.log(err);
  }
};

const dispatchLogout = dispatch => async() => {
  try {
    await dispatch(clearData());
    await SecureStore.deleteItemAsync('ACCESS_TOKEN');
    await SecureStore.deleteItemAsync('USER_ID');

    return;
  } catch(err) {
    Alert.alert('로그아웃 에러', err.message);
    console.log(err);
  }
};

const dispatchUserData = dispatch => async() => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();

    const res = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { userData } = await res.json();

    dispatch(fetchUserData(userData));
  } catch(err) {
    Alert.alert('사용자 정보 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchUserReports = dispatch => async(pageNumber, numOfNewReport) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const query = `page?page_number=${pageNumber}&page_size=2&skip_page=${numOfNewReport}`;

    const api = `${API_URL}/api/users/${userId}/reports/${query}`;

    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { reports } = await res.json();

    if (reports.length) {
      dispatch(fetchUserReports(reports));
    }

    return reports;
  } catch(err) {
    Alert.alert('보고서 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchUserAllReports = dispatch => async() => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();

    const api = `${API_URL}/api/users/${userId}/reports`

    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { reports } = await res.json();

    dispatch(fetchAllUserReports(reports));
    return;
  } catch(err) {
    Alert.alert('보고서 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchApprovalRequests = dispatch => async(pageNumber) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const query = `page?page_number=${pageNumber}&page_size=2`;

    const api = `${API_URL}/api/users/${userId}/reports/requests/${query}`;

    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { reports } = await res.json();

    if (reports.length) {
      dispatch(fetchApprovalRequests(reports));
    }

    return reports;
  } catch(err) {
    Alert.alert('보고서 로딩 에러', err.message);
    console.log(err);
  }
}

const dispatchTemplates = dispatch => async() => {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(`${API_URL}/api/templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { templates } = await res.json();

    dispatch(fetchTemplates(templates));
  } catch(err) {
    Alert.alert('템플릿 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchTemplateAdd = dispatch => async(templateId, price) => {
  try {
    const accessToken = await getAccessToken()
    const userId = await getUserId();

    const res = await fetch(`${API_URL}/api/users/${userId}/templates`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ templateId, price })
    });

    const { newTemplate } = res.json();

    dispatch(addNewTemplate(newTemplate));
  } catch(err) {
    Alert.alert('템플릿 구입 에러', err.message);
    console.log(err);
  }
};

const dispatchUserTemplates = dispatch => async() => {
  try {
    const accessToken = await getAccessToken()
    const userId = await getUserId();

    const res = await fetch(`${API_URL}/api/users/${userId}/templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { templates } = await res.json();

    dispatch(fetchUserTemplates(templates));
  } catch(err) {
    Alert.alert('보고서 템플릿 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchReportSubmit = dispatch => async(title, text, reportUri, templateId) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const data = new FormData();

    data.append('photo', reportUri);
    data.append('title', title);
    data.append('text', text);
    data.append('templateId', templateId);
    data.append('date', new Date().toISOString());

    const res = await fetch(`${API_URL}/api/users/${userId}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      body: data
    });

    const { newReport } = await res.json();

    dispatch(addNewReport(newReport));
  } catch(err) {
    Alert.alert('보고서 제출 에러', err.message);
    console.log(err);
  }
};

const dispatchUserSearch = dispatch => async(email) => {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(`${API_URL}/api/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { userData } = await res.json();
    return userData;
  } catch(err) {
    console.log(err);
  }
};

const dispatchRefreshReports = dispatch => async(pageNumber) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const query = `page?page_number=${pageNumber}&page_size=2&skip_page=0`;

    const api = `${API_URL}/api/users/${userId}/reports/${query}`;

    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { reports } = await res.json();

    if (reports.length) {
      dispatch(refreshUserReports(reports));
    }

    return reports;
  } catch(err) {
    console.log(err);
  }
};

const dispatchRefreshRequests = dispatch => async(pageNumber) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const query = `page?page_number=${pageNumber}&page_size=2`;

    const api = `${API_URL}/api/users/${userId}/reports/requests/${query}`;

    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { reports } = await res.json();

    if (reports.length) {
      dispatch(refreshRequests(reports));
    }

    return reports;
  } catch(err) {
    console.log(err);
  }
};

const dispatchApprovalRequest = dispatch => async(userId, reportId) => {
  try {
    const accessToken = await getAccessToken();

    await fetch(`${API_URL}/api/users/${userId}/reports/${reportId}/request`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
  } catch(err) {
    Alert.alert('승인 요청 에러', err.message);
    console.log(err);
  }
};

const dispatchApprovalConfirm = dispatch => async(reportId) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();

    await fetch(`${API_URL}/api/users/${userId}/reports/${reportId}/confirm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
  } catch(err) {
    Alert.alert('보고서 승인 에러', err.message);
    console.log(err);
  }
};

const dispatchDeleteReport = dispatch => async(reportId) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();

    await fetch(`${API_URL}/api/users/${userId}/reports/${reportId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    dispatch(deleteReport(reportId));
  } catch(err) {
    Alert.alert('보고서 삭제 에러', err.message);
    console.log(err);
  }
};

const reportsDateMark = userReports => {
  const dates = userReports.map(report => getDate(report.created_at));

  return dates.reduce((acc, date) => {
    acc[date] = { marked: true };
    return acc;
  }, {});
};

const reportsCalendarItem = userReports => {
  return userReports.reduce((acc, report) => {
    const date = getDate(report.created_at);
    const time = getTime(report.created_at);
    const data = {
      title: report.title,
      body: `${report.body.slice(0, 25)}...`,
      time: time
    };

    acc[date]
      ? acc[date].push(data)
      : acc[date] = [data];
    return acc;
  }, {});
};

const mapStateToProps = state => ({
  userData: state.userData,
  userReports: state.userReports,
  userAllReports: state.userAllReports,
  approvalRequests: state.approvalRequests,
  reportsDateMark: reportsDateMark(state.userAllReports),
  reportsCalendarItem: reportsCalendarItem(state.userAllReports),
  profilePhoto: state.profilePhoto,
  userTemplates: state. userTemplates,
  templates: state.templates,
  numOfNewReport: state.numOfNewReport,
});

const mapDispatchToProps = dispatch => ({
  fetchFacebookData: dispatchFacebookData(dispatch),
  fetchUserData: dispatchUserData(dispatch),
  fetchUserReports: dispatchUserReports(dispatch),
  fetchUserAllReports: dispatchUserAllReports(dispatch),
  fetchApprovalRequests: dispatchApprovalRequests(dispatch),
  fetchTemplates: dispatchTemplates(dispatch),
  fetchUserTemplates: dispatchUserTemplates(dispatch),
  onTemplateAdd: dispatchTemplateAdd(dispatch),
  onReportSubmit: dispatchReportSubmit(dispatch),
  onUserSearch: dispatchUserSearch(dispatch),
  onRefreshReports: dispatchRefreshReports(dispatch),
  onRefreshRequests: dispatchRefreshRequests(dispatch),
  onApprovalRequest: dispatchApprovalRequest(dispatch),
  onApprovalConfirm: dispatchApprovalConfirm(dispatch),
  onDeleteReport: dispatchDeleteReport(dispatch),
  onUserLogout: dispatchLogout(dispatch)
});

const AppContainer = props => {
  return <AppNavigator screenProps={props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
