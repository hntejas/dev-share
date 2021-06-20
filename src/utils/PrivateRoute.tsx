import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";

type PrivateRouteProps = {
  path: string;
  [x: string]: any;
};

export default function PrivateRoute({ path, ...props }: PrivateRouteProps) {
  const auth = useAppSelector(selectAuth);

  return auth.isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} to="/login" replace />
  );
}
