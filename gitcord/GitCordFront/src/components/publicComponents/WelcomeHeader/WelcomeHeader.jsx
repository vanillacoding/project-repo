import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import styled from "styled-components";
import PropTypes from "prop-types";

import useLogout from "../../customHooks/useLogout";
import route from "../../../constants/routes";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";

const WelComeHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100vw;
  height: 10vh;
  color: #ffffff;
`;

const HeaderContainer = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0.5em;

  .nav-left {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 15em;
    height: 100%;
    background:rgba(58, 72, 85, 0.7);
    border-radius: 10px;
  }

  .nav-title {
    font-size: 2.5rem;
  }

  .nav-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 18em;
    height: 100%;
    background: rgba(58, 72, 85, 0.7);
    border-radius: 10px;

    &-user {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }

  .user-icon {
    margin-right: 1em;
  }

  .logout-icon {
    border-radius: 20%;
    transition: all .5s ease;
    cursor: pointer;

    &:hover {
      color: #000000;
      background: rgba(72, 219, 251, 0.6);
      box-shadow: 0px 0px 0px 5px rgba(72, 219, 251, 0.6);
    }
  }
`;

function WelComeHeader({ currentUser, isLogin = true }) {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  const handleLogoutIconClick = useLogout(dispatch, setIsLogout);

  if (isLogout) return <Redirect to={route.LOGIN} />;

  return (
    <WelComeHeaderStyle>
      <HeaderContainer>
        <div className="nav-left">
          <MainIcon
            width="60px"
            height="60px"
          />
          <span className="nav-title">
            GitCord
          </span>
        </div>
      </HeaderContainer>
      <HeaderContainer>
        {
          isLogin &&
            <div className="nav-right">
              <RiLogoutBoxFill
                size={30}
                onClick={handleLogoutIconClick}
                className="logout-icon"
              />
              <div className="nav-right-user">
                <FaUserCircle className="user-icon" size={30} />
                { currentUser && currentUser.email }
              </div>
            </div>
        }
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

WelComeHeader.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  isLogin: PropTypes.bool
};

export default React.memo(WelComeHeader);
