export const getUserData = async (data, setUsers) => {
  try {
    const res = await fetch(process.env.REACT_APP_SERVER_URL + "/users", {
      credentials: "include",
      method: "GET"
    });

    data = await res.json();
    setUsers(data);
  } catch(err) {
    alert("랭킹 정보를 가져오지 못했습니다.");
  }
};

export const updateWinnerScore = async (email) => {
  try {
    await fetch(process.env.REACT_APP_SERVER_URL + "/battle", {
      credentials: "include",
      method: "PATCH",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
  } catch(err) {
    alert("승점 업데이트가 되지 않았습니다.");
  }
};
