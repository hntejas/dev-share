import { User } from "../feed/feed.type";
import ConnectionCard from "./ConnectionCard";

import styles from "./connections.module.css";

type ConnectionListProp = {
  users: Array<User>;
  pageType: "FOLLOWERS" | "FOLLOWING" | "NEW";
  following?: Array<User>;
};

type MappedUser = {
  user: User;
  isFollowing: boolean;
};

export default function ConnectionList({
  users,
  pageType,
  following,
}: ConnectionListProp) {
  let mappedUsers: any = users;

  if (pageType === "FOLLOWERS") {
    mappedUsers = users.map((user) => {
      const isFollowing =
        following && following.find((fuser) => fuser.id === user.id);
      return { user, isFollowing: isFollowing };
    });
  }

  return (
    <div className={styles.connectionsContainer}>
      {pageType === "FOLLOWERS"
        ? mappedUsers.map((mappedUser: MappedUser) => (
            <ConnectionCard
              user={mappedUser.user}
              key={mappedUser.user.id}
              isFollowing={
                pageType === "FOLLOWERS" ? mappedUser.isFollowing : false
              }
            />
          ))
        : users.map((user) => (
            <ConnectionCard
              user={user}
              key={user.id}
              isFollowing={pageType === "FOLLOWING"}
            />
          ))}
    </div>
  );
}
