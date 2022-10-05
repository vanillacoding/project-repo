// TODO: if not using react-query, delete it.
import { useQuery } from 'react-query';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

async function login(userData) {
  const data = await fetch(`${SERVER_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: userData.email,
      name: userData.displayName,
      photoURL: userData.photoURL,
    }),
  });

  return data.json();
}

export default function useLogin(userData) {
  return useQuery('user', () => login(userData));
}
