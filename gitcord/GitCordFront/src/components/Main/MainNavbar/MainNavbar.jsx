import React, { useCallback, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { ImArrowLeft } from "react-icons/im";
import { CgLogOut } from "react-icons/cg";
import { FaUserCircle, FaShareAltSquare } from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";

import useLogout from "../../customHooks/useLogout";
import route from "../../../constants/routes";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";
import ShareWindow from "./ShareWindow/ShareWindow";

const MainNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
  font-weight: bold;

  .navbar-icon {
    border-radius: 50%;
    transition: all .5s ease;
    cursor: pointer;

    &:hover {
      background: rgba(52, 31, 151, 0.6);
      box-shadow: 0px 0px 0px 5px rgba(52, 31, 151, 0.6);
      color: #ffffff;
    }
  }

  .navbar-left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 15vw;
  }

  .navbar-right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 30vw;

    &-logout {
      cursor: pointer;
    }
  }

  .share-window {
    position: absolute;
    display: inline-block;
    top: 4rem;
    right: 9rem;
    z-index: 5;
  }
`;

const ToggleButton = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

function MainNavbar({
  handleCopyButtonClick,
  currentUser,
  roomTitle,
  roomId,
  onToggleClick
}) {
  const { email } = currentUser;
  const [isLogout, setIsLogout] = useState(false);
  const [isOutRoom, setIsOutRoom] = useState(false);
  const [isShowShareWindow, setIsShowShareWindow] = useState(false);
  const dispatch = useDispatch();
  const handleLogoutIconClick = useLogout(dispatch, setIsLogout);

  const handleLeaveIconClick = useCallback(() => {
    setIsOutRoom(true);
  }, []);

  const handleShareIconClick = useCallback(() => {
    setIsShowShareWindow(isShowShareWindow => !isShowShareWindow);
  }, []);

  if (isOutRoom) return <Redirect to={route.HOME} />;
  if (isLogout) return <Redirect to={route.LOGIN} />;

  return (
    <MainNavbarContainer>
      <div className="navbar-left">
        <ImArrowLeft
          className="navbar-icon"
          size={30}
          onClick={handleLeaveIconClick}
        />
        <MainIcon width="30px" height="30px" />
        {roomTitle}
      </div>
      <div className="navbar-right">
        <div className="navbar-right-toggle">
          <ToggleButton>
            <input type="checkbox" onClick={onToggleClick} />
            <span className="slider round" />
          </ToggleButton>
        </div>
        <FaShareAltSquare
          className="navbar-icon"
          size={35}
          onClick={handleShareIconClick}
        />
        <CgLogOut
          className="navbar-icon"
          size={30}
          onClick={handleLogoutIconClick}
        />
        <FaUserCircle size={30} />
        {email}
        {
          isShowShareWindow &&
            <div className="share-window">
              <ShareWindow
                url={roomId}
                handleCopyButtonClick={handleCopyButtonClick}
              />
            </div>
        }
      </div>
    </MainNavbarContainer>
  );
}

MainNavbar.propTypes = {
  handleCopyButtonClick: PropTypes.func.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  roomTitle: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired
};

export default React.memo(MainNavbar);
