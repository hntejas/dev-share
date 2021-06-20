import { HiOutlineThumbUp, HiOutlineChat } from "react-icons/hi"; //HiThumbUp
import styles from "./post.module.css";
import { useAppDispatch } from "../../app/hooks";
import { likePostAsync, unlikePostAsync } from "./post.service";

type PostActionProps = {
  isLiked: boolean;
  postId: string;
  loadComment: () => void;
  userId: string;
};

export default function PostActions({
  loadComment,
  postId,
  isLiked,
  userId,
}: PostActionProps) {
  const dispatch = useAppDispatch();

  const likeHandler = () => {
    isLiked
      ? dispatch(unlikePostAsync({ postId, userId }))
      : dispatch(likePostAsync({ postId, userId }));
  };

  return (
    <div
      className={[styles.flex, styles.alignCenter, styles.flexStart].join(" ")}
    >
      <div
        className={styles.actionBtn}
        onClick={likeHandler}
        style={{ color: isLiked ? "#0A66C2" : "initial" }}
      >
        <HiOutlineThumbUp /> <span>Like</span>
      </div>
      <div className={styles.actionBtn} onClick={loadComment}>
        <HiOutlineChat /> <span>Comment</span>
      </div>
    </div>
  );
}
