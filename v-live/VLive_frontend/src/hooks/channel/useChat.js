import useSWR from 'swr';
import { API } from '../../constants/api';

import { getRequest } from '../../../remote/remotes';

async function fetcher(channelId) {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const response = await getRequest(`${API.URL}/chat/${channelId}`, user);
    const { result, data, message } = await response.json();

    if (result === 'error') {
      throw new Error(message);
    }

    return data;
  } catch (err) {
    return err;
  }
}

export default function useChat(channelId) {
  const { data: chatList, mutate } = useSWR(
    channelId ? '/chat/channelId' : null,
    () => {
      return fetcher(channelId);
    },
  );

  return { chatList, mutate };
}
