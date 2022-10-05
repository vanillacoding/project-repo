import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { GET } from '../constants/httpMethods';
import { FAILURE } from '../constants/responseResults';

export default async function requestBranchSharingInfo(userId, sharedUserInfoId) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/branch_sharing_infos/${sharedUserInfoId}`,
      {
        method: GET,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
        },
      }
    );

    response = await response.json();

    if (response.result === FAILURE) {
      alert('공유 정보를 불러오지 못했어요');

      return;
    }

    return response.branchSharingInfo;
  } catch (err) {
    throw err;
  }
}
