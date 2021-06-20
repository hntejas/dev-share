import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils/helper";

type UserInfo = {
  name: string;
  tagline: string;
  about: string;
};

export const loadUserAsync = createAsyncThunk("profile/getUser", async () => {
  try {
    const response = await getUser();
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
});

export const updateUserAsync = createAsyncThunk(
  "profile/updateProfile",
  async (userInfo: UserInfo) => {
    try {
      const response = await updateUser(userInfo);
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

export const updateUserImgAsync = createAsyncThunk(
  "profile/updateProfileImg",
  async (userImgData: FormData) => {
    try {
      const response = await updateUserImg(userImgData);
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

export const getUser = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://dev-share-api.hntejas.repl.co/profile",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const loadProfile = async (username: string) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      "https://dev-share-api.hntejas.repl.co/profile/" + username,
      {
        headers: {
          Authorization: token,
        },
      }
    );
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
};

export const updateUser = async (userInfo: UserInfo) => {
  const token = getAuthToken();
  const response = await axios.put(
    "https://dev-share-api.hntejas.repl.co/profile",
    userInfo,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const updateUserImg = async (userImgData: FormData) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/profile/img",
    userImgData,
    {
      headers: {
        Authorization: token,
        "Content-type": "multipart/form-data",
      },
    }
  );
  return response;
};
