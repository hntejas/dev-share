import styles from "./navbar.module.css";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";

export default function NavBar({
  setOpenPostForm,
}: {
  setOpenPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.navbar}>
      <h3>
        <Link to="/" className={styles.link}>
          Dev Share
        </Link>
      </h3>

      <NavLinks setOpenPostForm={setOpenPostForm} />
    </div>
  );
}
