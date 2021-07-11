import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Comment as CommentType } from "./feed.type";

import { loadPostCommentAsync } from "./post.service";
import { selectPost } from "./postSlice";

type CommentSectionProp = {
  comments: Array<CommentType>;
  postId: string;
};

export default function CommentSection({
  comments = [],
  postId,
}: CommentSectionProp) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectPost);

  useEffect(() => {
    dispatch(loadPostCommentAsync(postId));
  }, [dispatch, postId]);

  if (status === "loading-comments") {
    return <p>Loading comments..</p>;
  }

  return (
    <>
      <CommentForm postId={postId} />
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </>
  );
}
