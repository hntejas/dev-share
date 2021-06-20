import FollowSuggestions from "../../components/follow-suggestions/FollowSuggestions";
import PostPrompt from "../../components/post-prompt/PostPrompt";
import ProfileCard from "../../components/profile-card/ProfileCard";
import Post from "./Post";
import { useAppSelector } from "../../app/hooks";
import { selectPost } from "./postSlice";

export default function FeedPage({
  setOpenPostForm,
  openPostForm,
}: {
  setOpenPostForm: React.Dispatch<React.SetStateAction<boolean>>;
  openPostForm: boolean;
}) {
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
      <div className="sticky mw-300 full-width-child">
        <div className="tablet-only">
          <ProfileCard />
        </div>
        <FollowSuggestions />
      </div>
    </>
  );
}
