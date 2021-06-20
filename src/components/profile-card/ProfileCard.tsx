import styles from "./profile-card.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectProfile } from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";

export default function ProfileCard() {
  const user = useAppSelector(selectProfile);

  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.bannerImg}
          src="https://static-exp1.licdn.com/sc/h/9e0ckeb27mzi70ne80f4hv7il"
          alt="banner"
        />
        <div className={styles.profileImgWrapper}>
          <img
            className={styles.profileAvatar}
            src={
              user.displayImg ||
              "https://www.allhealthnetwork.org/wp-content/uploads/2020/09/profile-blank-1.png"
            }
            alt={user.name}
          />
        </div>
      </div>
      <div className={styles.profileInfoContainer}>
        <Link to="/profile" className={styles.link}>
          <div className={styles.profileName}>{user.name}</div>
        </Link>
        <p className={styles.profileTagline}>{user.tagline}</p>
        <hr />
        <div className={styles.profileName}>Followers</div>
        <p>{user.followers}</p>
        <div className={styles.profileName}>Following</div>
        <p>{user.following}</p>
        <div className={styles.profileName}>Posts</div>
        <p>{user.posts.length}</p>
      </div>
    </div>
  );
}
