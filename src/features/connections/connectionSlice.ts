import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../feed/feed.type";
import { unfollowUserAsync } from "./connection.service";
import {
  loadUserConnectionsAsync,
  followUserAsync,
} from "./connection.service";

export type ConnectionState = {
  followers: Array<User>;
  following: Array<User>;
  suggestions: Array<User>;
  status?: "idle" | "loading" | "failed" | "success";
  tempHistory?: any;
};

const initialState: ConnectionState = {
  followers: [],
  following: [],
  suggestions: [],
  status: "idle",
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    resetConnections: (state) => {
      return initialState;
    },
  },
  extraReducers: (buildCase) => {
    buildCase
      .addCase(loadUserConnectionsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserConnectionsAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.suggestions = action.payload.suggestions;
          state.followers = action.payload.followers;
          state.following = action.payload.following;
        }
      })
      .addCase(followUserAsync.pending, (state, action) => {
        state.tempHistory = state.suggestions.find(
          (user) => user.id === action.meta.arg
        );
        if (!state.tempHistory) {
          state.tempHistory = state.followers.find(
            (user) => user.id === action.meta.arg
          );
        }
        state.suggestions = state.suggestions.filter(
          (user) => user.id !== action.meta.arg
        );
        state.tempHistory && state.following.push(state.tempHistory);
      })
      .addCase(followUserAsync.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.following = state.following.filter(
            (user) => user.id !== state.tempHistory.id
          );
          state.suggestions.push(state.tempHistory);
          state.tempHistory = undefined;
        }
      })
      .addCase(unfollowUserAsync.pending, (state, action) => {
        state.tempHistory = state.following.find(
          (user) => user.id === action.meta.arg
        );
        state.following = state.following.filter(
          (user) => user.id !== action.meta.arg
        );
        state.suggestions.push(state.tempHistory);
      })
      .addCase(unfollowUserAsync.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.suggestions = state.suggestions.filter(
            (user) => user.id !== state.tempHistory.id
          );
          state.following.push(state.tempHistory);
          state.tempHistory = undefined;
        }
      });
  },
});

export const { resetConnections: resetConnection } = connectionSlice.actions;

export const selectConnection = (state: RootState) => state.connection;

export default connectionSlice.reducer;
