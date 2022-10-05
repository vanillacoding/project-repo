import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { DELETE } from '../constants/httpMethods';

export default async function deletePermission(currentUser, currentNote, sharedUserEmail) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/branches/${currentNote.parent}/permission`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
    },
    body: JSON.stringify({ sharedUserEmail })
  });

  if (response.ok) {
    alert('권한을 삭제했습니다.');

    return;
  }
}
