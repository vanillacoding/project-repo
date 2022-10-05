import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'none',
  isSideMenuOpen: false,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.status = action.payload;
    },
    setSideMenuButtonStatus: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
    closeSideMenuButtonStatus: (state) => {
      state.isSideMenuOpen = false;
    },
    openSideMenuButtonStatus: (state) => {
      state.isSideMenuOpen = true;
    },
  },
});

export const {
  setMenu,
  setSideMenuButtonStatus,
  closeSideMenuButtonStatus,
  openSideMenuButtonStatus,
} = navSlice.actions;

export const selectMenu = (state) => state.nav.status;
export const selectSideMenuButtonStatus = (state) => state.nav.isSideMenuOpen;

export default navSlice.reducer;
