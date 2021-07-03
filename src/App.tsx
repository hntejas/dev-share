import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./features/nav/NavBar";
import FeedPage from "./features/feed/FeedPage";
import ProfilePage from "./features/profile/ProfilePage";
import ConnectionPage from "./features/connections/ConnectionsPage";
import { ToastContainer } from "react-toastify";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/Signup";
import PrivateRoute from "./utils/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { logoutUser, selectAuth } from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import { loadUserAsync } from "./features/profile/profile.service";
import { resetProfile } from "./features/profile/profileSlice";
import { loadUserConnectionsAsync } from "./features/connections/connection.service";
import { resetConnection } from "./features/connections/connectionSlice";
import { loadFeedAsync } from "./features/feed/post.service";
import Modal from "./components/modal/Modal";
import PostForm from "./features/feed/PostForm";

function App() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [openPostForm, setOpenPostForm] = useState(false);

  useEffect(() => {
    (async () => {
      if (auth.isLoggedIn) {
        const response = await dispatch(loadUserAsync());
        if (response.payload.status === 401) {
          dispatch(logoutUser());
        }
        dispatch(loadUserConnectionsAsync());
        dispatch(loadFeedAsync());
      } else {
        dispatch(resetProfile());
        dispatch(resetConnection());
      }
    })();
  }, [auth.isLoggedIn, dispatch]);

  return (
    <div>
      <NavBar setOpenPostForm={setOpenPostForm} />
      <ToastContainer />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <PrivateRoute path="/profile/:userId" element={<ProfilePage />} />
          <PrivateRoute path="/profile" element={<ProfilePage />} />
          <PrivateRoute path="/connections" element={<ConnectionPage />} />
          <PrivateRoute
            path="/"
            element={<FeedPage setOpenPostForm={setOpenPostForm} />}
          />
        </Routes>
        {openPostForm && (
          <Modal isOpen={openPostForm} closeModal={() => {}}>
            <PostForm closeModal={() => setOpenPostForm(false)} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
