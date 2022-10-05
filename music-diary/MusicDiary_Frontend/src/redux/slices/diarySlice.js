import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewDiaryAPI,
  fetchDiaryByDateAPI,
  searchTrackAPI,
  addTrackToDiaryAPI,
} from "../../api";
import * as SecureStore from "expo-secure-store";
import { parseISO, format, getMonth, getDate } from "date-fns";

export const addNewDiary = createAsyncThunk(
  "DIARY/ADD_DIARY",
  async ({ newDiaryInfo, userId }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const newDiary = await addNewDiaryAPI({
        accessToken,
        newDiaryInfo,
        userId,
      });

      return newDiary;
    } catch (err) {
      console.error("failed to post diary", err);
    }
  }
);

export const fetchDiaryByDate = createAsyncThunk(
  "DIARY/FETCH_DIARY_BY_DATE",
  async ({ userId }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const fetchedDiaryByDateInfo = await fetchDiaryByDateAPI({
        accessToken,
        userId,
      });

      return fetchedDiaryByDateInfo;
    } catch (err) {
      console.error("failed to fetch diary by date");
    }
  }
);

export const searchTrack = createAsyncThunk(
  "TRACK/FETCH_SEARCH_TRACK",
  async ({ userId, diaryId, searchInput }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const tempSearchTracksResult = await searchTrackAPI({
        accessToken,
        userId,
        diaryId,
        searchInput,
      });

      return tempSearchTracksResult;
    } catch (err) {
      console.error("failed to fetch searched track");
    }
  }
);

export const addTrackToDiary = createAsyncThunk(
  "DIARY/ADD_TRACK_TO_DIARY",
  async ({ userId, diaryId, trackInfo }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const { newTrackInfo } = await addTrackToDiaryAPI({
        accessToken,
        userId,
        diaryId,
        trackInfo,
      });

      return { newTrackInfo, diaryId };
    } catch (err) {
      console.error("failed to fetch searched track");
    }
  }
);

const initialState = {
  byIds: {},
  allIds: [],
  calendar: { May: Array(31).fill([]), Jun: Array(30).fill([]) },
  visibleDiary: {
    byDate: [],
  },
  loading: false,
  error: null,
};

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    clearDiary: (state, action) => {
      let currentState = state;
      currentState = initialState;
      return currentState;
    },
    getPlayList: (state, action) => {
      return state.byIds[action.payload].playList;
    },
  },
  extraReducers: {
    [addNewDiary.fulfilled]: (state, action) => {
      state.byIds = {
        [action.payload._id]: {
          ...action.payload,
          date: format(parseISO(action.payload.date), "yyyy-MM-dd"),
        },
        ...state.byIds,
      };
      state.allIds = [action.payload._id].concat(state.allIds);
      state.loading = false;
      state.error = false;
    },
    [addNewDiary.pending]: (state) => {
      state.loading = true;
    },
    [addNewDiary.reject]: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },

    [fetchDiaryByDate.fulfilled]: (state, action) => {
      const ids = action.payload?.map((diary) => diary._id);

      state.byIds = {
        ...action.payload?.reduce((initialObj, diaryById) => {
          initialObj[diaryById._id] = {
            ...diaryById,
            date: format(parseISO(diaryById.date), "yyyy-MM-dd"),
          };
          return initialObj;
        }, {}),
      };

      state.allIds = ids;
      state.loading = false;
      state.error = false;
    },
    [fetchDiaryByDate.pending]: (state) => {
      state.loading = true;
    },
    [fetchDiaryByDate.reject]: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },

    [addTrackToDiary.pending]: (state) => {
      state.loading = true;
    },
    [addTrackToDiary.reject]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addTrackToDiary.fulfilled]: (state, action) => {
      const month = getMonth(parseISO(action.payload.newTrackInfo.date));
      const date = getDate(parseISO(action.payload.newTrackInfo.date));
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const calendarMonth = months[month];

      state.calendar[calendarMonth][date] = state.calendar[calendarMonth][date].concat([action.payload.newTrackInfo.energy]);

      state.byIds[action.payload.diaryId].playList = [
        ...state.byIds[action.payload.diaryId].playList,
        action.payload.newTrackInfo,
      ];
    },
  },
});

const { clearDiary, getPlayList } = diarySlice.actions;
export { clearDiary, getPlayList };
