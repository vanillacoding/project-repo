import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import convertTime from "../../utils/time";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 0 0 0.5rem 0;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const Info = styled.div`
  margin: 0 0 0.5rem 0;

  > div {
    margin: 0 1.5rem 0 0;
    display: inline-block;
  }
`;

const Label = styled.span`
  margin: 0 0.3rem 0 0;
  padding: 0 0.3rem;
  display: inline-block;
  background: ${({ theme }) => theme.color.orange};
  color: #ffffff;
  font-weight: 700;
`;

const Content = styled.div`
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  white-space: pre-line;
  overflow-y: auto;
`;

function View(props) {
  const {
    name,
    clearTime,
    content,
    lastRef
  } = props;

  return (
    <Wrapper ref={lastRef}>
      <Info>
        <div>
          <Label>Name</Label>
          {name}
        </div>
        <div>
          <Label>Clear Time</Label>
          {convertTime(clearTime)}
        </div>
      </Info>
      <Content>{content}</Content>
    </Wrapper>
  );
}

View.propTypes = {
  name: PropTypes.string.isRequired,
  clearTime: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  lastRef: PropTypes.func
};

View.defaultProps = {
  lastRef: null
};

export default View;
