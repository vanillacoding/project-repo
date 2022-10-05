import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const buildStyle = ({
  padding,
  backgroundColor,
  textAlign,
  overflowWrap,
  boxShadow,
}) => css`
  padding: ${padding};
  background-color: ${backgroundColor};
  text-align: ${textAlign};
  overflow-wrap: ${overflowWrap};
  box-shadow: ${boxShadow};
`;

const dropdownType = {
  list: {
    padding: "10px 20px",
    overflowWrap: "break-word",
    boxShadow: "0px 5px 5px 1px rgba(0, 0, 0, 0.25)",
  },
  confirm: {
    padding: "3px 15px 17px",
    textAlign: "center",
    boxShadow: "0px 3px 5px 1px rgba(0, 0, 0, 0.25)",
  },
  select: {
    padding: "10px",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
  },
  message: {
    padding: "15px",
    boxShadow: "0px -3px 5px 1px rgba(0, 0, 0, 0.25)",
  },
};

const StyledDropdown = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: white;

  ${({ variant }) => buildStyle(dropdownType[variant])}
`;

export default function Dropdown({ variant, onClick, children }) {
  return (
    <StyledDropdown variant={variant} onClick={onClick}>
      {children}
    </StyledDropdown>
  );
}

Dropdown.propTypes = {
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
