export const TYPE = {
  onNative: 'ON_NATIVE',
  log: 'LOG',
  setUser: 'SET_USER',
  setGame: 'SET_GAME',
  updateGame: 'UPDATE_GAME',
  completeGame: 'COMPLETE_GAME',
};

export const emit = (type, payload) => {
  window.ReactNativeWebView &&
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
};

export const log = (payload) => {
  emit(TYPE.log, payload);
};
