import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { PUT } from '../constants/httpMethods';
import { OK } from '../constants/responseResults';

export default async function updatePermission(currentUser, currentNote, sharedUserEmail, newPermission) {
  let response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/branches/${currentNote.parent}/permission`, {
    method: PUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
    },
    body: JSON.stringify({ newPermission, sharedUserEmail })
  });

  response = await response.json(response);

  if (response.result === OK) {
    alert('권한을 수정했습니다.');
  }

  return [response.data];
}
