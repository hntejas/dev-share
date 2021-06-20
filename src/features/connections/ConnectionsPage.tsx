import { SyntheticEvent, useState } from "react";
import ProfileCard from "../../components/profile-card/ProfileCard";
import styles from "./connections.module.css";
import ConnectionList from "./ConnectionsList";
import { useAppSelector } from "../../app/hooks";
import { selectConnection } from "./connectionSlice";

type PageTypes = "FOLLOWERS" | "FOLLOWING" | "NEW";
export default function ConnectionPage() {
  const [pageType, setPageType] = useState<PageTypes>("FOLLOWERS");
  const { suggestions, followers, following } =
    useAppSelector(selectConnection);

  const pageChangeHandler = (e: SyntheticEvent) => {
    if (
      e.currentTarget.id === "FOLLOWERS" ||
      e.currentTarget.id === "FOLLOWING" ||
      e.currentTarget.id === "NEW"
    ) {
      setPageType(e.currentTarget.id);
    }
  };

  const dataMap = {
    FOLLOWERS: followers,
    FOLLOWING: following,
    NEW: suggestions,
  };

  return (
    <>
      <div className="hide-in-mobile">
        <ProfileCard />
      </div>

      <div className={styles.container}>
        <div className={styles.connectionheader}>
          <div
            className={[
              styles.connectionTab,
              pageType === "FOLLOWERS" ? styles.activeTab : "",
            ].join(" ")}
            id="FOLLOWERS"
            onClick={pageChangeHandler}
          >
            Followers
          </div>
          <div
            className={[
              styles.connectionTab,
              pageType === "FOLLOWING" ? styles.activeTab : "",
            ].join(" ")}
            id="FOLLOWING"
            onClick={pageChangeHandler}
          >
            Following
          </div>
          <div
            className={[
              styles.connectionTab,
              pageType === "NEW" ? styles.activeTab : "",
            ].join(" ")}
            id="NEW"
            onClick={pageChangeHandler}
          >
            Explore
          </div>
        </div>
        <ConnectionList
          users={dataMap[pageType]}
          pageType={pageType}
          following={following}
        />
      </div>
    </>
  );
}
