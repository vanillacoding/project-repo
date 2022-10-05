import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ContentViewer from "../components/ContentViewer";
import HeartCounter from "../components/HeartCounter";
import Button from "../components/Button";
import LineGraph from "../components/graphs/LineGraph";
import RadarGraph from "../components/graphs/RadarGraph";
import { getCondition } from "../api/condition";
import { postGoogleToken } from "../api/auth";
import { useGapi } from "../helpers/useGapi";
import { getISOTime } from "../utils/time";

const ConditionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: ${({ theme }) => theme.text.main};

  .graph, .status {
    margin: 20px;
    width: 630px;
  }

  .graph button {
    float: right;
  }

  .status {
    align-items: center;

    div {
      max-height: 600px;
    }
  }

  @media screen and (max-width: 640px) {
    .graph, .status {
      width: calc(100% - 20px);
    }
  }
`;

const StatusInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.8fr 1fr);
  justify-items: start;
  column-gap: 1rem;
  padding: 20px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow.main};
  background-color: ${({ theme }) => theme.background.main};
  font-size: ${({ theme }) => theme.fontSizes.small};

  @media screen and (max-width: 650px) {
    display: grid;
    grid-template-columns: 0.8fr 1fr;
  }

  @media screen and (max-width: 370px) {
    display: flex;
    flex-direction: column;
  }
`;

function Condition() {
  const [isRadarGraph, setIsRadarGraph] = useState(true);
  const [categories, setCategories] = useState([]);
  const [dataPerDate, setDataPerDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [heartCount, setHeartCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const { creatorId } = useParams();
  const user = useSelector((state) => state.user);
  const [gapi, isGapiLoaded] = useGapi();

  useEffect(() => {
    async function loadCondition(creatorId) {
      const condition = await getCondition(creatorId);

      if (!condition) {
        return;
      }

      const { status: loadedStatus, data: conditionData } = condition;

      const loadedCategories = Object.keys(conditionData);
      const loadedDataPerCategory = Object.values(conditionData);
      const loadedDataPerDate = {};

      loadedDataPerCategory.forEach((data, i) => {
        data.forEach(({ _id: date, average }) => {
          if (!loadedDataPerDate[date]) {
            loadedDataPerDate[date] = Array(loadedCategories.length).fill(0);
          }
          loadedDataPerDate[date][i] = average;
        });
      });

      const counts = Object.values(loadedStatus);
      const loadedHeartCount = counts.reduce((sum, count) => sum + count, 0)
        / counts.length;

      setCategories(loadedCategories);
      setDataPerDate(loadedDataPerDate);
      setStatus(loadedStatus);
      setHeartCount(loadedHeartCount);
    }

    loadCondition(creatorId);
  }, []);

  useEffect(() => {
    async function updateUserInfo() {
      setIsUpdating(true);

      const nowTime = new Date();
      const { pastMidnight } = getISOTime(nowTime);
      const userAccessDate = new Date(user.lastAccessDate);
      const auth2 = gapi.auth2?.getAuthInstance();

      if (userAccessDate >= pastMidnight) {
        setIsUpdating(false);

        return;
      }

      if (!auth2) {
        setIsUpdating(false);

        return;
      }

      const {
        access_token: googleAccessToken,
      } = await auth2.currentUser.get().reloadAuthResponse();
      const res = await postGoogleToken(creatorId, googleAccessToken);

      if (!res) {
        return;
      }

      setIsUpdating(false);
    }

    if (!user.id || !isGapiLoaded) {
      setIsUpdating(false);

      return;
    }

    updateUserInfo();
  }, [isGapiLoaded]);

  const handleConvertButtonClick = function () {
    setIsRadarGraph(!isRadarGraph);
  };

  const statusInfos = status ? Object.keys(status).flatMap((category) => (
    [
      <span key={category}>{category}</span>,
      <HeartCounter key={category + "status"} count={status[category]} />,
    ]
  )) : [];

  return (
    <div>
      <h1>내 컨디션</h1>
      {isUpdating && <p>구글 데이터를 불러오고 있습니다</p>}
      {!!dataPerDate && <ConditionWrapper>
        <div className="graph">
          <Button
            text="전환"
            onClick={handleConvertButtonClick}
          />
          {isRadarGraph
            ? <RadarGraph
              categories={categories}
              dataPerDate={dataPerDate}
            /> : <LineGraph
              categories={categories}
              dataPerDate={dataPerDate}
            />}
        </div>
        <div className="status">
          <StatusInfo>
            {statusInfos}
          </StatusInfo>
          <ContentViewer
            heartCount={heartCount}
            date={new Date().toDateString()}
            isDescription
          />
        </div>
      </ConditionWrapper>}
    </div>
  );
}

export default Condition;
