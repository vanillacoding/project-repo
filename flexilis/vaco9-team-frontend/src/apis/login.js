export async function requestLoginToServer(loginInput) {
  const url = `${process.env.REACT_APP_SERVER_URL}/auth/login/advertiser`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(loginInput),
  });

  return response;
}
