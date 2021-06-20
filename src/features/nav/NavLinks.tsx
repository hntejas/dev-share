import {
  IoHomeOutline,
  IoPeopleOutline,
  //IoBookmarkOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { SiAddthis } from "react-icons/si";
import styles from "./navlinks.module.css";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAuth, logoutUser } from "../auth/authSlice";
import { SyntheticEvent } from "react";

export default function NavLinks({
  setOpenPostForm,
}: {
  setOpenPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  if (!auth.isLoggedIn) {
    return <div className={styles.navlinkContainer}></div>;
  }

  const logoutHandler = (e: SyntheticEvent) => {
    localStorage.removeItem("devShareAuth");
    dispatch(logoutUser());
  };

  return (
    <div className={styles.navlinkContainer}>
      <NavLink className={styles.navlink} to="/">
        <IoHomeOutline />
        <span>Home</span>
      </NavLink>
      <NavLink className={styles.navlink} to="/connections">
        <IoPeopleOutline />
        <span>People</span>
      </NavLink>
      <div
        className={[styles.navlink, styles.mobileOnly].join(" ")}
        onClick={() => setOpenPostForm(true)}
      >
        <SiAddthis />
        <span>Post</span>
      </div>
      {/* <NavLink className={styles.navlink} to="/">
        <IoBookmarkOutline />
        <span>Saved</span>
      </NavLink> */}
      <div className={[styles.navlink, styles.hoverMenuContainer].join(" ")}>
        <IoPersonCircleOutline />
        <span>Me</span>

        <div className={styles.hoverMenu}>
          <div className={styles.hoverMenuItem}>
            <Link to="/profile" className={styles.navlink}>
              Profile
            </Link>
          </div>
          <div className={styles.hoverMenuItem} onClick={logoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}