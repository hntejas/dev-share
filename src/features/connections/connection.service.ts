import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils/helper";

export const loadUserConnectionsAsync = createAsyncThunk(
  "profile/getUserSuggestions",
  async () => {
    try {
      const response = await getUserConnections();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error;
        if (serverError && serverError.response) {
          return {
            ...serverError.response.data,
            status: serverError.response.status,
          };
        }
      }
      return {
        success: false,
        error: {
          message: "Something went wrong! Please try again",
        },
      };
    }
  }
);

export const followUserAsync = createAsyncThunk(
  "profile/followUser",
  async (followId: string) => {
    try {
      const response = await followUser(followId);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error;
        if (serverError && serverError.response) {
          return {
            ...serverError.response.data,
            status: serverError.response.status,
          };
        }
      }
      return {
        success: false,
        error: {
          message: "Something went wrong! Please try again",
        },
      };
    }
  }
);

export const unfollowUserAsync = createAsyncThunk(
  "profile/unfollowUser",
  async (followId: string) => {
    try {
      const response = await unfollowUser(followId);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error;
        if (serverError && serverError.response) {
          return {
            ...serverError.response.data,
            status: serverError.response.status,
          };
        }
      }
      return {
        success: false,
        error: {
          message: "Something went wrong! Please try again",
        },
      };
    }
  }
);

export const getUserConnections = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://dev-share-api.hntejas.repl.co/connection",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const followUser = async (followId: string) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/connection/follow",
    {
      followId: followId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const unfollowUser = async (followId: string) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/connection/unfollow",
    {
      followId: followId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};
