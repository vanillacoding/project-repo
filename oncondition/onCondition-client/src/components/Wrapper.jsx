import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.isShrink ? "400px" : "630px"};
  height: ${(props) => props.isShrink ? "240px" : "670px"};
  margin: 10px auto;
  padding-top: 20px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.main};
  background: ${props => props.color};
  color: ${({ theme }) => theme.background.input};
  font-size: ${({ theme }) => theme.fontSizes.small};
  list-style: none;

  @media screen and (max-width: 700px) {
    width: 100%;
    font-size: 90%;
  }

  @media screen and (max-width: 550px) {
    height: 400px;
  }
`;

Wrapper.propTypes = {
  isShrink: PropTypes.bool.isRequired,
};

Wrapper.defaultProps = {
  isShrink: false,
};

export default Wrapper;
