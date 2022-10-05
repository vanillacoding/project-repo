import React, { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ModalContainer = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ManualImage = styled.img`
  display: block;
  width: 40%;
  max-width: 1000px;
  min-width: 600px;
  margin: 0 auto;
  margin-top: 20vh;
`;

const GameManual = ({ imgSrc, onClick }) => {
  const [isShow, setIsShow] = useState(true);

  const closeModal = useCallback(() => {
    if (onClick) {
      onClick();
    }
    setIsShow(false);
  }, [onClick]);

  return (
    <ModalContainer onClick={closeModal} isShow={isShow}>
      <ManualImage src={imgSrc} alt="manual Img" />
    </ModalContainer>
  );
};

GameManual.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default GameManual;
