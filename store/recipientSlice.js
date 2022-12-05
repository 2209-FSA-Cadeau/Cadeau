import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { requestToBodyStream } from "next/dist/server/body-streams";

// get all recipients for user
export const fetchRecipients = createAsyncThunk(
  "/recipients/fetchRecipients",
  async (userId) => {
    try {
      const response = await axios.get(`/api/recipients/${"2"}`, {
        //NEED TO UPDATE WITH REAL USERID WHEN AVAILABLE
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Add new recipient
export const addRecipient = createAsyncThunk(
  "/recipients/addRecipient",
  async (recipient) => {
    try {
      const recipientRes = await axios.post(`/api/recipients`, {
        userId: 2,
        updateInfo: recipient,
      }); //NEED TO UPDATE WITH REAL USERID WHEN AVAILABLE
      await Promise.all(
        recipient.likes.map(async (like) => {
          try {
            await axios.post(`/api/preferences`, {
              recipientId: recipientRes.data.id,
              updateInfo: { preference: "like", category: like.label },
            });
          } catch (err) {
            console.log(err);
          }
        })
      );
      await Promise.all(
        recipient.dislikes.map(async (dislike) => {
          try {
            await axios.post(`/api/preferences`, {
              recipientId: recipientRes.data.id,
              updateInfo: { preference: "dislike", category: dislike.label },
            });
          } catch (err) {
            console.log(err);
          }
        })
      );
      await Promise.all(
        recipient.occasions.map(async (occasion) => {
          try {
            await axios.post(`/api/holidays`, {
              recipientId: recipientRes.data.id,
              name: occasion.name,
              date: occasion.date,
            });
          } catch (err) {
            console.log(err);
          }
        })
      );
      return recipientRes.data;
    } catch (err) {
      console.log(err);
    }
  }
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
      .addCase(fetchRecipients.fulfilled, (state, action) => {
        state.recipients = action.payload;
      })
      .addCase(addRecipient.fulfilled, (state, action) => {
        state.recipients = [...state.recipients, action.payload];
        state.singleRecipient = action.payload;

      });
  },
});

export const { setSingleRecipient, setTab } = recipientSlice.actions;

export default recipientSlice.reducer;
