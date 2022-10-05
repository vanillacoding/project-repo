const convertHTMLSpecialCharacters = (str) => {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export default convertHTMLSpecialCharacters;
