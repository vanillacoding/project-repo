export const shuffleOrder = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateRandomCode = () => {
  return Math.random().toString(36).substring(7);
};

export const generateRandomEnemy = () => {};
