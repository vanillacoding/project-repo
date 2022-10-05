import types from './chat.actionTypes';

const initialState = {
  chatList: [],
  unreadCount: 0,
};

const chatListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_CHAT:
      return {
        ...state,
        chatList: [...state.chatList, payload.chat],
      };
    case types.RESET_CHAT:
      return initialState;
    case types.INCREASE_UNREAD_COUNT:
      return {
        ...state,
        unreadCount: state.unreadCount + 1,
      };
    case types.RESET_UNREAD_COUNT:
      return {
        ...state,
        unreadCount: 0,
      };
    default:
      return state;
  }
};

export default chatListReducer;
