import {
  SET_ERROR_MESSAGE,
  UPDATE_CHAT_LIST,
  SET_CHAT_LIST,
  GET_CHATS,
  ADD_CHAT,
  GET_CURRENT_USERS,
  SET_TYPING_USERS,
  SET_STOP_TYPING_USERS,
  SET_TYPING_MESSAGE
} from '../constants/actionTypes';

const initialState = {
  chats: [],
  chatList: [],
  users: [],
  typingUsers: [],
  typingMessage: '',
  errorMessage: ''
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.data
      };
    case SET_CHAT_LIST:
      return {
        ...state,
        chatList: action.data
      };
    case UPDATE_CHAT_LIST:
      return {
        ...state,
        chatList: [...state.chatList, action.data]
      };
    case GET_CHATS:
      return {
        ...state,
        chats: action.data
      };
    case ADD_CHAT:
      console.log('ADD', state.chats);
      console.log('=====================');
      return {
        ...state,
        chats: [...state.chats, action.data]
      };
    case GET_CURRENT_USERS:
      return {
        ...state,
        users: action.data
      };
    case SET_TYPING_USERS:
      return {
        ...state,
        typingUsers: [...state.typingUsers, action.data]
      };
    case SET_STOP_TYPING_USERS:
      return {
        ...state,
        typingUsers: state.typingUsers.filter((user) => user !== action.data)
      };
    case SET_TYPING_MESSAGE:
      const currentTypingUsers = state.typingUsers;
      let typingMessage;

      if (currentTypingUsers.length > 2) {
        typingMessage = `${currentTypingUsers[0]}, ${currentTypingUsers[1]} 외 ${
          currentTypingUsers.length - 2
        }명 입력중...`;
      } else if (currentTypingUsers.length === 2) {
        typingMessage = `${currentTypingUsers[0]}, ${currentTypingUsers[1]} 입력중...`;
      } else if (currentTypingUsers.length === 1) {
        typingMessage = `${currentTypingUsers[0]} 입력중...`;
      } else {
        typingMessage = ``;
      }

      return {
        ...state,
        typingMessage
      };
    default:
      return state;
  }
};
