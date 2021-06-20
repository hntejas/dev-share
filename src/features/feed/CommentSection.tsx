import Comment from "./Comment";
import { Comment as CommentType } from "./Post";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loadPostCommentAsync } from "./post.service";
import CommentForm from "./CommentForm";

type CommentSectionProp = {
  comments: Array<CommentType>;
  postId: string;
};

export default function CommentSection({
  comments = [],
  postId,
}: CommentSectionProp) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPostCommentAsync(postId));
  }, [dispatch, postId]);

  return (
    <>
      <CommentForm postId={postId} />
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </>
  );
}
