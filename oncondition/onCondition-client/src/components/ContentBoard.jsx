import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";

const SIZE_UNIT = "px";

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadow.main};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => String(props.widthSize) + SIZE_UNIT};
  height: ${(props) => String(props.heightSize) + SIZE_UNIT};
  border-radius: 10px;
  padding: 25px 20px 20px 20px;

  @media screen and (max-width: 400px) {
    width: calc(100% - 40px);
    margin: 0 auto;
  }
`;

const Inner = styled.div`
  flex-direction: row;
  flex-grow: 1;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background.input};
  border-radius: 10px;
  padding: 20px;
  font-size: 1.2rem;
`;

const Heading = styled.div`
  margin: 0 0 10px 0;
  color: ${({ theme }) => theme.background.innerModal};
  font-size: 1.5rem;
`;

function ContentBoard({
  backgroundColor,
  width,
  height,
  heading,
  text,
  children,
}) {
  return (
    <>
      <Outer
        widthSize={width}
        heightSize={height}
        backgroundColor={backgroundColor}
      >
        {heading && <Heading>{heading}</Heading>}
        <Inner>
          {text}
        </Inner>
      </Outer>
      {children}
    </>
  );
}

ContentBoard.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.oneOf(Object.values(theme.background)),
  heading: PropTypes.element,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.element,
};

ContentBoard.defaultProps = {
  backgroundColor: theme.background.main,
  width: 480,
  height: 360,
};

export default ContentBoard;
