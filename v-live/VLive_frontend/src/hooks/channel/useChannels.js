import useSWR from 'swr';
import { API } from '../../constants/api';

import { getRequest } from '../../../remote/remotes';

async function fetcher() {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const response = await getRequest(`${API.URL}/channel`, user);
    const { data: channels } = await response.json();

    return channels;
  } catch (err) {
    return err;
  }
}

export default function useChannels() {
  const { data: channels, error, mutate } = useSWR('/channel', fetcher);
  const historyChannels = [];
  const activeChannels = [];

  channels?.forEach((channel) => {
    channel.isActive
      ? activeChannels.push(channel)
      : historyChannels.push(channel);
  });

  return { historyChannels, activeChannels, error, mutate };
}
