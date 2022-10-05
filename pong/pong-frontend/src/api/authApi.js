export const postGoogleLogin = async (email, name) => {
  const payload = {
    email,
    name,
  };

  try {
    await fetch(process.env.REACT_APP_SERVER_URL + "/auth/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    alert("로그인 되지 않았습니다. 다시 시도해 주세요.");
  }
};

export const postGoogleLogout = async () => {
  try {
    await fetch(process.env.REACT_APP_SERVER_URL + "/auth/logout", {
      credentials: "include",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    alert("로그아웃 되지 않았습니다. 다시 시도해 주세요.");
  }
};
