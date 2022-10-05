import { connect } from 'react-redux';

import * as userSelector from '../redux/user/user.selectors';
import * as chatSelector from '../redux/chat/chat.selectors';
import * as chatAction from '../redux/chat/chat.actions';

import Chat from '../components/Chat';

const mapStateToProps = state => ({
  user: userSelector.selectRequiredInRoom(state),
  chatList: chatSelector.selectChatList(state),
  unreadCount: chatSelector.selectUnreadCount(state),
});

const mapDispatchToProps = dispatch => ({
  addChat(chat) {
    dispatch(chatAction.addChat(chat));
  },
  resetChat() {
    dispatch(chatAction.resetChat());
  },
  increaseUnreadCount() {
    dispatch(chatAction.increaseUnreadCount());
  },
  resetUnreadCount() {
    dispatch(chatAction.resetUnreadCount());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
