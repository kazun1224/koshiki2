import { configureStore } from "@reduxjs/toolkit";
import { authUserReducer } from "src/state/authState";

export const store = configureStore({
  reducer: {
    authCurrentUser: authUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
