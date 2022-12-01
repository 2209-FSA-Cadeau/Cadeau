import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all recipients for user
export const fetchRecipients = createAsyncThunk(
    "/recipients/fetchRecipients",
    async (userId) => {
      try {
        const response = await axios.get(`/api/recipients/${'2'}`, {
        //   headers: {
        //     authorization: token,
        //   },
        });
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // {
    //   condition: () => {
    //     const token = window.localStorage.getItem("token");
    //     if (token === null) {
    //       return false;
    //     }
    //   },
    // }
  );

// example, feel free to change!
const initialState = {
  recipients: []
};

export const recipientSlice = createSlice({
  name: "recipients",
  initialState,
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//     },
//     logout: (state, action) => {
//       state = initialState;
//     },
//   },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchCartUser.pending, (state, action) => {
    //     state.isLoading = true;
    //   })
      .addCase(fetchRecipients.fulfilled, (state, action) => {
        state.recipients = action.payload;
        // state.isLoading = false;
      })
    //   .addCase(fetchCartUser.rejected, (state, action) => {
    //     state.isLoading = false;
    //   })
  },
});

// export const { login, logout } = recipientSlice.actions;

export default recipientSlice.reducer;
