export async function fetchPaymentResult(data) {
  const url = `${process.env.REACT_APP_SERVER_URL}/payment/verify`;
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
