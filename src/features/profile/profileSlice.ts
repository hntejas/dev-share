import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Post as PostType } from "../feed/feed.type";
import {
  updateUserAsync,
  updateUserImgAsync,
  loadUserAsync,
} from "./profile.service";

export type ProfileState = {
  id?: string;
  name?: string;
  tagline?: string;
  displayImg?: string;
  cloudinary_id?: string;
  about?: string;
  featuredPost?: PostType;
  followers?: Number;
  following?: Number;
  posts: Array<PostType>;
  status?: "idle" | "loading" | "failed" | "success" | "loader-loading";
};

const initialState: ProfileState = {
  id: "",
  name: "",
  tagline: "",
  displayImg: "",
  cloudinary_id: "",
  about: "",
  followers: 0,
  following: 0,
  posts: [],
  status: "idle",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => {
      return initialState;
    },
  },
  extraReducers: (buildCase) => {
    buildCase
      .addCase(loadUserAsync.pending, (state) => {
        state.status = "loader-loading";
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          return {
            ...state,
            ...action.payload.user,
            posts: action.payload.posts,
            status: "success",
          };
        }
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { name, about, tagline } = action.payload.user;
          state.name = name;
          state.about = about;
          state.tagline = tagline;
        }
        state.status = "success";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserImgAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserImgAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { displayImg, cloudinary_id } = action.payload.user;
          state.displayImg = displayImg;
          state.cloudinary_id = cloudinary_id;
        }
      });
  },
});

export const { resetProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
