import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectConnection } from "../connections/connectionSlice";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import FollowSuggestions from "../../components/follow-suggestions/FollowSuggestions";
import Modal from "../../components/modal/Modal";
import Post from "../feed/Post";
import ProfileImageForm from "./ProfileImageForm";
import ProfileEditForm from "./ProfileEditForm";
import { selectProfile } from "./profileSlice";
import { HiPencil } from "react-icons/hi";

import { loadProfile } from "./profile.service";
import {
  followUserAsync,
  unfollowUserAsync,
} from "../connections/connection.service";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const { userId } = useParams();
  const userProfile = useAppSelector(selectProfile);
  const userConnections = useAppSelector(selectConnection);
  const [editProfile, setEditProfile] = useState(false);
  const [editProfileImg, setEditProfileImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchUser() {
      const response = await loadProfile(userId);
      if (response.success) {
        setProfile(response.user);
      }
      setLoading(false);
    }
    if (userId) {
      setLoading(true);
      fetchUser();
    } else {
      setLoading(false);
      //setProfile(userProfile);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setProfile(userProfile);
    }
  }, [userId, userProfile]);

  if (profile.status === "loader-loading" || loading) {
    return <h2>Loading..</h2>;
  }

  const isFollowing = !!userConnections.following.find(
    (user) => user.id === userId
  );

  const followHandler = (isFollowing: boolean) => {
    isFollowing && dispatch(unfollowUserAsync(userId));
    !isFollowing && dispatch(followUserAsync(userId));
  };

  return (
    <>
      <div className={styles.container}>
        <img
          src="https://static-exp1.licdn.com/sc/h/9e0ckeb27mzi70ne80f4hv7il"
          alt={profile.name}
        />
        <div className={styles.psuedoContainer}>
          <div className={styles.displayImgContainer}>
            <img
              src={
                profile.displayImg ||
                "https://www.allhealthnetwork.org/wp-content/uploads/2020/09/profile-blank-1.png"
              }
              className={styles.displayImg}
              alt={profile.name}
            />
            {!userId && (
              <div
                className={styles.editHover}
                onClick={() => setEditProfileImg(true)}
              >
                <HiPencil />
              </div>
            )}
          </div>
          {!userId ? (
            <button
              className={styles.editBtn}
              onClick={() => setEditProfile(true)}
            >
              Edit
            </button>
          ) : (
            <button
              className={styles.editBtn}
              onClick={() => followHandler(isFollowing)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div style={{ margin: "0 1rem" }}>
          <h2 className={styles.profileName}>{profile.name}</h2>
          <p className={styles.profileTagline}>{profile.tagline}</p>
          <br />
          <h3>About</h3>
          <div className={styles.profileAbout}>{profile.about}</div>
          <br />
          <h3>Dashboard</h3>
          <div className={styles.dashboard}>
            <div className={styles.dashboardStat}>
              <h3>{profile.followers}</h3>
              <h3>Followers</h3>
            </div>
            <div className={styles.dashboardStat}>
              <h3>{profile.following}</h3>
              <h3>Following</h3>
            </div>
            <div className={styles.dashboardStat}>
              <h3>{profile.posts.length}</h3>
              <h3>Posts</h3>
            </div>
          </div>
          <hr />
        </div>

        <div style={{ margin: "1rem" }}>
          <h3>Your Posts</h3>
          {profile.posts.map((post) => (
            <Post post={post} key={post.id}></Post>
          ))}
        </div>

        {editProfile && (
          <Modal isOpen={editProfile} closeModal={() => {}}>
            <ProfileEditForm
              closeModal={() => {
                setEditProfile(false);
              }}
              user={profile}
            />
          </Modal>
        )}
        {editProfileImg && (
          <Modal isOpen={editProfileImg} closeModal={() => {}}>
            <ProfileImageForm
              closeModal={() => {
                setEditProfileImg(false);
              }}
              displayImg={profile.displayImg}
              cloudinary_id={profile.cloudinary_id}
            />
          </Modal>
        )}
      </div>
      <FollowSuggestions />
    </>
  );
}
