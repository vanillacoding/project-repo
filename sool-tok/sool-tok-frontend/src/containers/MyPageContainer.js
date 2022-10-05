import { connect } from 'react-redux';

import * as userSelector from '../redux/user/user.selectors';
import * as userAction from '../redux/user/user.actions';

import MyPage from '../components/MyPage';

const mapStateToProps = state => ({
  loading: userSelector.selectLoading(state),
  error: userSelector.selectError(state),
  user: userSelector.selectCurrentUser(state),
  friendList: userSelector.selectfriendList(state) || [],
  friendRequestList: userSelector.selectFriendRequestList(state) || [],
});

const mapDispatchToProps = dispatch => ({
  addFriendList: userId => dispatch(userAction.addFriendListStart(userId)),
  addFriendRequestList: userId => dispatch(userAction.addFriendRequestListStart(userId)),
  logoutUser: userId => dispatch(userAction.logoutUserStart(userId)),
  onSubmit(userId, isAccepted, targetUserId) {
    dispatch(userAction.responseFriendRequestStart(userId, isAccepted, targetUserId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
