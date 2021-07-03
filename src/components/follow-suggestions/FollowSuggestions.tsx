import FeedActor from "../feed-actor/FeedActor";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectConnection } from "../../features/connections/connectionSlice";
import { followUserAsync } from "../../features/connections/connection.service";

import styles from "./suggestions.module.css";

export default function FollowSuggestions() {
  const { suggestions } = useAppSelector(selectConnection);
  const dispatch = useAppDispatch();

  const followHandler = (userId: string) => {
    dispatch(followUserAsync(userId));
  };

  return (
    <div className={styles.suggestionContainer}>
      <h4 className={styles.suggestionHeader}>Suggestions</h4>
      {suggestions.map((user) => (
        <div className={styles.suggestionItem} key={user.name}>
          <FeedActor user={user} avatarSize="MEDIUM" isCurrentUser={false} />
          <button
            className={styles.suggestionAction}
            title="Follow"
            onClick={() => followHandler(user.id)}
          >
            + Follow
          </button>
        </div>
      ))}
    </div>
  );
}
