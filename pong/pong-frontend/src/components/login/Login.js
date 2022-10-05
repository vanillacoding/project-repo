import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as userActions from "../../redux/reducers/user";
import { googleLogin } from "../../api/firebase/googleAuth";
import googleLogo from "../../assets/images/googleLogo.png";
import styles from "../home/Home.module.css";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const setUser = (user) => {
    dispatch(userActions.setUser(user));
  };

  const handleClick = () => {
    googleLogin(goHomePage, setUser);
  };

  const goHomePage = () => {
    history.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentsWrapper}>
        <div className={styles.title}>
          <span>PONG!</span>
        </div>
        <div className={styles.content}>
          <div className={styles.googleButton}>
            <div
              onClick={handleClick}
            >
              <img src={googleLogo} />
              Sign in with Google
            </div>
          </div>
          <div className={styles.pressText}>
            please google login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
