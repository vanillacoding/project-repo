import { faAngleLeft, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  margin-bottom: 2vh;
`;

const GoBackButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.iconSize};
  margin-left: 3vw;
  cursor: pointer;
`;

const PdfBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.iconSize};
  margin: 1vh 3vw 0 0;
  cursor: pointer;
`;

function intervieweeDetailNavBar({ backgroundColor, iconColor, size, iconSize, onGeneratePdfBtnClick, onGoBackButtonClick }) {
  return (
    <Navbar>
      <GoBackButton
        conSize={iconSize}
        iconSize="60px"
        onClick={onGoBackButtonClick}
      >
        <FontAwesomeIcon color={iconColor} icon={faAngleLeft}/>
      </GoBackButton>
      <PdfBtn
        backgroundColor={backgroundColor}
        iconSize="40px"
        onClick={onGeneratePdfBtnClick}
      >
        <FontAwesomeIcon color={iconColor} icon={faFileDownload}/>
      </PdfBtn>
    </Navbar>
  );
}

intervieweeDetailNavBar.defaultProps = {
  iconColor: "black",
};

export default intervieweeDetailNavBar;
