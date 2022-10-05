import useSWR from 'swr';
import { API } from '../../constants/api';

import { getRequest } from '../../../remote/remotes';

async function fetcher(channelId) {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const response = await getRequest(`${API.URL}/channel/${channelId}`, user);
    const { data: channel } = await response.json();

    return channel;
  } catch (err) {
    alert(err.message);
  }
}

export default function useChannel(channelId) {
  const {
    data: channel,
    error,
    mutate,
  } = useSWR(channelId ? `/channel/${channelId}` : null, () => {
    return fetcher(channelId);
  });

  return { channel, error, mutate };
}
