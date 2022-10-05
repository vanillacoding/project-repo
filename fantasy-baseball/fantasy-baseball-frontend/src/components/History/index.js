import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import { fetchBettingHistory } from "../../api/game";
import Notification from "../Notification";
import HistoryTable from "./HistoryTable";
import LoadingHistory from "./LoadingHistory";
import Profile from "./Profile";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HistoryWrapper = styled.section`
  width: calc(100% - 300px);
  height: calc(100vh - 70px);
  padding: ${({ theme }) => theme.padding.base};
  background-color: ${({ theme }) => theme.color.black};
  display: flex;
  flex-direction: column;
  color: white;
`;

function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [bettingHistory, setBettingHistory] = useState([]);
  const {
    name,
    email,
    money,
    imageUrl,
  } = useSelector((state) => state.login.user);

  useEffect(() => {
    const getBettingHistory = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBettingHistory();

        if (response.status === 404) {
          setError("베팅 이력이 존재하지 않습니다.");
          return;
        }

        if (response.ok === false) {
          setError("데이터 로드에 실패하였습니다.");
          return;
        }

        const { data } = await response.json();

        setBettingHistory(data);
      } catch (err) {
        setError("데이터 로드에 실패하였습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getBettingHistory();
  }, []);

  return (
    <Wrapper>
      <Profile
        name={name}
        email={email}
        money={money}
        imageUrl={imageUrl}
      />
      <HistoryWrapper>
        {isLoading
          ? <LoadingHistory />
          : error
            ? (
              <Notification
                icon="⚠️"
                title="Error"
                text={error}
              />
            )
            : (
              <HistoryTable
                history={bettingHistory}
              />
            )}
      </HistoryWrapper>
    </Wrapper>
  );
}

export default History;
