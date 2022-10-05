import { GET } from '../constants/httpMethods';
import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { SKIP } from '../constants/stringsAndNumbers';

export default async function requestNoteList(currentUser, isPrivateMode, skip, keyword = '') {
  try {
    const fetchUrl = isPrivateMode
      ? `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/branches/private/?limit=${SKIP}&skip=${skip}&q=${keyword}`
      : `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/branches/?limit=${SKIP}&skip=${skip}&q=${keyword}`;

    let response = await fetch(fetchUrl, {
      method: GET,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
      }
    });

    response = await response.json();

    if (!response) return;

    if (response.result === 'no more branches') {
      return [];
    }
    return response.data;
  } catch (err) {
    alert(err);
  }
}
