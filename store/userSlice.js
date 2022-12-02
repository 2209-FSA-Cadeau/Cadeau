import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoadingRedux: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth0login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoadingRedux = false;
    },
    auth0logout: (state, action) => {
      state.user = {};
      state.isLoggedIn = false;
      state.isLoadingRedux = false;
    },
  },
});

export const { auth0login, auth0logout } = userSlice.actions;

export default userSlice.reducer;
