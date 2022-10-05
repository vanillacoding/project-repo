import { SERVER_URL } from '@env';
import { readCredentials } from './secureStore';

const requestCreateChat = async (ownerId, guestId, message) => {
  const url = `${SERVER_URL}/chats/new`;
  const credentials = await readCredentials();
  const body = JSON.stringify({
    ownerId,
    guestId,
    message
  });

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

const requestGetChats = async (userId) => {
  const url = `${SERVER_URL}/chats/${userId}`;
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

const chatAPI = {
  requestCreateChat,
  requestGetChats
};

export default chatAPI;
