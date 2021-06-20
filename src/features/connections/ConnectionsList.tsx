import { User } from "../feed/Post";
import ConnectionCard from "./ConnectionCard";

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
    <div
      style={{
        display: "flex",
        margin: "auto",
        width: "100%",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
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
