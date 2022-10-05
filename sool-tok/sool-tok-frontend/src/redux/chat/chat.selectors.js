import { createSelector } from 'reselect';

export const selectChat = state => state.chat;

export const selectChatList = createSelector(
  selectChat,
  chat => chat.chatList,
);

export const selectUnreadCount = createSelector(
  selectChat,
  chat => chat.unreadCount,
);
