import { useRef, MutableRefObject, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { useAppDispatch } from "../../app/hooks";

import { updateUserImgAsync } from "./profile.service";
import { showToast } from "../../utils/helper";

import styles from "./profile.module.css";
import btnStyles from "../../components/post-prompt/post-prompt.module.css";
import BlankAvatar from "../../assets/images/blank-profile.png";

type ProfileImageFormProp = {
  displayImg?: string;
  cloudinary_id?: string;
  closeModal: () => void;
};

const imgStatusMap = {
  new: false,
  update: false,
  remove: false,
};
export default function ProfileImageForm({
  displayImg,
  cloudinary_id,
  closeModal,
}: ProfileImageFormProp) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [img, setImg] = useState(displayImg || "");
  const [imgStatus, setImgStatus] = useState(imgStatusMap);
  const dispatch = useAppDispatch();
  const fileInput =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    if (fileList[0].size > 1000000) {
      alert("Image size cannot be more than 1MB");
      return;
    }
    setSelectedFile(fileList[0]);
    setImg(URL.createObjectURL(fileList[0]));
    if (!displayImg) {
      setImgStatus({ ...imgStatusMap, new: true });
    } else {
      setImgStatus({ ...imgStatusMap, update: true });
    }
  };

  const removeImg = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
    }
    setSelectedFile(undefined);
    setImg(BlankAvatar);
    setImgStatus({ ...imgStatusMap, remove: true });
  };

  const updateChanges = async () => {
    const formData = new FormData();
    let response;
    if (imgStatus.remove) {
      return;
    }
    formData.append("img", selectedFile as Blob);
    if (imgStatus.update && cloudinary_id) {
      formData.append("cloudinary_id", cloudinary_id);
    }

    response = await dispatch(updateUserImgAsync(formData));

    if (response.payload.success) {
      showToast(
        imgStatus.remove ? "Profile image removed" : "Profile image updated!"
      );
      closeModal();
    }
  };

  return (
    <div className={styles.profileFormContainer}>
      <div className={styles.flexWrapper}>
        <h3>Profile Photo</h3>
        <span onClick={() => closeModal()} className={styles.closeBtn}>
          &#x274C;
        </span>
      </div>
      <hr />
      <br />
      <div className={styles.flexWrapper}>
        <img
          src={img || BlankAvatar}
          className={styles.previewImg}
          alt="profile-preview"
        ></img>
      </div>
      <div className={btnStyles.flexWrapper}>
        <button className={btnStyles.postActionBtn}>
          <HiPhotograph />
          <span>Upload</span>
          <input
            style={{
              opacity: 0.0,
              position: "absolute",
              zIndex: 10,
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
            ref={fileInput}
            type={"file"}
            accept="image/*"
            onChange={handleImageChange}
          ></input>
        </button>
        <button className={btnStyles.postActionBtn} onClick={removeImg}>
          <span>Remove</span>
        </button>

        <button
          className={[styles.editBtn, styles.submitChangesBtn].join(" ")}
          onClick={updateChanges}
        >
          <span>Update</span>
        </button>
      </div>
    </div>
  );
}
