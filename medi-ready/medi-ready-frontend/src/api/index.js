export const getAuthCheck = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/check`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const postLogin = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const postLogout = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const getQueue = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/queue`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const getMedicine = async (medicine) => {
  const name = medicine.name;

  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/medicines/medicine?name=${name}`,
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
};

export const postPrescription = async (form) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/prescriptions/new`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(form),
  });

  return await response.json();
};

export const getPrescriptions = async (page) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/prescriptions?page=${page}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const getMedicineNames = async (keyword) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/medicines?search=${keyword}`,
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
};

export const updateSettings = async (form) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/settings/information`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  return await response.json();
};
