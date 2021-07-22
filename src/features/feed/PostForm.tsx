import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  SyntheticEvent,
} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { HiPhotograph } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPost } from "./postSlice";
import { selectProfile } from "../profile/profileSlice";

import FeedActor from "../../components/feed-actor/FeedActor";
import { submitPostSync } from "./post.service";
import { showToast } from "../../utils/helper";
import { User } from "./feed.type";

import styles from "./post.module.css";
import btnStyles from "../../components/post-prompt/post-prompt.module.css";

type PostFormType = {
  closeModal: () => void;
};

export default function PostForm({ closeModal }: PostFormType) {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const { id, name, displayImg, tagline, about } =
    useAppSelector(selectProfile);

  const postInput =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const fileInput =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const submitPost = async (e: SyntheticEvent) => {
    const formData = new FormData();
    selectedFile && formData.append("img", selectedFile as Blob);
    text && formData.append("content", text);

    setIsPosting(true);
    const response = await dispatch(submitPostSync(formData));

    if (response.payload.success) {
      closeModal();
      showToast(<p>Posted Successfully!!</p>);
    } else {
      showToast(<p>Ops! Something went wrong, Try again later</p>);
    }
    setIsPosting(false);
  };

  const textChangeHandler = (e: ContentEditableEvent) => {
    if (e.target) {
      setText(e.target.value);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    if (fileList[0].size > 1000000) {
      alert("Image size cannot be more than 1MB");
      return;
    }
    setSelectedFile(fileList[0]);
  };

  const removeImg = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
    }
    setSelectedFile(undefined);
  };

  useEffect(() => {
    if (postInput.current !== null) {
      postInput.current.focus();
    }
  }, []);

  return (
    <div
      className={styles.postFormContainer}
      style={
        post.status === "loading"
          ? { pointerEvents: "none", opacity: "0.9" }
          : {}
      }
    >
      <div className={styles.flexWrapper}>
        <h3>Create a post</h3>
        <span onClick={() => closeModal()} className={styles.closeBtn}>
          &#x274C;
        </span>
      </div>
      <hr />
      <div style={{ maxWidth: "80%", margin: "0.5rem 0" }}>
        <FeedActor
          user={{ id, name, displayImg, tagline, about } as User}
          avatarSize={"MEDIUM"}
        />
      </div>
      <div className={styles.flexWrapper}>
        <ContentEditable
          innerRef={postInput}
          html={text}
          onChange={textChangeHandler}
          className={styles.postEditor}
          data-placeholder="What do you want to talk about"
        ></ContentEditable>
      </div>
      {selectedFile && (
        <div className={styles.imagePreviewContainer}>
          <img
            src={URL.createObjectURL(selectedFile)}
            className={styles.previewImg}
            alt="post-preview"
          ></img>
          <span onClick={removeImg}>&#10006;</span>
        </div>
      )}
      <div className={styles.flexWrapper}>
        <div className={btnStyles.flexWrapper}>
          <button className={btnStyles.postActionBtn}>
            <HiPhotograph />
            <span>Photo</span>
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
          {/* <button className={btnStyles.postActionBtn}>
            <HiCode />
            <span>Code</span>
          </button> */}
        </div>
        <button
          disabled={(!text && !selectedFile) || isPosting}
          className={styles.postSubmitBtn}
          onClick={submitPost}
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
