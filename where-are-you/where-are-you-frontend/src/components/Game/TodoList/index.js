import React from "react";

import styled from "styled-components";

const ToDoBox = styled.div`
  width: 250px;
  padding: ${({ theme }) => theme.padding.base};
  position: relative;
  left: calc((250px + 3rem) * -1);
  background: #ffffff;

  &::before,
  &::after {
    content: "";
    width: 20px;
    height: 50px;
    display: block;
    position: absolute;
    background: rgba(213, 209, 159, 0.5);
  }

  &::before {
    top: -25px;
    right: 10px;
  }

  &::after {
    top: -25px;
    left: 0;
    transform: rotate(45deg);
  }
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;

  li {
    font-size: 16px;

    span {
      width: auto;
      display: inline-block;
      position: relative;
    }
  }
`;

function Todolist() {
  return (
    <ToDoBox>
      <Title>TODO LIST</Title>
      <List>
        <li><span>1. 냉장고에 있는 아이스크림 먹기</span></li>
        <li><span>2. 소파 쿠션 정리하기</span></li>
        <li><span>3. 책상 밑 서랍 정리하기</span></li>
        <li><span>4. 고양이 방 책꽂이 정리하기</span></li>
        <li><span>5. 화장실 수납장 정리하기</span></li>
      </List>
    </ToDoBox>
  );
}

export default Todolist;
