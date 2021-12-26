import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const sliceName = "auth";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    login: (state, { payload: { username, imageUrl } }) => {
      state.user = {
        id: uuid(),
        username: username,
        imageUrl: imageUrl,
      };
    },
    logout: (state) => {
      state.user = "loggedOut";
    },
    clear: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, clear } = authSlice.actions;
export default authSlice;

export const selectUser = (state) => state?.[sliceName]?.user;
