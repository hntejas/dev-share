import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

import { User } from "../feed/feed.type";
import { followUserAsync, unfollowUserAsync } from "./connection.service";

import BlankAvatar from "../../assets/images/blank-profile.png";
import ProfileBanner from "../../assets/images/profile-banner.svg";
import profileCardStyles from "../../components/profile-card/profile-card.module.css";
import styles from "./connections.module.css";

type ConnectionCardProp = {
  user: User;
  isFollowing: boolean;
};

export default function ConnectionCard({
  user,
  isFollowing,
}: ConnectionCardProp) {
  const dispatch = useAppDispatch();

  const followHandler = () => {
    if (isFollowing) {
      dispatch(unfollowUserAsync(user.id));
    } else {
      dispatch(followUserAsync(user.id));
    }
  };
  return (
    <div className={styles.connectionCardContainer}>
      <div>
        <img
          className={profileCardStyles.bannerImg}
          src={ProfileBanner}
          alt="banner"
        />
        <div className={profileCardStyles.profileImgWrapper}>
          <img
            className={profileCardStyles.profileAvatar}
            src={user.displayImg || BlankAvatar}
            alt={user.name}
          />
        </div>
        <div className={profileCardStyles.profileInfoContainer}>
          <Link to={"/profile/" + user.id} className={profileCardStyles.link}>
            <div className={profileCardStyles.profileName}>{user.name}</div>
          </Link>
          <p
            className={[
              profileCardStyles.profileTagline,
              styles.connectionTagline,
            ].join(" ")}
          >
            {user.tagline}
          </p>
          <button className={styles.connectionBtn} onClick={followHandler}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}
