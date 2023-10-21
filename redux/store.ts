import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth-slice";
import businessSlice from "./features/business-slice";

export const store = configureStore({
  reducer: {
    businessSlice,
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
