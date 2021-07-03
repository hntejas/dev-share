import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { Comment as CommentType } from "./feed.type";
import Avatar from "../../components/avatar/Avatar";
import FeedActor from "../../components/feed-actor/FeedActor";
import CommentReply from "./CommentReply";
import CommentForm from "./CommentForm";

import { selectProfile } from "../profile/profileSlice";
import { likeCommentAsync, unlikeCommentAsync } from "./post.service";

import styles from "./post.module.css";

type CommentProp = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProp) {
  const [reply, setReply] = useState(false);
  const user = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const likeHandler = () => {
    !isLiked
      ? dispatch(
          likeCommentAsync({
            commentId: comment.id,
            postId: comment.post,
            userId: user.id || "",
          })
        )
      : dispatch(
          unlikeCommentAsync({
            commentId: comment.id,
            postId: comment.post,
            userId: user.id || "",
          })
        );
  };

  useEffect(() => {
    setReply(false);
  }, [comment]);

  const isLiked = !!comment.commentLikes.find((like) => like === user.id);

  return (
    <div className={styles.commentContainer}>
      <Avatar
        avatarImg={comment.user.displayImg}
        avatarName={comment.user.name}
        avatarSize="MEDIUM"
      />
      <div className={styles.commentDetailContainer}>
        <div className={styles.commentDetail}>
          <FeedActor user={comment.user} hideAvatar={true} />
          <div className={styles.commentText}>{comment.commentText}</div>
        </div>
        <div className={styles.commentActionContainer}>
          <span
            className={styles.commentActionbtn}
            style={{ color: isLiked ? "var(--primary-blue)" : "inherit" }}
            onClick={likeHandler}
          >
            Like • {comment.commentLikes.length}{" "}
          </span>{" "}
          |{" "}
          <span
            className={styles.commentActionbtn}
            onClick={() => {
              setReply(true);
            }}
          >
            Reply
          </span>
        </div>
        <div className={styles.commentReplyList}>
          {reply && (
            <CommentForm postId={comment.post} commentId={comment.id} />
          )}
          {comment.replies &&
            comment.replies.map((commentReply) => (
              <CommentReply key={commentReply.id} comment={commentReply} />
            ))}
        </div>
      </div>
    </div>
  );
}
