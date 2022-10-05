import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const backgroundColor = css`
  ${(props) => css`
    background-color: ${props.backgroundColor};
  `}
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  ${backgroundColor}
`;

StyledInput.propTypes = {
  backgroundColor: PropTypes.string,
};

StyledInput.defaultProps = {
  backgroundColor: "transparent",
};

export default StyledInput;
