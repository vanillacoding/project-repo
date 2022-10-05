/**
 * function to fetch data to server and verify response
 * @param {string} method - POST, GET, PUT, PATCH, DELETE
 * @param {string} url - parameters of server end-point
 * @param {any} data - for sending to server
 * @returns response or throw error
 */
async function fetchData(method, url, data) {
  try {
    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    response = await response.json();

    if (response.ok) {
      return response.data;
    }

    throw new Error(response.error.message);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default fetchData;
