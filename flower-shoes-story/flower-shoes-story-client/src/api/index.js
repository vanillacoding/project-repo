export const postLogin = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const postLogout = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const getAuthCheck = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/check`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const updateUser = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/user/update`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const getEvents = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/event`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const updateEvent = async (event) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/event`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(event),
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const deleteUser = async (event) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/user/delete`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const getScore = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/score`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};
