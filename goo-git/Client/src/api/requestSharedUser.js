import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { GET } from '../constants/httpMethods';

export default async function requestSharedUsers(currentUser, currentNote) {
  const userId = currentUser._id;
  const noteId = currentNote.parent;

  let response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${userId}/branches/${noteId}/share/users`,
    {
      method: GET,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
      },
    }
  );

  response = await response.json();

  if (response.result === 'not exist') {
    alert(`${response.message}`);

    return;
  }

  return response.data;
}
