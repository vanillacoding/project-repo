import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { POST } from '../constants/httpMethods';
import { FAILURE } from '../constants/responseResults';

export default async function requestCreateBranch(currentUser) {
  let branchCreateResponse = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/branches/new`,
    {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
      },
    }
  );

  branchCreateResponse = await branchCreateResponse.json();

  if (branchCreateResponse.result === FAILURE) {
    alert('브랜치를 만들다가 문제가 생겼어요');

    return;
  }

  return branchCreateResponse;
}
