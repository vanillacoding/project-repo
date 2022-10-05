export async function saveRegistrationData(data) {
  const url = `${process.env.REACT_APP_SERVER_URL}/auth/register/advertiser`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}
