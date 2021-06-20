import styles from "./feed-actor.module.css";
import { User } from "../../features/feed/Post";
import moment, { MomentInput } from "moment";
import Avatar from "../avatar/avatar";
import { Link } from "react-router-dom";

type FeedActorProp = {
  user: User;
  timestamp?: number;
  hideAvatar?: boolean;
  avatarSize?: "SMALL" | "MEDIUM" | "LARGE";
  isCurrentUser?: boolean;
};

export default function FeedActor({
  user,
  timestamp,
  hideAvatar = false,
  avatarSize,
  isCurrentUser = true,
}: FeedActorProp) {
  return (
    <div className={styles.feedActorCard}>
      {!hideAvatar && (
        <Avatar
          avatarImg={user.displayImg}
          avatarName={user.name}
          avatarSize={avatarSize}
        />
      )}

      <div className={styles.feedActorDetails}>
        <Link
          to={"/profile/" + (isCurrentUser ? "" : user.id)}
          className={styles.link}
        >
          <span>{user.name}</span>
        </Link>
        <span className={styles.feedActorSubDetails}>{user.tagline}</span>
        {timestamp && (
          <span className={styles.feedActorSubDetails}>
            {moment(timestamp as MomentInput).fromNow(false)}
          </span>
        )}
      </div>
    </div>
  );
}
