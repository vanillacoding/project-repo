import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsFoldSideBar } from "../../redux/reducers/isFoldSideBar";
import SideBarTool from "../SidebarTool";

const SideBar = () => {
  const { isFoldSideBar } = useSelector(({ isFoldSideBar }) => isFoldSideBar);

  const dispatch = useDispatch();

  const tools = [
    { name: "drawing", icon: "draw" },
    { name: "figure", icon: "category" },
  ];

  return (
    <SideBarContainer
      style={{
        transform: isFoldSideBar ? ["translateX(-10vmin)"] : ["translateX(0)"],
      }}
      data-testid="SideBarContainer"
    >
      <div className="sidebar-title">
        <span
          className="sidebar-logo"
          style={{
            transform: isFoldSideBar
              ? ["translateX(10vmin)"]
              : ["translateX(0)"],
          }}
          data-testid="sidebar-title"
        >
          GD
        </span>
        <div
          style={{
            opacity: isFoldSideBar ? 0 : 1,
          }}
          data-testid="sidebar-title-div"
        >
          <h5>Gesture</h5>
          <h5>Drawing</h5>
        </div>
      </div>
      <div
        className="sidebar-openButton"
        onClick={() => {
          dispatch(setIsFoldSideBar(!isFoldSideBar));
        }}
      >
        {isFoldSideBar ? (
          <span className="material-symbols-outlined">navigate_next</span>
        ) : (
          <span className="material-symbols-outlined">navigate_before</span>
        )}
      </div>
      {tools.map((value, index) => {
        return <SideBarTool key={index} tool={value} />;
      })}
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 200px;
  background-color: #f5efe6;
  box-shadow: 5px 0px 10px hsla(0, 0%, 10%, 0.2);
  transition: all 0.4s ease-in-out;
  z-index: 1;

  .sidebar-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5vmin 0;
    font-size: 3vmin;
    user-select: none;
    transition: all 0.4s ease-in-out;

    div {
      margin: 1vmin 1vmin;
      font-size: 2.5vmin;
      transition: all 0.2s ease-in-out;
    }
  }

  .sidebar-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5vw;
    height: 6.5vmin;
    width: 7vmin;
    color: #f5efe6;
    background-color: #7895b2;
    font-family: "SDSamliphopangche_Basic";
    font-size: 4vmin;
    border-radius: 2vmin;
    box-shadow: 2px 0px 5px hsla(0, 0%, 10%, 0.2);
    transition: all 0.4s ease-in-out;
  }

  .sidebar-openButton {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #7895b2;
    height: 4vmin;
    width: 4vmin;
    border-radius: 2vmin;
    transform: translateY(3vh) translateX(100px);
    box-shadow: 2px 0px 5px hsla(0, 0%, 10%, 0.2);
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;

    span {
      color: #f5efe6;
    }
  }
`;

export default SideBar;
