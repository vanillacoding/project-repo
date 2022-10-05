const checkCookie = (name) => {
  if (!name) {
    return;
  }

  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const cookieStorage = {};

  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    const value = parts.slice(1).join("=");
    const found = decodeURIComponent(parts[0]);

    cookieStorage[found] = value;

    if (name === found) {
      break;
    }
  }

  return !!cookieStorage[name];
};

export default checkCookie;
