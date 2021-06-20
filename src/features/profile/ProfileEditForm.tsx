import { useState } from "react";
import styles from "./profile.module.css";
import { useAppDispatch } from "../../app/hooks";
import { updateUserAsync } from "./profile.service";
import { showToast } from "../../utils/helper";
import { logoutUser } from "../auth/authSlice";

type ProfileFormProp = {
  closeModal: () => void;
  user: any;
};

export default function ProfileEditForm({ closeModal, user }: ProfileFormProp) {
  const [name, setName] = useState(user.name);
  const [tagline, setTagline] = useState(user.tagline);
  const [about, setAbout] = useState(user.about);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const updateInfo = async () => {
    const isInfoValid = isUserInfoValid();
    if (isInfoValid) {
      setLoading(true);
      const response = await dispatch(
        updateUserAsync({ name, tagline, about })
      );

      if (response.payload.success) {
        showToast(<p>Profile Updated!</p>);
        closeModal();
      } else {
        if (response.payload && String(response.payload.status) === "401") {
          dispatch(logoutUser());
          showToast(<p>Please login to continue</p>);
          return;
        }
        showToast(<p>{response.payload.error.message}</p>);
      }
      setLoading(false);
    }
  };

  const isUserInfoValid = () => {
    return name.length >= 4 && tagline.length > 4;
  };

  return (
    <div className={styles.profileFormContainer}>
      <div className={styles.flexWrapper}>
        <h3>Create a post</h3>
        <span onClick={() => closeModal()} className={styles.closeBtn}>
          &#x274C;
        </span>
      </div>
      <hr />
      <div className={styles.profileForm}>
        <div className={styles.inputWrapper}>
          <label>
            Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>
            Tagline<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.currentTarget.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>About</label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.currentTarget.value)}
          />
        </div>
        <button
          onClick={() => updateInfo()}
          className={styles.editBtn}
          disabled={loading}
        >
          {loading ? "Saving" : "Save"}
        </button>
      </div>
    </div>
  );
}
