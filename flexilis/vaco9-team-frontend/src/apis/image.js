export async function fetchImageFile(data) {
  const url = `${process.env.REACT_APP_SERVER_URL}/uploads`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
    body: data,
  });

  return response;
}
