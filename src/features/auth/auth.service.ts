import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

type SignUpUser = {
  username: string;
  password: string;
  email: string;
};

type LoginUser = {
  password: string;
  email: string;
};

export const loginAsync = createAsyncThunk(
  "auth/loginUser",
  async (user: LoginUser) => {
    try {
      const response = await login(user);
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

export const signUpAsync = createAsyncThunk(
  "auth/signUpUser",
  async (user: SignUpUser) => {
    try {
      const response = await signup(user);
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

export const signup = async (signUpUser: SignUpUser) => {
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/auth/signup",
    signUpUser
  );
  return response;
};

export const login = async (loginUser: LoginUser) => {
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/auth/login",
    loginUser
  );
  return response;
};
