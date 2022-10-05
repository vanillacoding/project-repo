import React from "react";
import styled from "styled-components";

const ModalBackgroundStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

function ModalBackground({ children }) {
  return (
    <ModalBackgroundStyle>
      {children}
    </ModalBackgroundStyle>
  );
}

export default ModalBackground;
