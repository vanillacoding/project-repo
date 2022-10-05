import React, { useState, useEffect } from "react";

import produce from "immer";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { fetchPositionRankings } from "../../api/game";
import {
  STATISTIC_TAB_CONTENT,
  STATISTIC_TABS,
  PLAYER_POSITIONS,
} from "../../constants";
import { handleTabClick } from "../../utils";
import Notification from "../Notification";
import Loading from "../Shared/Loading/LoadingFullScreen";
import Chart from "./Chart";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartWrapper = styled.article`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  color: white;
`;

const ChartTabs = styled.ul`
  width: 150px;
  height: 100%;
  padding: ${({ theme }) => theme.padding.base};
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Tab = styled.li`
  width: 100%;
  height: auto;
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.base};
  text-align: center;
  color: ${({ theme }) => theme.color.lightgrey};
  cursor: pointer;

  &.active {
    padding: ${({ theme }) => theme.padding.small};
    background: ${({ theme }) => theme.color.blue};
    font-size: 1.2em;
    color: ${({ theme }) => theme.color.white};
  }
`;

function Statistic() {
  const [tabList, setTabList] = useState(STATISTIC_TABS);
  const [tabContent, setTabContent] = useState(STATISTIC_TAB_CONTENT);
  const [tabName, setTabName] = useState("firstBaseman");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { gameDate } = useParams();

  useEffect(() => {
    const getPositionRankings = async (date) => {
      try {
        setIsLoading(true);
        const response = await fetchPositionRankings(date);

        if (response.status === 404) {
          setError("해당 날짜의 통계가 존재하지 않습니다.");
          return;
        }

        if (response.ok === false) {
          setError("데이터 로드에 실패하였습니다.");
          return;
        }

        const { data } = await response.json();

        setTabContent(
          produce((draft) => {
            data.forEach((position) => {
              draft[PLAYER_POSITIONS[position._id]] = position.players;
            });
          })
        );
      } catch (err) {
        setError("데이터 로드에 실패하였습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getPositionRankings(gameDate);
  }, []);

  return (
    <Wrapper>
      {error
        ? (
          <Notification
            icon="📊❌"
            title="FAIL TO LOAD DATA"
            text={error}
          />
        )
        : (
          <ChartWrapper>
            <ChartTabs>
              {tabList.map((tab, index) => (
                <Tab
                  key={index}
                  data-tab={tab.name}
                  onClick={(event) => handleTabClick(event, setTabList, setTabName)}
                  className={tab.isActive ? "active" : ""}
                >
                  {tab.title}
                </Tab>
              ))}
            </ChartTabs>
            {isLoading
              ? <Loading isFullScreen={false} />
              : (tabContent[tabName].length > 0
                && <Chart positionRankings={tabContent[tabName]} />)}
          </ChartWrapper>
        )}
    </Wrapper>
  );
}

export default Statistic;
