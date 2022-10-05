export const urlHelper = (value = "") => {
  return `${process.env.REACT_APP_USER_SERVER}/${value}`;
};

export const defaultOptionHelper = (method) => ({
  method,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
