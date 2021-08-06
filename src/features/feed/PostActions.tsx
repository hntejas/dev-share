import { HiOutlineThumbUp, HiOutlineChat } from "react-icons/hi";
import { useAppDispatch } from "../../app/hooks";
import { likePostAsync, unlikePostAsync } from "./post.service";
import styles from "./post.module.css";

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
        style={{ color: isLiked ? "var(--primary-blue)" : "initial" }}
      >
        <HiOutlineThumbUp /> <span>Like</span>
      </div>
      <div className={styles.actionBtn} onClick={loadComment}>
        <HiOutlineChat /> <span>Comment</span>
      </div>
    </div>
  );
}
