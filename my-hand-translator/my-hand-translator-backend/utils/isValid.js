exports.url = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (error) {
    return false;
  }
};

exports.string = (text) => {
  return text && text.trim();
};

exports.ISOString = (isoString) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(isoString))
    return false;
  const d = new Date(isoString);
  return d.toISOString() === isoString;
};
