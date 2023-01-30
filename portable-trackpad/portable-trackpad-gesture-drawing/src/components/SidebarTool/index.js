import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedTool } from "../../redux/reducers/selectedTool";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const SideBarTool = ({ tool }) => {
  const { isFoldSideBar } = useSelector(({ isFoldSideBar }) => isFoldSideBar);

  const dispatch = useDispatch();

  return (
    <SideBarToolContainer
      onMouseDown={() => {
        dispatch(setSelectedTool(tool.name));
      }}
    >
      <span
        className="material-symbols-outlined sidebar-icon"
        style={{
          transform: isFoldSideBar ? ["translateX(75px)"] : ["translateX(0)"],
        }}
      >
        {tool.icon}
      </span>
      <div
        style={{
          opacity: isFoldSideBar ? 0 : 1,
        }}
      >
        {capitalizeFirstLetter(tool.name)}
      </div>
    </SideBarToolContainer>
  );
};

const SideBarToolContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5vh;
  padding: 2vh 0;
  width: 200px;
  border-radius: 1vmin;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  .sidebar-icon {
    font-weight: bold;
    user-select: none;
    margin-left: 40px;
    margin-right: 20px;
    transition: all 0.4s ease-in-out;
  }

  :hover {
    background-color: #7895b2;

    div,
    span {
      color: #f5efe6;
    }
  }

  :active {
    background-color: #7895b2;
    opacity: 0.5;

    div,
    span {
      color: #f5efe6;
    }
  }
`;

export default SideBarTool;
