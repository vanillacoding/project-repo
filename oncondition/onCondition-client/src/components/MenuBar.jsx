import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { BsPentagon } from "react-icons/bs";
import { RiRunLine, RiHotelBedLine } from "react-icons/ri";
import { GiKnifeFork } from "react-icons/gi";

import Logout from "./Logout";
import Button from "./Button";

const MenuWrapper = styled.nav`
  position: fixed;
  z-index: 1;
  width: 300px;
  margin-top: -60px;
  height: calc(100% + 60px);
  background-color: ${({ theme }) => theme.background.sub};
  color: ${({ theme }) => theme.text.main};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;

    .top {
      position: fixed;
      display: none;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 1%;
      width: 100%;
    }

    .top button {
      margin-right: 0;
    }

    .hidden-menu {
      width: 200px;
    }

    .name {
        margin: 15%;
        font-weight: bold;
      }

    .menu {
      position: relative;
      padding: 5% 15% 5% 13%;
      background-color: ${({ theme }) => theme.background.sub};
      line-height: 3rem;
      text-align: left;
      cursor: pointer;
    }

    .menu .icon-wrapper {
      width: 80%;
    }

    .menu :first-child {
      position: absolute;
      top: 0.8rem;
      opacity: 0;
    }

    .left .menu :first-child svg {
      transform-origin: 62%;
    }

    .menu.clicked :first-child,
    .menu:hover :first-child {
      animation: move-icon-wrapper 5s infinite alternate;
      opacity: 1;
    }

    .menu.clicked :first-child svg,
    .menu:hover :first-child svg {
      animation: rotate-icon 1s infinite linear;
    }

    .menu.clicked {
      background-color: ${({ theme }) => theme.background.main};
    }

    .hidden-menu .menu {
      box-shadow: ${({ theme }) => theme.shadow.main};
    }

    .hidden-menu .menu :first-child {
      top: 0.5rem;
    }

    .hidden-menu .menu :first-child svg {
      transform-origin: 60% 40%;
    }

    .hidden-menu ul :first-child {
      padding-top: 5%;
      border-radius: 20px 20px 0 0;
    }

    .hidden-menu ul :last-child {
      padding-bottom: 10%;
      border-radius: 0 0 20px 20px;
    }

    .left .button-wrapper {
      transform: translateX(-20%);
    }

    .top .button-wrapper {
      position: absolute;
      top: 100vh;
      transform: translateY(-100%);
    }

    @keyframes move-icon-wrapper {
      from {
        transform: translateX(0);
        opacity: 1;
      }

      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    @keyframes rotate-icon {
      from {
        transform: rotate(0);
      }

      to {
        transform: rotate(1turn);
      }
    }

    @media screen and (max-width: 1080px) {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 0;
      margin-top: -70px;

      .left {
        display: none;
      }

      .top {
        display: flex;
      }
    }
`;

function MenuBar() {
  const history = useHistory();
  const defaultCategories = ["condition", "activity", "meal", "sleep"];
  const { pathname } = useLocation();
  const currentCategory = pathname.split("/").pop();
  const [clickedCategory, setClickedCategory] = useState(currentCategory);
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const {
    id: userId, name: userName, customCategories,
  } = useSelector((state) => state.user);

  const customCategoryNames = userId
    ? customCategories.map(({ category }) => category)
    : [];
  const categories = defaultCategories.concat(customCategoryNames, ["friend", "preference"]);
  const name = userId ? userName : "guest";

  const handleMenuClick = function (clickedCategory) {
    history.push(`/${userId}/${clickedCategory}`);
    setClickedCategory(clickedCategory);
    setIsShowingMenu(false);
  };

  const handleShowMenuButton = function () {
    setIsShowingMenu(!isShowingMenu);
  };

  const icons = {
    default: <BsPentagon key="conditionIcon"/>,
    meal: <GiKnifeFork key="mealIcon" />,
    activity: <RiRunLine key="activityIcon" />,
    sleep: <RiHotelBedLine key="sleepIcon" />,
  };

  const categoryLists = categories.map((category) => (
    <li
      className={category === clickedCategory ? "menu clicked" : "menu"}
      key={category}
      onClick={handleMenuClick.bind(null, category)}
    >
      <div className="icon-wrapper">{icons[category] ? icons[category] : icons.default}</div>
      {category}
    </li>
  ));

  const menus = <ul>{categoryLists}</ul>;

  const handleLogout = function () {
    history.push("/login");
  };

  return (
    <MenuWrapper>
      <div className="left">
        <p className="name">{name}</p>
        {menus}
        <Logout onLogout={handleLogout} />
      </div>
      <div className="top">
        <Logout onLogout={handleLogout} />
        <Button
          text="menu"
          width={100}
          onClick={handleShowMenuButton}
        />
        {isShowingMenu && <div className="hidden-menu">
          {menus}
        </div>}
      </div>
    </MenuWrapper>
  );
}

export default MenuBar;
