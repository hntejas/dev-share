import { User } from "../feed/Post";
import profileCardStyles from "../../components/profile-card/profile-card.module.css";
import styles from "./connections.module.css";
import { useAppDispatch } from "../../app/hooks";
import { followUserAsync, unfollowUserAsync } from "./connection.service";
import { Link } from "react-router-dom";

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
          src="https://static-exp1.licdn.com/sc/h/9e0ckeb27mzi70ne80f4hv7il"
          alt="banner"
        />
        <div className={profileCardStyles.profileImgWrapper}>
          <img
            className={profileCardStyles.profileAvatar}
            src={
              user.displayImg ||
              "https://www.allhealthnetwork.org/wp-content/uploads/2020/09/profile-blank-1.png"
            }
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
