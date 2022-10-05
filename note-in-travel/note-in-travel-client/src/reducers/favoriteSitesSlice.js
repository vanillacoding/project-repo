import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";
import { logoutUser } from "./userSlice";

export const toggleSiteBookmark = createAsyncThunk(
  "favoriteSites/toggleSiteStatus",
  async (siteId, { getState }) => {
    const { favoriteSites: { items } } = getState();
    const isBookmarked = !!items.find((favoriteSite) => favoriteSite._id === siteId);

    const response = isBookmarked
      ? await fetchData("DELETE", `/user/favoriteSites/${siteId}`)
      : await fetchData("PATCH", `/user/favoriteSites/${siteId}`);

    return {
      isBookmarked,
      site: response,
    };
  },
);

const initialState = {
  items: [],
  error: null,
  status: "idle",
};

const favoriteSitesSlice = createSlice({
  name: "favoriteSites",
  initialState,
  reducers: {
    initFavoriteSites: (state, action) => {
      const favoriteSites = action.payload;

      state.items = favoriteSites;
    },
  },
  extraReducers: {
    [logoutUser]: () => initialState,
    [toggleSiteBookmark.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [toggleSiteBookmark.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const { isBookmarked, site } = action.payload;

        state.status = "idle";

        state.items = isBookmarked
          ? state.items.filter((favoriteSite) => favoriteSite._id !== site._id)
          : state.items.concat(site);
      }
    },
    [toggleSiteBookmark.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.error.message;
        state.status = "idle";
      }
    },
  },
});

export const { initFavoriteSites } = favoriteSitesSlice.actions;

export default favoriteSitesSlice.reducer;

export const selectFavoriteSites = (state) => state.favoriteSites.items;

export const selectFavoriteSiteBySiteId = createSelector(
  [selectFavoriteSites, (_, siteId) => siteId],
  (favoriteSites, siteId) => (
    favoriteSites.find((favoriteSite) => favoriteSite._id === siteId)
  ),
);
