import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// add user to database
export const addOrFindUser = createAsyncThunk(
  "/user/addOrFindUser",
  async (user) => {
    try {
      const userResponse = await axios.post(`/api/users`, {
        identifier: user.sub,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      });
      return userResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  user: {},
  userId: "",
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
      state.userId = "";
      state.isLoggedIn = false;
      state.isLoadingRedux = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrFindUser.fulfilled, (state, action) => {
      state.userId = action.payload.id;
    });
  },
});

export const { auth0login, auth0logout } = userSlice.actions;

export default userSlice.reducer;
