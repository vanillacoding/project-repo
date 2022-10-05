import types from './chat.actionTypes';

export const addChat = chat => ({
  type: types.ADD_CHAT,
  payload: { chat },
});

export const resetChat = () => ({
  type: types.RESET_CHAT,
});

export const increaseUnreadCount = () => ({
  type: types.INCREASE_UNREAD_COUNT,
});

export const resetUnreadCount = () => ({
  type: types.RESET_UNREAD_COUNT,
});
