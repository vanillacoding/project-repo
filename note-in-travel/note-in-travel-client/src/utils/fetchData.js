import { API_SERVER_URL } from "@env";

import generateHeader from "./generateHeader";

/**
 * fetch data to server and verify response
 * @param {string} method - POST, PUT, PATCH, GET, DELETE
 * @param {string} url - path after api server url
 * @param {any} data - pass to body
 * @returns response from api server
 */
async function fetchData(method, url, data) {
  try {
    const serverUrl = API_SERVER_URL + url;
    const headers = await generateHeader();
    let response = await fetch(serverUrl, {
      method,
      headers,
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
