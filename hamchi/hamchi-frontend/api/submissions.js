import { SERVER_URL } from '@env';
import { readCredentials } from './secureStore';

const requestGetMySubmissions = async (userId) => {
  const url = `${SERVER_URL}/submissions/${userId}`;
  const credentials = await readCredentials();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials.token
    }
  });

  return await response.json();
};

const requestCreateSubmission = async (submissionInput) => {
  const url = `${SERVER_URL}/submissions/new`;
  const credentials = await readCredentials();
  const body = JSON.stringify(submissionInput);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials.token
    },
    body: body
  });

  return await response.json();
};

const requestUpdateSubmissionStatus = async (submissionIds) => {
  const url = `${SERVER_URL}/submissions/status`;
  const credentials = await readCredentials();
  const body = JSON.stringify({ submissionIds });

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials.token
    },
    body: body
  });

  return await response.json();
};

const submissionAPI = {
  requestGetMySubmissions,
  requestCreateSubmission,
  requestUpdateSubmissionStatus
};

export default submissionAPI;
