import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/feed/postSlice";
import profileReducer from "../features/profile/profileSlice";
import connectionReducer from "../features/connections/connectionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    profile: profileReducer,
    connection: connectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
