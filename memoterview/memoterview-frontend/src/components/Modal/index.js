import React, { useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  .modal-background {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${({ theme }) => theme.ModalBackground};
    z-index: 2;
    overflow: hidden;
  }

  .content {
    display: block;
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
`;

// children안에 들어갈 컴포넌트가 color, width, height 지정하면 됨
export default function Modal({ children, onBackgroundClick }) {
  useEffect(() => {
    document.body.classList.add("hidden");

    return () => {
      document.body.classList.remove("hidden");
    };
  }, []);

  return (
    <ModalWrapper>
      <div className="modal-background" onClick={onBackgroundClick} />
      <div className="content">{children}</div>
    </ModalWrapper>
  );
};
