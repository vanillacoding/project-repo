import { connect } from 'react-redux';

import * as userSelector from '../redux/user/user.selectors';
import * as roomAction from '../redux/room/room.actions';

import Room from '../components/Room';

const mapStateToProps = state => ({
  user: userSelector.selectRequiredInRoom(state),
  room: state.room,
});

const mapDispatchToProps = dispatch => ({
  renderRoom(room) {
    dispatch(roomAction.renderRoom(room));
  },
  destroyRoom() {
    dispatch(roomAction.destroyRoom());
  },
  addMember(member) {
    dispatch(roomAction.addMember(member));
  },
  deleteMember(memberId) {
    dispatch(roomAction.deleteMember(memberId));
  },
  updateRoomLockingStatus(isLocked) {
    dispatch(roomAction.updateRoomLockingStatus(isLocked));
  },
  turnOnFilter(filter) {
    dispatch(roomAction.turnOnFilter(filter));
  },
  turnOffFilter() {
    dispatch(roomAction.turnOffFilter());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
