import FeedActor from "../../components/feed-actor/FeedActor";
import styles from "./post.module.css";
import PostActions from "./PostActions";
import CommentSection from "./CommentSection";
import { HiThumbUp } from "react-icons/hi";
import ContentEditable from "react-contenteditable";
import { useState } from "react";
import { selectProfile } from "../profile/profileSlice";
import { useAppSelector } from "../../app/hooks";

export type User = {
  id: string;
  displayImg: string;
  name: string;
  tagline?: string;
};

export type Comment = {
  post: string;
  id: string;
  user: User;
  commentText: string;
  commentLikes: Array<string>;
  repliedTo?: string;
  replies?: Array<Comment>;
};

export type PostType = {
  id: string;
  user: User;
  createdAt: number;
  content: string;
  likes: Array<string>;
  img?: string;
  comments: Array<Comment>;
};

type PostProp = {
  post: PostType;
};

export default function Post({ post }: PostProp) {
  const [loadComment, setLoadComment] = useState(false);
  const user = useAppSelector(selectProfile);

  const isLiked = !!post.likes.find((like) => like === user.id);

  return (
    <div className={styles.postContainer}>
      <FeedActor user={post.user} timestamp={post.createdAt} />
      <div className={styles.postContent}>
        <ContentEditable
          html={post.content}
          disabled={true}
          onChange={() => {}}
        ></ContentEditable>
      </div>
      {post.img && <img src={post.img} className={styles.postImg} alt="Post" />}
      <div className={styles.postStatContainer}>
        <HiThumbUp className={styles.postLikesStatBtn} /> {post.likes.length}
      </div>
      <hr />
      <PostActions
        loadComment={() => setLoadComment(true)}
        postId={post.id}
        isLiked={isLiked}
        userId={user.id || ""}
      />
      {loadComment && (
        <>
          <CommentSection comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
}
