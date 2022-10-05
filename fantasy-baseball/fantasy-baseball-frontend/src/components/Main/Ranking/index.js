import React, { useState, useEffect } from "react";

import produce from "immer";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getUserRankings, getPlayerRankings } from "../../../actions/todayGame";
import { RANKING_TAB_CONTENT, RANKING_TABS } from "../../../constants";
import { handleTabClick } from "../../../utils";
import { formatDate, subDate } from "../../../utils/date";
import LoadingRanking from "./LoadingRanking";
import RankingList from "./RankingList";

const Wrapper = styled.article`
  width: 450px;
  height: 450px;
  padding: 50px 0 0 0;
`;

const Tabs = styled.ul`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Tab = styled.li`
  width: 100%;
  height: auto;
  display: inline-block;
  font-family: "Bebas Neue";
  font-size: ${({ theme }) => theme.fontSize.middle};
  text-align: center;
  color: ${({ theme }) => theme.color.grey};
  cursor: pointer;

  &.active span {
    padding: 0 ${({ theme }) => theme.padding.small};
    background: ${({ theme }) => theme.color.blue};
    font-size: 1.2em;
    color: ${({ theme }) => theme.color.white};
  }
`;

function Ranking() {
  const [tabList, setTabList] = useState(RANKING_TABS);
  const [tabName, setTabName] = useState("users");
  const [tabContent, setTabContent] = useState(RANKING_TAB_CONTENT);
  const [isLoading, setIsLoading] = useState(false);

  const {
    userRankings,
    hitterRankings,
    pitcherRankings,
  } = useSelector((state) => state.todayGame);
  const dispatch = useDispatch();
  const today = new Date();

  useEffect(() => {
    if (userRankings.length < 1) {
      setIsLoading(true);
      dispatch(getUserRankings(formatDate(subDate(today, 1), "yyyyMMdd")));
      return;
    }

    if (userRankings.result === "none") {
      setTabContent(
        produce((draft) => {
          draft.users.error = "유저 랭킹 정보가 존재하지 않습니다.";
        })
      );
      setIsLoading(false);
      return;
    }

    if (userRankings.result === "failure") {
      setTabContent(
        produce((draft) => {
          draft.users.error = "데이터 로드에 실패하였습니다.";
        })
      );
      setIsLoading(false);
      return;
    }

    setTabContent(
      produce((draft) => {
        draft.users.list = userRankings;
      })
    );

    setIsLoading(false);
  }, [userRankings]);

  useEffect(() => {
    if (hitterRankings.length < 1 || pitcherRankings.length < 1) {
      setIsLoading(true);
      dispatch(getPlayerRankings(formatDate(subDate(today, 1), "yyyyMMdd")));
      return;
    }

    if (hitterRankings.result) {
      const { result } = hitterRankings;

      if (result === "none") {
        setTabContent(
          produce((draft) => {
            draft.hitters.error = "타자 랭킹 정보가 존재하지 않습니다.";
            draft.pitchers.error = "투수 랭킹 정보가 존재하지 않습니다.";
          })
        );
      } else {
        setTabContent(
          produce((draft) => {
            draft.hitters.error = "데이터 로드에 실패하였습니다.";
            draft.pitchers.error = "데이터 로드에 실패하였습니다.";
          })
        );
      }

      setIsLoading(false);
      return;
    }

    setTabContent(
      produce((draft) => {
        draft.hitters.list = hitterRankings;
        draft.pitchers.list = pitcherRankings;
      })
    );

    setIsLoading(false);
  }, [pitcherRankings, hitterRankings]);

  return (
    <Wrapper>
      <h2 className="hidden">TODAY RANKINGS</h2>
      <Tabs>
        {tabList.map((tab, index) => (
          <Tab
            key={index}
            data-tab={tab.name}
            onClick={(event) => handleTabClick(event, setTabList, setTabName)}
            className={tab.isActive ? "active" : ""}
          >
            <span>{tab.name}</span>
          </Tab>
        ))}
      </Tabs>
      {isLoading
        ? <LoadingRanking />
        : <RankingList data={tabContent[tabName]} />}
    </Wrapper>
  );
}

export default Ranking;
