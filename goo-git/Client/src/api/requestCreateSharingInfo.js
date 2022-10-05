import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { POST } from '../constants/httpMethods';
import { OK, VALIDATION_ERR } from '../constants/responseResults';

export default async function requestCreateSharingInfo(currentUser, currentNote, sharingInfo) {
  const userId = currentUser._id;
  const noteId = currentNote.parent;

  let response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${userId}/branches/${noteId}/share/new`,
    {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
      },
      body: JSON.stringify({ sharingInfo })
    }
  );

  response = await response.json();

  if (response.result === VALIDATION_ERR) {
    alert(`${response.message}`);

    return;
  }

  if (response.result === OK) {
    alert('공유했습니다');

    return;
  }

  alert('공유하다가 문제가 생겼어요');
}

