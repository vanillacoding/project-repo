import React from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.padding.base};
  position: absolute;
  bottom: -7rem;
  background: #ffffff;
`;

function TextBox() {
  const text = useSelector(state => state.game.textBox);

  return (
    <Wrapper>
      {text}
    </Wrapper>
  );
}

export default TextBox;
