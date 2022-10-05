export const delay = time => {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
};
