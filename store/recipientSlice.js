import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all recipients for user
export const fetchRecipients = createAsyncThunk(
  "/recipients/fetchRecipients",
  async (userId) => {
    try {
      const response = await axios.get(`/api/recipients/${"2"}`, {
        //   headers: {
        //     authorization: token,
        //   },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  // {
  //   condition: () => {
  //     const token = window.localStorage.getItem("token");
  //     if (token === null) {
  //       return false;
  //     }
  //   },
  // }
);

const initialState = {
  recipients: [],
  singleRecipient: {},
  tab: "preferences",
};

export const recipientSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {
    setSingleRecipient: (state, action) => {
      state.singleRecipient = state.recipients.find(
        (recipient) => recipient.id === action.payload
      );
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(fetchCartUser.pending, (state, action) => {
      //     state.isLoading = true;
      //   })
      .addCase(fetchRecipients.fulfilled, (state, action) => {
        state.recipients = action.payload;
      });
    //   .addCase(fetchCartUser.rejected, (state, action) => {
    //     state.isLoading = false;
    //   })
  },
});

export const { setSingleRecipient, setTab } = recipientSlice.actions;

export default recipientSlice.reducer;
