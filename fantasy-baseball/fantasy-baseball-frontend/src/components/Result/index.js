import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";

import { fetchUserRankings, fetchRoaster } from "../../api/game";
import { EMPTY_ROASTER } from "../../constants";
import Notification from "../Notification";
import Roaster from "../Roaster";
import LoadingRanking from "./LoadingRanking";
import LoadingRoaster from "./LoadingRoaster";
import UserRankings from "./UserRankings";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankingsWrapper = styled.section`
  width: calc(100% - 12 * 7vmin);
  height: calc(100vh - 70px);
  padding: ${({ theme }) => theme.padding.base};
  display: flex;
  flex-direction: column;
`;

const RoasterWrapper = styled.section`
  width: calc(12 * 7vmin);
  height: calc(100vh - 70px);
`;

function Result() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRankings, setUserRankings] = useState([]);
  const [roaster, setRoaster] = useState(EMPTY_ROASTER);
  const { gameDate } = useParams();

  useEffect(() => {
    const getUserRankings = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUserRankings(gameDate);

        if (response.status === 404) {
          setError("유저 랭킹 정산이 아직 완료되지 않았습니다.");
          return;
        }

        if (response.ok === false) {
          setError("날짜에 해당하는 베팅 결과가 존재하지 않습니다.");
          return;
        }

        const { data } = await response.json();
        setUserRankings(data);
      } catch (err) {
        setError("결과 정보를 불러올 수 없습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    const getRoaster = async () => {
      try {
        const response = await fetchRoaster(gameDate);

        if (response.status === 404) {
          setError("날짜에 해당하는 로스터가 존재하지 않습니다.");
          return;
        }

        if (response.ok === false) {
          setError("데이터 로드에 실패하였습니다.");
          return;
        }

        const { data } = await response.json();
        setRoaster(data);
      } catch (err) {
        setError("결과 정보를 불러올 수 없습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    getUserRankings();
    getRoaster();
  }, []);

  return (
    <Wrapper>
      {error
        ? (
          <Notification
            icon="😢"
            title="FAIL TO LOAD DATA"
            text={error}
          />
        )
        : (
          <>
            <RankingsWrapper>
              {isLoading
                ? <LoadingRanking />
                : (userRankings.length > 0
                  && (
                    <UserRankings
                      userRankings={userRankings}
                      gameDate={gameDate}
                    />
                  )
                )}
            </RankingsWrapper>
            <RoasterWrapper>
              {isLoading
                ? <LoadingRoaster />
                : (
                  <>
                    <h2 className="hidden">선택한 로스터</h2>
                    <Roaster
                      roaster={roaster}
                    />
                  </>
                )}
            </RoasterWrapper>
          </>
        )}
    </Wrapper>
  );
}

export default Result;
