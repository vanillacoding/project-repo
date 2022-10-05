export const loadState = (key) => {
  const serializedState = localStorage.getItem(key);
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

export const saveState = (key, state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(key, serializedState);
};

export const clearState = () => {
  localStorage.clear();
};
