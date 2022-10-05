import types from './room.actionTypes';
import { getMySocketId } from '../../utils/socket';

const roomReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.RENDER_ROOM:
      return {
        ...payload.room,
        isHost: getMySocketId() === payload.room.memberList[0].socketId,
      };
    case types.ADD_MEMBER:
      return {
        ...state,
        memberList: [...state.memberList, payload.newMember],
      };
    case types.DELETE_MEMBER: {
      const newMemberList = state.memberList.filter(
        member => member.socketId !== payload.socketId,
      );

      return {
        ...state,
        memberList: newMemberList,
        isHost: getMySocketId() === newMemberList[0].socketId,
      };
    }
    case types.DESTROY_ROOM:
      return null;
    case types.UPDATE_ROOM_LOCKING_STATUS:
      return {
        ...state,
        isLocked: payload.isLocked,
      };
    case types.TURN_ON_FILTER:
      return {
        ...state,
        filter: payload.filter,
      };
    case types.TURN_OFF_FILTER:
      return {
        ...state,
        filter: null,
      };
    default:
      return state;
  }
};

export default roomReducer;
