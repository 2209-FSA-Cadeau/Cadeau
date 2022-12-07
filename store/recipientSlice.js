import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all recipients for user
export const fetchRecipients = createAsyncThunk(
  "/recipients/fetchRecipients",
  async (userId) => {
    try {
      const response = await axios.get(`/api/recipients/2`, {});
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

// Update Recipient
export const editRecipient = createAsyncThunk(
  "/recipients/editRecipient",
  async (recipient) => {
    try {
      console.log(recipient);
      const { data } = await axios.put(`/api/recipients`, {
        userId: recipient.id,
        updateInfo: recipient,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchPreferences = createAsyncThunk(
  "/recipients/fetchPreferences",
  async (recipientId) => {
    try {
      const response = await axios.get(`/api/preferences/${recipientId}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addLike = createAsyncThunk("/recipients/addLike", async (obj) => {
  try {
    const response = await axios.post(`/api/preferences`, {
      updateInfo: { category: obj.like, preference: "like" },
      recipientId: obj.recipientId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const addDislike = createAsyncThunk(
  "/recipients/addDislike",
  async (obj) => {
    try {
      const response = await axios.post(`/api/preferences`, {
        updateInfo: { category: obj.dislike, preference: "dislike" },
        recipientId: obj.recipientId,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteLike = createAsyncThunk(
  "/recipients/deleteLike",
  async (recipientId) => {
    try {
      const response = await axios.delete(`/api/preferences`, {
        data: {
          type: "like",
          recipientId: recipientId,
        },
      });
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  recipients: [],
  singleRecipient: {
    preferences: [],
  },
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
        if (action.payload) {
          state.recipients = action.payload;
        } else {
          state.recipients = [];
        }
      })
      .addCase(addRecipient.fulfilled, (state, action) => {
        state.recipients = [...state.recipients, action.payload];
        state.singleRecipient = action.payload;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.recipients = [...state.recipients];
        state.singleRecipient = {
          ...state.singleRecipient,
          preferences: action.payload,
        };
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.singleRecipient = {
          ...state.singleRecipient,
          preferences: [...state.singleRecipient.preferences, action.payload],
        };
      })
      .addCase(addDislike.fulfilled, (state, action) => {
        state.singleRecipient = {
          ...state.singleRecipient,
          preferences: [...state.singleRecipient.preferences, action.payload],
        };
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.singleRecipient = {
          ...state.singleRecipient,
          preferences: state.singleRecipient.preferences.filter(
            (preference) => preference.category != action.payload
          ),
        };
      });
  },
});

export const { setSingleRecipient, setTab } = recipientSlice.actions;

export default recipientSlice.reducer;
