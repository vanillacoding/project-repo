import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background-color: ${({ theme }) => theme.background.sub};
`;

const Logo = styled.img`
  width: 40%;
  margin-top: -4rem;
`;

const Status = styled.p`
  height: 3rem;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.text.main};
`;

function Loading({ message, children }) {
  return (
    <Wrapper>
      <Logo src="/logo.png" />
      {children ? children : <Status>{message}</Status>}
    </Wrapper>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  children: PropTypes.element,
};

Loading.defaultProps = {
  message: "Waiting...",
};

export default Loading;
