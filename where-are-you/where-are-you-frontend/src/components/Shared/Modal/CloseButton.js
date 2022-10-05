import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  width: 70px;
  height: 30px;
  position: absolute;
  top: ${props => props.top};
  right: ${props => props.right};
  background: ${props => props.color};
  border: none;
  color: #ffffff;
`;

function CloseButton(props) {
  const {
    title,
    color,
    top,
    right,
    closeModal
  } = props;

  return (
    <Button
      type="button"
      aria-label="모달 닫기"
      color={color}
      top={top}
      right={right}
      onClick={closeModal}
    >
      {title}
    </Button>
  );
}

CloseButton.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

CloseButton.defaultProps = {
  title: "Close",
  color: "#f8a507",
  top: "0px",
  right: "0px"
};

export default CloseButton;
