import { createSlice } from "@reduxjs/toolkit";

// example, feel free to change!
const initialState = {
  user: {},
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
