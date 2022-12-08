import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "./userSlice";
import recipientSlice from "./recipientSlice";
import shopSlice from "./shopSlice"

const store = configureStore({
  reducer: {
    user: userSlice,
    recipients: recipientSlice,
    shop: shopSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
