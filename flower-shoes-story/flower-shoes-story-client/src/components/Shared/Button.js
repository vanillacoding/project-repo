import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ type, children, onClick, className }) => {
  return (
    <DefaultButton type={type} className={className} onClick={onClick}>
      {children}
    </DefaultButton>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: "submit",
};

const DefaultButton = styled.button`
  display: inline-block;
  border: 2px solid #1a1a1e;
  padding: 10px 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-family: "adrianna-extended";
  color: #222;
`;

export default Button;
