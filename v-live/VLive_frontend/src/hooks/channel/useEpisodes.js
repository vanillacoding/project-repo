import useSWR from 'swr';
import { API } from '../../constants/api';

import { getRequest } from '../../../remote/remotes';

async function fetcher() {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const response = await getRequest(`${API.URL}/episode`, user);
    const { data: episodes } = await response.json();

    return episodes;
  } catch (err) {
    return err;
  }
}

export default function useGetEpisodes() {
  const { data: episodes, error } = useSWR('/episode', fetcher);

  return { episodes, error };
}
