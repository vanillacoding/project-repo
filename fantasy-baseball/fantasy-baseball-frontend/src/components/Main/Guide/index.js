import React from "react";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Wrapper = styled.article`
  width: 100%;
  height: 300px;
  padding: 50px 0 0 0;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const TextBox = styled.div`
  width: calc(100% - 50px);
  height: 100%;
  margin: 0 ${({ theme }) => theme.margin.base} 0 0;
  padding: ${({ theme }) => theme.padding.bigger};
  background: ${({ theme }) => theme.color.white};
  overflow: auto;
`;

const Title = styled.p`
  margin: 0 0 1rem 0;
  font-family: "Bebas Neue";
  font-size: 3rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.color.blue};
`;

const Content = styled.div`
  line-height: 1.5rem;
  word-break: keep-all;
`;

const ContentTitle = styled.p`
  padding: 1rem 0;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: bold;
`;

const Line = styled.hr`
  margin: ${({ theme }) => theme.padding.big} 0;
  border-color: rgba(255, 255, 255, 0.3);
`;

const List = styled.ul`
  li {
    padding: 0 0 0 15px;
    line-height: 1.5rem;
    position: relative;

    &::before {
      width: 4px;
      height: 4px;
      background: ${({ theme }) => theme.color.blue};
      display: block;
      position: absolute;
      top: 8px;
      left: 0;
      content: "";
    }
  }
`;

const GuideIcon = styled.div`
  position: absolute;
  bottom: 1em;
  right: 2em;
  color: ${({ theme }) => theme.color.blue};

  span {
    padding: 0 0.3rem 0 0;
  }
`;

function Guide() {
  return (
    <Wrapper>
      <h2 className="hidden">BETTING GUIDE</h2>
      <TextBox>
        <Title>WELCOME TO FANTASY BASEBALL</Title>
        <Content>
          판타지 베이스볼에 오신 것을 환영합니다.
          <br />
          이곳에서 여러분은 매일 갱신되는 1군 엔트리 선수들을 바탕으로 원하는 로스터를 만들어 유저들과 경쟁할 수 있습니다.
          <br />
          배팅한 금액이 높을 수록, 선수를 선택한 사람이 적을 수록 여러분은 더 높은 금액을 획득할 수 있습니다.
          <br />
          베팅 결과는 당일 진행된 게임이 종료된 후 확인 가능하며, 야구 경기가 진행되지 않는 월요일에는 베팅을 진행할 수 없습니다.
          <br />
          여러분에게 좋은 결과가 있길 바라며, Let’s PLAY BALL!
          <Line />
          <ContentTitle>1. 로스터 구성 방법</ContentTitle>
          <List>
            <li>⚾️ FANTASY BASEBALL은 10인으로 이루어진 로스터에 유저가 자신이 원하는 만큼 베팅 금액을 걸 수 있는 구조입니다.</li>
            <li>유저가 선택할 수 있는 선수들 리스트는 당일 선발 라인업을 기준으로 각 팀당 10명 씩 총 100명이 매일 갱신됩니다.</li>
            <li>
              로스터로 선택할 수 있는 10인은
              <span>좌익수, 중견수, 우익수, 1루수, 2루수, 3루수, 유격수, 투수, 포수, 지명타자</span>
              등 각각의 포지션을 가지고 있습니다.
            </li>
            <li>원하는 로스터를 구성한 후 최소 100원 이상 최대 자신이 가진 금액까지 100 단위로 베팅 금액을 설정합니다.</li>
          </List>
          <ContentTitle>2. 배당금 계산 방식</ContentTitle>
          <List>
            <li>모든 경기가 종료된 후 나온 결과를 바탕으로 선수들의 스코어를 계산합니다.</li>
            <li>포지션 별로 선수들을 1등부터 10등까지 정렬합니다.</li>
            <li>유저들의 배당금은 포지션 별로 계산되며, 베팅 금액은 총 포지션의 갯수인 1/10로 산정합니다.</li>
            <li>유저들이 베팅한 선수들 한정으로 가장 높은 스코어를 기록한 1등과 2등 선수를 선별합니다.</li>
            <li>1등과 2등 선수를 로스터에 포함한 유저들은 자신의 베팅 금액 만큼 돌려 받습니다.</li>
            <li>1등과 2등 이외의 선수들에게 걸린 금액을 모두 합한 후 1등을 선택한 유저들에게는 70%, 2등을 선택한 유저들에게는 30%를 돌려줍니다.</li>
            <li>이때, 1등과 2등 유저들 각각의 총 베팅 금액에 대한 자신이 베팅한 금액의 비율만큼 추가로 돈을 얻게 됩니다.</li>
          </List>
        </Content>
        <GuideIcon>
          <span>SCROLL DOWN</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </GuideIcon>
      </TextBox>
    </Wrapper>
  );
}

export default Guide;
