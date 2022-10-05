import React from "react";
import styled from "styled-components";
import ThreadList from "../../components/ThreadList/ThreadList";
import PieChart from "../../components/PieChart/Container";

export default function Dashboard({
  threads,
  allpartsCount,
  onWorkingUserCount,
  offWorkingUserCount,
  latingNumberPerEmployee,
  mostLater,
}) {
  return (
    <Wrapper>
      <StatusBox>
        <h3>총 인원</h3>
        <span>{allpartsCount}</span>
      </StatusBox>
      <StatusBox>
        <h3>출근 완료</h3>
        <span>{onWorkingUserCount}</span>
      </StatusBox>
      <StatusBox>
        <h3>퇴근 완료</h3>
        <span>{offWorkingUserCount}</span>
      </StatusBox>
      <ThreadBox>
        <h3>Today status</h3>
        <ThreadList threads={threads} />
      </ThreadBox>
      <ElseBox>
        <h3>직원 별 지각 횟수</h3>
        <div>
          <PieChart records={latingNumberPerEmployee} />
          <ChartLegend>
            {latingNumberPerEmployee.slice(0, 3).map((employee, index) => {
              return <li key={index}>{employee.name}</li>;
            })}
          </ChartLegend>
        </div>
      </ElseBox>
      <ElseBox>
        <h3>이번 주 지각 왕</h3>
        <div>
          <div>
            <ImageWrap>
              <img src={mostLater.profile} alt={mostLater.username} />
            </ImageWrap>
            <strong>{mostLater.username}</strong>
          </div>
          <p>
            성실함은 하늘의 도(道)요.
            <br />
            성실해지려고 노력함은 사람의 도이니라.
          </p>
        </div>
      </ElseBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  grid-template-rows: auto 1fr auto;
`;
export const Box = styled.div`
  border: 1px solid #ebebeb;
  padding: 15px;
`;
const StatusBox = styled(Box)`
  display: flex;
  flex-direction: column;

  & strong {
    display: block;
    font-size: 20px;
    margin-bottom: 15px;
  }
  & span {
    text-align: center;
    font-size: 25px;
  }
`;
const ThreadBox = styled(Box)`
  grid-row: 1/4;
  grid-column: 4/5;
  position: relative;
  & > div {
    position: absolute;
    top: 68px;
    bottom: 15px;
    left: 15px;
    right: 15px;
    overflow-y: scroll;
    & > div {
      padding: 15px;
      margin: 0 0 20px;
      & > div {
        margin-bottom: 0;
      }
      & > ul {
        display: none;
      }
    }
  }
`;
const ElseBox = styled(Box)`
  grid-column: 1/4;
  & > div {
    display: flex;
    align-items: center;
    & > div {
      margin-right: 30px;
    }
  }
  & canvas {
    max-width: 60%;
  }
`;
const ChartLegend = styled.ol`
  padding-left: 20px;
  list-style: decimal;

  & li {
    font-size: 16px;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const ImageWrap = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  & + strong {
    text-align: center;
    margin-top: 5px;
    display: block;
    font-size: 16px;
    font-weight: bold;
  }
`;
