import FeedActor from "../../components/feed-actor/FeedActor";

import { Comment as CommentType } from "./Post";
import Avatar from "../../components/avatar/avatar";
import styles from "./post.module.css";

type CommentProp = {
  comment: CommentType;
};

export default function CommentReply({ comment }: CommentProp) {
  return (
    <div className={styles.commentReplyContainer}>
      <Avatar
        avatarImg={comment.user.displayImg}
        avatarName={comment.user.name}
        avatarSize="SMALL"
      />
      <div className={styles.commentDetailContainer}>
        <div className={styles.commentReplyDetail}>
          <FeedActor user={comment.user} hideAvatar={true} />
          <div className={styles.commentText}>{comment.commentText}</div>
        </div>
        {/* <div className={styles.commentActionContainer}>
          <span className={styles.commentActionbtn}>
            Like • {comment.commentLikes.length}{" "}
          </span>{" "}
        </div> */}
      </div>
    </div>
  );
}
