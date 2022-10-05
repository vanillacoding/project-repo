import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import * as userActions from "../../redux/reducers/user";
import { googleLogout } from "../../api/firebase/googleAuth";
import { deleteUserCookie } from "../../utils/deleteUserCookie";
import styles from "./Nav.module.css";

const Nav = ({ socket }) => {
  const user = useSelector(state => state.user);
  const isMatched = useSelector(state => state.roomMatch.isMatched);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutBtnClick = () => {
    socket.emit("leaveRoom", { userSocketId: user.socketId, partnerSocketId });

    dispatch(userActions.logoutUser());
    deleteUserCookie();
    googleLogout();

    history.push("/auth/login");
  };

  const handleHomeBtnClick = () => {
    socket.emit("subtractWaitingQue");

    history.push("/");
  };

  const handleRankingBtnClick = () => {
    socket.emit("subtractWaitingQue");

    history.push("/ranking");
  };

  return (
    <>
      {!isMatched &&
        <div className={styles.wrapper}>
          <button
            className={styles.headerBtn}
            onClick={handleHomeBtnClick}
          >
            <span>Home</span>
          </button>
          {user.email &&
            <button
              className={styles.headerBtn}
              onClick={handleLogoutBtnClick}
            >
              <span>Logout</span>
            </button>}
          <button
            className={styles.headerBtn}
            onClick={handleRankingBtnClick}
          >
            <span>Ranking</span>
          </button>
        </div>
      }
    </>
  );
};

export default Nav;

Nav.propTypes = {
  socket: PropTypes.object.isRequired,
};
