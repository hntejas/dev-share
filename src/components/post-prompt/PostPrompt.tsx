import Avatar from "../avatar/Avatar";
import { HiPhotograph } from "react-icons/hi";

import { useAppSelector } from "../../app/hooks";
import { selectProfile } from "../../features/profile/profileSlice";

import styles from "./post-prompt.module.css";

type PostForm = {
  openForm: () => void;
};

export default function PostPrompt({ openForm }: PostForm) {
  const user = useAppSelector(selectProfile);

  return (
    <div className={styles.container}>
      <div className={styles.flexWrapper}>
        <Avatar avatarImg={user.displayImg} avatarName={user.name} />
        <button className={styles.postCtaBtn} onClick={() => openForm()}>
          Start a Post
        </button>
      </div>
      <div className={styles.flexWrapper}>
        <button className={styles.postActionBtn} onClick={() => openForm()}>
          <HiPhotograph />
          <span>Photo</span>
        </button>
      </div>
    </div>
  );
}
