import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import {
  putLogin,
  postSignup,
  getFriends,
  getMyPosts,
  getWaitingFriends,
  rejectPendingFriend,
  acceptPendingFriend
} from "../api/userApi";
import { deletePost } from "../api/postApi";
import {
  patchComment,
  getMyComments,
  deleteComment
} from "../api/commentApi";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userInfo, thunkAPI) => {
    try {
      const response = await putLogin(userInfo);

      if (!response.errorMessage) {
        const userLoginInfo = {
          email: userInfo.email,
          password: userInfo.password
        };

        await SecureStore.setItemAsync(
          "userInfo",
          JSON.stringify(userLoginInfo)
          );

        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "user/fetchSignup",
  async (userInfo, thunkAPI) => {
    try {
      const response = await postSignup(userInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchMyFriends = createAsyncThunk(
  "user/fetchMyFriends",
  async (accessToken, thunkAPI) => {
    try {
      const response = await getFriends(accessToken);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchWaitingFriends = createAsyncThunk(
  "user/fetchWaitingFriends",
  async (accessToken, thunkAPI) => {
    try {
      const response = await getWaitingFriends(accessToken);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const rejectWaitingFriend = createAsyncThunk(
  "user/rejectWaitingFriend",
  async (friendInfo, thunkAPI) => {
    try {
      const response = await rejectPendingFriend(friendInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const acceptWaitingFriend = createAsyncThunk(
  "user/acceptWaitingFriend",
  async (friendInfo, thunkAPI) => {
    try {
      const response = await acceptPendingFriend(friendInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchMyPosts = createAsyncThunk(
  "user/fetchMyPosts",
  async (accessToken, thunkAPI) => {
    try {
      const response = await getMyPosts(accessToken);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchMyComments = createAsyncThunk(
  "user/fetchMyComments",
  async (accessToken, thunkAPI) => {
    try {
      const response = await getMyComments(accessToken);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const patchMyComment = createAsyncThunk(
  "user/patchMyComments",
  async (requestInfo, thunkAPI) => {
    try {
      const response = await patchComment(requestInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteMyPost = createAsyncThunk(
  "post/deleteMyPost",
  async (requestInfo, thunkAPI) => {
    try {
      const response = await deletePost(requestInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteMyComment = createAsyncThunk(
  "post/deleteMyComment",
  async (requestInfo, thunkAPI) => {
    try {
      const response = await deleteComment(requestInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  email: "",
  message: null,
  nickname: "",
  accessToken: "",
  isLoading: false,
  posts: null,
  comments: null,
  friendList: null,
  waitingFriendList: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => {
      return initialState;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetFriendFetchedStatus: (state) => {
      state.isFetchedFriendList = false;
      state.isFetchedWaitingFriendList = false;
    }
  },
  extraReducers: {
    [fetchLogin.fulfilled]: (state, { payload }) => {
      const { loginInfo, token } = payload;

      state.email = loginInfo.email;
      state.nickname = loginInfo.nickname;
      state.accessToken = token;
      state.isLoading = false;
    },
    [fetchLogin.pending]: (state) => {
      state.isLoading = true
    },
    [fetchLogin.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },

    [fetchSignup.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [fetchSignup.pending]: (state) => {
      state.isLoading = true
    },
    [fetchSignup.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchMyFriends.fulfilled]: (state, { payload }) => {
      state.friendList = payload.friends;
      state.isFetchedFriendList = true;
      state.isLoading = false;
    },
    [fetchMyFriends.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMyFriends.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchWaitingFriends.fulfilled]: (state, { payload }) => {
      state.waitingFriendList = payload.friends;
      state.isFetchedWaitingFriendList = true;
      state.isLoading = false;
    },
    [fetchWaitingFriends.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchWaitingFriends.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [acceptWaitingFriend.fulfilled]: (state, { payload }) => {
      state.waitingFriendList = payload.waitingFriend;
      state.friendList = payload.friends;
      state.isLoading = false;
    },
    [acceptWaitingFriend.pending]: (state) => {
      state.isLoading = true;
    },
    [acceptWaitingFriend.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [rejectWaitingFriend.fulfilled]: (state, { payload }) => {
      state.waitingFriendList = payload.waitingFriend;
      state.isLoading = false;
    },
    [rejectWaitingFriend.pending]: (state) => {
      state.isLoading = true;
    },
    [rejectWaitingFriend.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchMyPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload.postsInfo;
      state.isLoading = false;
    },
    [fetchMyPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMyPosts.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchMyComments.fulfilled]: (state, { payload }) => {
      state.comments = payload.comments;
      state.isLoading = false;
    },
    [fetchMyComments.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMyComments.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [patchMyComment.fulfilled]: (state, { payload }) => {
      state.comments = payload.comments;
      state.isLoading = false;
    },
    [patchMyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [patchMyComment.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [deleteMyPost.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload.posts;
    },
    [deleteMyPost.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteMyPost.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [deleteMyComment.fulfilled]: (state, { payload }) => {
      state.comments = payload.comments;
      state.isLoading = false;
    },
    [deleteMyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteMyComment.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    }
  }
});
