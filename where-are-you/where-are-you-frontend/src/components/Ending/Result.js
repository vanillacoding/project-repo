import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import keyImage from "../../assets/ending/ending05.png";
import box from "../../assets/ending/result_box.png";
import convertTime from "../../utils/time";

const buttonOn = keyframes`
  to {
    margin: 0 0 0 0;
  }
`;

const Wrapper = styled.div`
  width: 500px;
  height: 285px;
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;
  top: -50px;
  background: url(${box}) no-repeat center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:first-child {
      margin: 0 2rem 0 0;
    }
  }
`;

const Title = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 1.7rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.7rem;
`;

const List = styled.ul`
  width: 100%;
  margin: 0 0 0.5rem 0;
  padding: 0.3rem 0.5rem;
  background: #f1f0f0;
  font-size: 1.2rem;
`;

const Label = styled.span`
  width: 100px;
  display: inline-block;
  letter-spacing: -1px;
`;

const Button = styled(Link)`
  width: 100%;
  height: 40px;
  margin: 0 0 0.5rem 0;
  display: block;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.5);
  overflow: hidden;

  span {
    position: absolute;
    top: 8px;
    left: 1rem;
    z-index: 1;
  }

  &::after {
    width: 100%;
    height: 100%;
    margin: 0 0 0 -100%;
    display: block;
    position: absolute;
    top: 0;
    z-index: 0;
    background: ${({ theme }) => theme.color.black};
    content: "";
  }

  &:hover {
    color: #ffffff;

    &::after {
      animation: ${buttonOn} 1s forwards;
    }
  }
`;

function Result() {
  const playerInfo = useSelector((state) => state.player);

  return (
    <Wrapper>
      <div>
        <img src={keyImage} alt="결과 이미지" />
      </div>
      <div>
        <Title>
          ESCAPE
          SUCCESS!
        </Title>
        <List>
          <li>
            <Label>NAME:</Label>
            {playerInfo.name}
          </li>
          <li>
            <Label>CLEAR TIME:</Label>
            {convertTime(playerInfo.clearTime)}
          </li>
        </List>
          <Button to="/review">
            <span>리뷰 남기기</span>
          </Button>
          <Button to="/">
            <span>메인으로 가기</span>
          </Button>
      </div>
    </Wrapper>
  );
}

export default Result;
