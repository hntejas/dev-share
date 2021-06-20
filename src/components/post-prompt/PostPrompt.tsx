import Avatar from "../avatar/avatar";
import { HiPhotograph } from "react-icons/hi"; // HiCode

import styles from "./post-prompt.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectProfile } from "../../features/profile/profileSlice";

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
        <button className={styles.postActionBtn}>
          <HiPhotograph />
          <span>Photo</span>
        </button>
        {/* <button className={styles.postActionBtn}>
          <HiCode />
          <span>Code</span>
        </button> */}
      </div>
    </div>
  );
}
