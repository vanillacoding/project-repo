/* eslint-disable indent */
/* eslint-disable react/jsx-indent */

import { MouseEventHandler, ReactChild, ReactChildren } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 0;
`;

const Container = styled.div<{ position: { top: string; left: string } }>`
  position: absolute;
  top: ${({ position: { top } }) => top};
  left: ${({ position: { left } }) => left};
  align-items: center;
  justify-content: center;
  width: 0;
  height: 0;
  border-radius: 10px;
  z-index: 9999;
`;

interface ModalProps {
  children: ReactChild | ReactChildren;
  position?: { top: string; left: string };
  handleClose?: MouseEventHandler;
}

export default function Modal({
  children,
  handleClose = () => {},
  position = { top: "50%", left: "50%" },
}: ModalProps) {
  const $modal = document.getElementById("modal");

  return $modal
    ? createPortal(
        <>
          <Background
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                handleClose(event);
              }
            }}
          />
          <Container position={position}>{children}</Container>
        </>,
        $modal,
      )
    : null;
}
