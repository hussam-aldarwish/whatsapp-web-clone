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
    login: (state, { payload: { username, imageUrl, gender } }) => {
      console.log("🚀 ~ file: authSlice.js ~ line 15 ~ gender", gender);
      state.user = {
        id: uuid(),
        username: username,
        imageUrl: imageUrl,
        gender: gender,
      };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;

export const selectUser = (state) => state?.[sliceName]?.user;
