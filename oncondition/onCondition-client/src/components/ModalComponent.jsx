import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ContentBoard from "./ContentBoard";
import Button from "./Button";

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  background-color: ${({ theme }) => theme.background.modal};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${(props) => props.isError ? "3" : "1"};
  justify-content: center;
  align-items: center;
`;

const BoardWrapper = styled.div`
  margin-top: -50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function ModalComponent({
  confirmText,
  innerText,
  cancelText,
  onConfirm,
  onCancel,
  backgroundColor,
  width,
  height,
  isError,
}) {
  return (
    <form>
      <ModalWrapper isError={isError}>
        <BoardWrapper>
          <ContentBoard backgroundColor={backgroundColor} text={innerText}>
            <ButtonWrapper>
              <Button
                onClick={onConfirm}
                text={confirmText}
                backgroundColor={backgroundColor}
                width={width}
                height={height}
              />
              <Button
                onClick={onCancel}
                text={cancelText}
                backgroundColor={backgroundColor}
                width={width}
                height={height}
              />
            </ButtonWrapper>
          </ContentBoard>
        </BoardWrapper>
      </ModalWrapper>
    </form>
  );
}

ModalComponent.propTypes = {
  innerText: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  backgroundColor: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  isError: PropTypes.bool,
};

ModalComponent.defaultProps = {
  confirmText: "Confirm",
  cancelText: "Cancel",
  isError: false,
};

export default ModalComponent;
