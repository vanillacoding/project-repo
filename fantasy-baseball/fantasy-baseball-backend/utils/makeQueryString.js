const makeQueryString = (obj) => (
  `?${
    Object.entries(obj)
      .map((keyValue) => keyValue.join("="))
      .join("&")
  }`
);

module.exports = makeQueryString;
