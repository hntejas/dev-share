import { useAppSelector } from "../../app/hooks";
import { selectPost } from "./postSlice";

import FollowSuggestions from "../../components/follow-suggestions/FollowSuggestions";
import PostPrompt from "../../components/post-prompt/PostPrompt";
import ProfileCard from "../../components/profile-card/ProfileCard";
import Post from "./Post";

type FeedPageProp = {
  setOpenPostForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FeedPage({ setOpenPostForm }: FeedPageProp) {
  const { posts, status } = useAppSelector(selectPost);

  return (
    <>
      <div className="desktop-only">
        <ProfileCard />
      </div>

      <div className="feed-container">
        <PostPrompt
          openForm={() => {
            setOpenPostForm((state) => !state);
          }}
        />
        {status === "loading"
          ? "Loading..."
          : posts.map((post) => <Post post={post} key={post.id} />)}
      </div>
      <div className="sticky mw-300">
        <div className="tablet-only">
          <ProfileCard />
        </div>
        <FollowSuggestions />
      </div>
    </>
  );
}
