import { useState, SyntheticEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { loginAsync } from "./auth.service";
import { selectAuth } from "./authSlice";
import { showToast } from "../../utils/helper";

import styles from "./auth.module.css";

type location = {
  state?: {
    from: string;
  };
};

export default function Login() {
  const validators = {
    email: (email: string): boolean => {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    },
    password: (password: string): boolean => {
      return !!password && password.length > 0;
    },
  };
  const initialUserData = {
    email: {
      value: "",
      isValid: false,
      errorMessage: "Enter valid email",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "Enter valid password",
    },
  };

  let from: string | undefined;
  const [userData, setUserData] = useState(initialUserData);
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const navigate = useNavigate();
  const { state } = useLocation() as location;
  from = state?.from;

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const isEmailvalid = validateForm();
    if (!isEmailvalid) {
      setShowErrors(true);
    } else {
      const loginUser = {
        email: userData.email.value,
        password: userData.password.value,
      };

      const response = await dispatch(loginAsync(loginUser));
      if (response.payload.success) {
        navigate(from || "/");
      } else {
        showToast(
          <p>
            Login failed!{" "}
            {response.payload.error && response.payload.error.message}
          </p>
        );
      }
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    showErrors && setShowErrors(false);
    const currentTarget = e.currentTarget;
    const id = e.currentTarget.id as "email" | "password";
    setUserData(function (state) {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy[id].isValid = validateField(id, currentTarget.value);
      stateCopy[id].value = currentTarget.value;
      return stateCopy;
    });
  };

  const validateField = (field: "email" | "password", value: string) => {
    return validators[field](value);
  };

  const validateForm = (): boolean => {
    const isFormValid = true;
    for (let field in userData) {
      const inputField = field as "email" | "password";
      if (!userData[inputField].isValid) {
        return false;
      }
    }
    return isFormValid;
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={onSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={userData.email.value}
          onChange={onChangeHandler}
        />
        <p
          className={styles.errorInput}
          style={{
            display: !userData.email.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.email.errorMessage}
        </p>
        <label>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={userData.password.value}
          onChange={onChangeHandler}
        />
        <p
          className={styles.errorInput}
          style={{
            display:
              !userData.password.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.password.errorMessage}
        </p>
        <button
          type="submit"
          className={styles.authBtn}
          disabled={auth.status === "loading"}
        >
          {auth.status === "loading" ? "Logging In.." : "Login"}
        </button>
        <p>
          Not a user?{" "}
          <Link state={{ from: from }} replace to={"/signup?from=" + from}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
