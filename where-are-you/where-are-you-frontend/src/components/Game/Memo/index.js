import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 250px;
  height: 100px;
  position: absolute;
  bottom: 3rem;
  left: calc((250px + 3rem) * -1);
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: 700;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: rgba(247, 223, 2, 0.3);
  border: none;
  resize: none;

  &::placeholder {
    color: #353333;
  }

  &:focus {
    outline: none;
  }
`;

function Memo() {
  return (
    <Wrapper>
      <Title>MEMO</Title>
      <Textarea
        placeholder="메모장"
      ></Textarea>
    </Wrapper>
  );
}

export default Memo;
