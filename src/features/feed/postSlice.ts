import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Post as PostType } from "./feed.type";
import { mapCommentReplies } from "../../utils/helper";
import {
  unlikeCommentAsync,
  unlikePostAsync,
  submitCommentAsync,
  likePostAsync,
  likeCommentAsync,
  submitPostSync,
  loadFeedAsync,
  loadPostCommentAsync,
} from "./post.service";

export interface FeedState {
  posts: Array<PostType>;
  status: "idle" | "loading" | "failed" | "success" | "loading-comments";
  tempHistory?: any;
}

const initialState: FeedState = {
  posts: [],
  status: "idle",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (buildCase) => {
    buildCase
      .addCase(loadFeedAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadFeedAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.posts = action.payload.posts;
        }
        state.status = "success";
      })
      .addCase(submitPostSync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitPostSync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.posts.unshift(action.payload.post);
        }
        state.status = "success";
      })
      .addCase(loadPostCommentAsync.pending, (state) => {
        state.status = "loading-comments";
      })
      .addCase(loadPostCommentAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.posts = state.posts.map((post) => {
            if (post.id === action.payload.postId) {
              post.comments = mapCommentReplies(action.payload.comments);
            }
            return post;
          });
        }
        state.status = "success";
      })
      .addCase(submitCommentAsync.pending, (state) => {
        state.status = "loading-comments";
      })
      .addCase(submitCommentAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.posts = state.posts.map((post) => {
            if (post.id === action.payload.postId) {
              if (action.payload.comment.repliedTo) {
                post.comments = post.comments.map((comment) => {
                  if (action.payload.comment.repliedTo === comment.id) {
                    if (comment.replies) {
                      comment.replies.unshift(action.payload.comment);
                    } else {
                      comment.replies = [action.payload.comment];
                    }
                  }
                  return comment;
                });
              } else {
                post.comments.unshift(action.payload.comment);
              }
            }
            return post;
          });
        }
        state.status = "success";
      })
      .addCase(likePostAsync.pending, (state, action) => {
        const { postId, userId } = action.meta.arg;
        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            post.likes.push(userId);
          }
          return post;
        });
        state.tempHistory = postId;
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        const { postId, userId } = action.meta.arg;
        if (!action.payload.success) {
          state.posts = state.posts.map((post) => {
            if (post.id === postId) {
              post.likes = post.likes.filter((like) => like === userId);
            }
            return post;
          });
        }
        state.tempHistory = undefined;
      })
      .addCase(likeCommentAsync.pending, (state, action) => {
        const { commentId, postId, userId } = action.meta.arg;
        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            const comment = post.comments.find((com) => com.id === commentId);
            comment?.commentLikes.push(userId);
          }
          return post;
        });
        state.tempHistory = { commentId, postId };
      })
      .addCase(likeCommentAsync.fulfilled, (state, action) => {
        const { commentId, postId, userId } = action.meta.arg;
        if (!action.payload.success) {
          state.posts = state.posts.map((post) => {
            if (post.id === postId) {
              const comment = post.comments.find((com) => com.id === commentId);
              comment?.commentLikes.filter(
                (likeuserId) => likeuserId === userId
              );
            }
            return post;
          });
        }
        state.tempHistory = undefined;
      })
      .addCase(unlikePostAsync.pending, (state, action) => {
        const { postId, userId } = action.meta.arg;
        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            post.likes = post.likes.filter((likeUser) => {
              return likeUser !== userId;
            });
          }
          return post;
        });
      })
      .addCase(unlikePostAsync.fulfilled, (state, action) => {
        const { postId, userId } = action.meta.arg;
        if (!action.payload.success) {
          state.posts = state.posts.map((post) => {
            if (post.id === postId) {
              post.likes.push(userId);
            }
            return post;
          });
        }
      })
      .addCase(unlikeCommentAsync.fulfilled, (state, action) => {
        const { commentId, postId, userId } = action.meta.arg;
        if (!action.payload.success) {
          state.posts = state.posts.map((post) => {
            if (post.id === postId) {
              const comment = post.comments.find((com) => com.id === commentId);
              comment?.commentLikes.push(userId);
            }
            return post;
          });
        }
        state.tempHistory = { commentId, postId };
      })
      .addCase(unlikeCommentAsync.pending, (state, action) => {
        const { commentId, postId, userId } = action.meta.arg;

        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            const comment = post.comments.find((com) => com.id === commentId);
            if (comment?.commentLikes) {
              comment.commentLikes = comment.commentLikes.filter(
                (likeuserId) => {
                  return likeuserId !== userId;
                }
              );
            }
          }
          return post;
        });

        state.tempHistory = undefined;
      });
  },
});

export const { resetPosts } = postSlice.actions;

export const selectPost = (state: RootState) => state.post;

export default postSlice.reducer;
