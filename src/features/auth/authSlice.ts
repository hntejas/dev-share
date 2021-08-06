import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, signUpAsync } from "./auth.service";
import { isLoggedInLocally } from "../../utils/helper";
import { RootState } from "../../app/store";

export interface AuthState {
  isLoggedIn: boolean;
  status: "idle" | "loading" | "failed" | "success";
}

const initialState: AuthState = {
  isLoggedIn: isLoggedInLocally(),
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      removeToken();
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        addTokenToStorage(action.payload.token);
        state.isLoggedIn = true;
        state.status = "success";
      })
      .addCase(signUpAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        addTokenToStorage(action.payload.token);
        state.isLoggedIn = true;
        state.status = "success";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logoutUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const addTokenToStorage = (token: string) => {
  localStorage.setItem(
    "devShareAuth",
    JSON.stringify({ isLoggedIn: true, token: token })
  );
};

const removeToken = () => {
  localStorage.removeItem("devShareAuth");
};

export default authSlice.reducer;
