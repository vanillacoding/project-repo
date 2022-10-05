import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const buildStyle = ({
  width,
  padding,
  margin,
  border,
  borderRadius,
  backgroundColor,
  color,
  fontSize,
  whiteSpace,
  boxShadow,
  hoverBackgroundColor,
  hoverColor,
  hoverBoxShadow,
  activeBackgroundColor,
  activeBoxShadow,
  focusBackgroundColor,
  focusColor,
}) => css`
  width: ${width};
  padding: ${padding};
  margin: ${margin};
  border: ${border};
  border-radius: ${borderRadius};
  background-color: ${backgroundColor};
  color: ${color};
  font-size: ${fontSize};
  white-space: ${whiteSpace};
  box-shadow: ${boxShadow};

  &:hover {
    background-color: ${hoverBackgroundColor};
    color: ${hoverColor};
    box-shadow: ${hoverBoxShadow};
  }

  &:active {
    background-color: ${activeBackgroundColor};
    box-shadow: ${activeBoxShadow};
  }

  &:focus {
    background-color: ${focusBackgroundColor};
    color: ${focusColor};
  }
`;

const buttonType = {
  basic: {
    hoverBackgroundColor: "#26BFA6",
    activeBackgroundColor: "#21A18C",
  },
  userMenu: {
    width: "180px",
    margin: "2px 0px",
    backgroundColor: "#AEA5DF",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    hoverBackgroundColor: "#26BFA6",
    activeBackgroundColor: "#21A18C",
  },
  search: {
    padding: "12px 38px",
    backgroundColor: "#8877E8",
    fontSize: "20px",
    hoverBackgroundColor: "#26BFA6",
    activeBackgroundColor: "#21A18C",
  },
  home: {
    padding: "20px 25px",
    borderRadius: "5px",
    backgroundColor: "#9871B7",
    hoverBackgroundColor: "#26BFA6",
    activeBackgroundColor: "#21A18C",
  },
  edit: {
    padding: "15px 20px",
    border: "1px solid #C6CECD",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF",
    color: "#9871B7",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    hoverBackgroundColor: "#9871B7",
    hoverColor: "#FFFFFF",
    activeBackgroundColor: "#26BFA6",
  },
  filter: {
    border: "1px solid #C6CECD",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF",
    color: "#9871B7",
    fontSize: "20px",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.25)",
    focusBackgroundColor: "#9871B7",
    focusColor: "#FFFFFF",
  },
  notification: {
    padding: "10px 10px",
    width: "430px",
    margin: "2px",
    border: "1px solid #AEA5DF",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    fontSize: "14px",
    boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.25)",
    hoverBoxShadow: "0px 2px 5px 3px rgba(0, 0, 0, 0.25)",
    activeBackgroundColor: "#DCF1EC",
  },
  tool: {
    padding: "20px 20px",
    margin: "1px",
    borderRadius: "3px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    whiteSpace: "nowrap",
    hoverBoxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.25)",
    activeBoxShadow: "inset 0px 1px 1px 1px rgba(0, 0, 0, 0.25)",
  },
  utility: {
    padding: "10px 30px",
    margin: "2px",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF",
    color: "#9871B7",
    fontSize: "18px",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    hoverBoxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.25)",
    activeBoxShadow: "inset 0px 1px 1px 1px rgba(0, 0, 0, 0.2)",
  },
  icon: {
    padding: "0px",
    backgroundColor: "transparent",
  },
  commentOption: {
    width: "90px",
    margin: "2px 0px",
    backgroundColor: "#AEA5DF",
    fontSize: "15px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    hoverBackgroundColor: "#26BFA6",
    activeBackgroundColor: "#21A18C",
  },
};

const StyledButton = styled.button`
  padding: 13px 30px;
  border: none;
  border-radius: 10px;
  background-color: #AEA5DF;
  color: #FFFFFF;
  font-size: 18px;
  line-height: 0.9;
  transition: 0.2s;

  ${({ variant }) => buildStyle(buttonType[variant])}
`;

export default function Button({
  type,
  variant,
  onClick,
  children,
  className,
}) {
  return (
    <StyledButton
      type={type}
      variant={variant}
      onClick={onClick}
      className={className}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
};
