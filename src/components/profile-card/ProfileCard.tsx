import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectProfile } from "../../features/profile/profileSlice";

import BlankAvatar from "../../assets/images/blank-profile.png";
import ProfileBanner from "../../assets/images/profile-banner.svg";
import styles from "./profile-card.module.css";

export default function ProfileCard() {
  const user = useAppSelector(selectProfile);

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.bannerImg} src={ProfileBanner} alt="banner" />
        <div className={styles.profileImgWrapper}>
          <img
            className={styles.profileAvatar}
            src={user.displayImg || BlankAvatar}
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
