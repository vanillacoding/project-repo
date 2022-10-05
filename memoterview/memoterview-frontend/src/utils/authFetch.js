export default function authFetch(token) {
  const defaultOptions = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
  };

  return {
    get: (url, options = {}) =>
      fetch(url, { method: "GET", ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      fetch(url, data, { method: "POST", ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      fetch(url, data, { method: "PUT", ...defaultOptions, ...options }),
    delete: (url, data, options = {}) =>
      fetch(url, data, { method: "DELETE", ...defaultOptions, ...options }),
  };
}
