// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import user from "./userSlice";

// const combinedReducer = combineReducers({
//   user,
// });

// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       user: {
//         user: action.payload.user.user,
//         isLoggedIn: action.payload.user.isLoggedIn,
//       },
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });

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
