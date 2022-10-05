const concatStrings = (...strs) => {
  if (!strs.length) {
    strs.push("");
  }

  return strs.reduce((concatedString, string) => {
    return String(concatedString).concat(" ", String(string));
  });
};

export default concatStrings;
