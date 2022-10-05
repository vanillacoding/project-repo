import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';
import { GET } from '../constants/httpMethods';
import { FAILURE } from '../constants/responseResults';

export default async function requestNoteAuthor(userId, authorId) {
  let response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${userId}/users/${authorId}`,
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
    alert('수정한 이용자 정보를 불러오지 못했습니다');

    return;
  }

  return response.author.username;
}
