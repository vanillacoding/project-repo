import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state.user;

export const selectUser = createDraftSafeSelector(selectSelf, (state) => state);

export const selectUserId = createDraftSafeSelector(
  selectSelf,
  (state) => state.id,
);

export const selectUserDisplayName = createDraftSafeSelector(
  selectSelf,
  (state) => state.displayName,
);
