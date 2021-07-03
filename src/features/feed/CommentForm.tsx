import { MutableRefObject, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Avatar from "../../components/avatar/Avatar";
import { FiSend } from "react-icons/fi";

import { selectProfile } from "../profile/profileSlice";
import { submitCommentAsync } from "./post.service";

import styles from "./post.module.css";

export default function CommentForm({
  postId,
  commentId,
}: {
  postId: string;
  commentId?: string;
}) {
  const user = useAppSelector(selectProfile);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const commentInput =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  const onChangeHandler = (e: ContentEditableEvent) => {
    const value: string = e.target && e.target.value;
    value && setComment(value);
  };

  const submitComment = () => {
    dispatch(
      submitCommentAsync({
        postId: postId,
        commentText: comment,
        repliedTo: commentId,
      })
    );
    setComment("");
  };

  return (
    <>
      <div className={styles.commentForm}>
        <Avatar
          avatarImg={user.displayImg}
          avatarName={user.name}
          avatarSize="MEDIUM"
        />
        <div className={styles.commentInputWrapper}>
          <ContentEditable
            innerRef={commentInput}
            html={comment}
            onChange={onChangeHandler}
            className={styles.commentInput}
          />
          <FiSend size={"1.4rem"} onClick={submitComment} />
        </div>
      </div>
    </>
  );
}
