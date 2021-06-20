import { useState, SyntheticEvent } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";

import { showToast } from "../../utils/helper";
import styles from "./auth.module.css";
import { signUpAsync } from "./auth.service";

type FieldId = "email" | "password" | "username" | "name";

export default function SignUp() {
  const validators = {
    username: (name: string) => {
      return name.length > 0;
    },
    name: (name: string) => {
      return name.length > 0;
    },
    email: (email: string) => {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    },
    password: (password: string) => {
      return password.length >= 8;
    },
    reconfirmPassword: (reconfirmPassword: string) => {
      return reconfirmPassword === userData.password.value;
    },
  };
  const initialUserData = {
    username: {
      value: "",
      isValid: false,
      errorMessage: "Please enter username",
    },
    name: {
      value: "",
      isValid: false,
      errorMessage: "Please enter name",
    },
    email: {
      value: "",
      isValid: false,
      errorMessage: "Please enter valid email",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "Password must be atleast 8 characters",
    },
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUserData);
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      setShowErrors(true);
    } else {
      const user = {
        username: userData.username.value,
        name: userData.name.value,
        email: userData.email.value,
        password: userData.password.value,
      };

      let from: string | null;
      from = query.get("from");
      const response = await dispatch(signUpAsync(user));

      if (response.payload.success) {
        navigate(from || "/");
      } else {
        showToast(
          <p>
            Signup Failed!!{" "}
            {response.payload.error && response.payload.error.message}
          </p>
        );
      }
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    showErrors && setShowErrors(false);
    const currentTarget = e.currentTarget;
    const id = e.currentTarget.id as FieldId;
    setUserData(function (state) {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy[id].isValid = validateField(id, currentTarget.value);
      stateCopy[id].value = currentTarget.value;

      return stateCopy;
    });
  };

  const validateField = (field: FieldId, value: string) => {
    return validators[field](value);
  };

  const validateForm = () => {
    const isFormValid = true;
    for (let field in userData) {
      const inputField = field as FieldId;
      if (!userData[inputField].isValid) {
        return false;
      }
    }
    return isFormValid;
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={onSubmit}>
        <h3>Signup</h3>
        <label>Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={userData.name.value}
          onChange={onChangeHandler}
        />
        <p
          className={styles.errorInput}
          style={{
            display: !userData.name.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.name.errorMessage}
        </p>
        <label>Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter Username"
          value={userData.username.value}
          onChange={onChangeHandler}
        />
        <p
          className={styles.errorInput}
          style={{
            display:
              !userData.username.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.username.errorMessage}
        </p>
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
          value={userData.password.value}
          placeholder="Enter Password"
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
        <button type="submit" className={styles.authBtn}>
          Signup
        </button>
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
