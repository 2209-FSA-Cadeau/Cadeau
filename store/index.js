import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "./userSlice";
import recipientSlice from "./recipientSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    recipients: recipientSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
