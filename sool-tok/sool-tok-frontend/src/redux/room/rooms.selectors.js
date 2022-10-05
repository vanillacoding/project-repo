import { createSelector } from 'reselect';

export const selectRoom = state => state.room;

export const selectMemberList = createSelector(
  selectRoom,
  room => room.memberList,
);
