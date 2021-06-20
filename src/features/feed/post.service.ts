import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils/helper";

type CommentLoad = {
  commentText: string;
  postId: string;
  repliedTo?: string;
};

type LikePostLoad = {
  postId: string;
  userId: string;
};

type LikeCommentLoad = {
  postId: string;
  commentId: string;
  userId: string;
};

export const loadFeedAsync = createAsyncThunk("post/loadFeed", async () => {
  try {
    const response = await loadFeed();
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

export const loadPostCommentAsync = createAsyncThunk(
  "post/loadPostComment",
  async (postId: string) => {
    try {
      const response = await loadPostComment(postId);
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

export const submitPostSync = createAsyncThunk(
  "post/submitPost",
  async (post: FormData) => {
    try {
      const response = await submitPost(post);
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

export const submitCommentAsync = createAsyncThunk(
  "post/submitComment",
  async (comment: CommentLoad) => {
    try {
      const response = await submitComment(comment);
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

export const likePostAsync = createAsyncThunk(
  "post/likePost",
  async (postObj: LikePostLoad) => {
    try {
      const response = await likePost(postObj);
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

export const likeCommentAsync = createAsyncThunk(
  "post/likeComment",
  async (commentLikeObj: LikeCommentLoad) => {
    try {
      const response = await likeComment(commentLikeObj);
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

export const unlikePostAsync = createAsyncThunk(
  "post/unlikePost",
  async (postObj: LikePostLoad) => {
    try {
      const response = await unlikePost(postObj);
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

export const unlikeCommentAsync = createAsyncThunk(
  "post/unlikeComment",
  async (commentLikeObj: LikeCommentLoad) => {
    try {
      const response = await unlikeComment(commentLikeObj);
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

export const submitPost = async (post: FormData) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/post",
    post,
    {
      headers: {
        Authorization: token,
        "Content-type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const submitComment = async (comment: CommentLoad) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/post/comment",
    comment,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const loadPostComment = async (postId: string) => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://dev-share-api.hntejas.repl.co/post/comment/" + postId,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const loadFeed = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://dev-share-api.hntejas.repl.co/post",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const likePost = async (postObj: LikePostLoad) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/post/like",
    {
      postId: postObj.postId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const likeComment = async (commentLikeObj: LikeCommentLoad) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/post/commentLike",
    {
      commentId: commentLikeObj.commentId,
      postId: commentLikeObj.postId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const unlikePost = async (postObj: LikePostLoad) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/post/unlike",
    {
      postId: postObj.postId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const unlikeComment = async (commentLikeObj: LikeCommentLoad) => {
  const token = getAuthToken();
  const response = await axios.post(
    "https://dev-share-api.hntejas.repl.co/post/commentUnlike",
    {
      commentId: commentLikeObj.commentId,
      postId: commentLikeObj.postId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};
