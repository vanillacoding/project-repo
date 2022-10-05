export async function fetchCampaigns() {
  const url = `${process.env.REACT_APP_SERVER_URL}/campaign`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
  });

  return response;
}

export async function fetchNewCampaign(data) {
  const url = `${process.env.REACT_APP_SERVER_URL}/campaign`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function fetchEstimate(data) {
  const url = `${process.env.REACT_APP_SERVER_URL}/campaign/estimate`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(data),
  });

  return response;
}
