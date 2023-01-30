import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";

import styled from "styled-components";

import THEME_COLORS from "../config/constants/themeColors";
import CONFIG from "../config/constants/config";
import { initializeSequence } from "../features/sequenceReducer";
import { useScrollValue } from "../hooks/useScroll";
import useModal from "../hooks/useModal";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollValue = useScrollValue();
  const [ExplainModal, toggleModal] = useModal();

  const handleInitialClick = () => {
    dispatch(initializeSequence());
    navigate("/", { replace: true });
  };

  return (
    <HeaderContainer>
      <ExplainIcon
        title="Guide for Using PPTHUB"
        onClick={() => toggleModal()}
      />
      <HeaderTitle onClick={handleInitialClick} scroll={scrollValue}>
        PPTHub
      </HeaderTitle>
      <ExplainModal>
        <VideoIframe
          src={CONFIG.EXPLAIN_YOUTUBE_URL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </ExplainModal>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 22vh;
  box-shadow: rgba(0, 0, 0, 0.4) 1px 0.25px 10px 0.5px;
  background: ${THEME_COLORS.SECTION_BACKGROUND};
  z-index: 1;
`;

const ExplainIcon = styled(BsQuestionCircle)`
  position: absolute;
  top: 30%;
  left: 2%;
  font-size: 2rem;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  position: relative;
  width: 70%;
  margin-top: -0.5rem;
  font-weight: 800;
  font-size: 3.1rem;
  color: ${THEME_COLORS.MAIN_COLOR};
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    position: absolute;
    bottom: calc(-1rem - ((5px - 1px) / 2));
    left: ${({ scroll }) => `calc(${scroll}% - 1rem)`};
    width: 2rem;
    height: 5px;
    background-color: #000000;
    cursor: default;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    left: 0;
    bottom: -1rem;
    background-color: #000000;
    cursor: default;
  }
`;

const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

export default Header;
