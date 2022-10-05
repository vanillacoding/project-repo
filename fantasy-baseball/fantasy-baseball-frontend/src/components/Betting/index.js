import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { updateMoney } from "../../actions/login";
import { showModal } from "../../actions/modal";
import { fetchPlayers, postBetting } from "../../api/game";
import { EMPTY_ROASTER } from "../../constants";
import checkBettingCondition from "../../utils";
import { formatDate } from "../../utils/date";
import Notification from "../Notification";
import Roaster from "../Roaster";
import Loading from "../Shared/Loading/LoadingFullScreen";
import BettingOption from "./BettingOption";
import LoadingEntry from "./LoadingEntry";
import SearchEntry from "./SearchEntry";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BettingWrapper = styled.section`
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

function Betting() {
  const userMoney = useSelector((state) => state.login.user.money);

  const [players, setPlayers] = useState([]);
  const [roaster, setRoaster] = useState(EMPTY_ROASTER);
  const [bettingMoney, setBettingMoney] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bettingCondition] = useState(checkBettingCondition(new Date()));

  const gameDate = formatDate(new Date(), "yyyyMMdd");

  const dispatch = useDispatch();

  const setModalMessage = (
    contentText,
    hasLinkButton,
    path = "/",
    linkButtonText = "GO TO MAIN"
  ) => {
    dispatch(showModal({
      isVisible: true,
      title: "로스터 등록",
      contentText,
      hasLinkButton,
      path,
      linkButtonText,
    }));
  };

  const handleBettingMoney = (event) => {
    const { value } = event.target;
    setBettingMoney(value);
  };

  const submitBetting = async (event) => {
    event.preventDefault();

    try {
      const playersByPosition = Object.entries(roaster);
      const userRoaster = [];

      if (bettingMoney <= 0) {
        setModalMessage(
          "베팅 금액은 100원 이상이어야 합니다.",
          false,
          "",
          ""
        );
        return;
      }

      for (let i = 0; i < playersByPosition.length; i += 1) {
        if (playersByPosition[i][1].name === null) {
          setModalMessage(
            "10인 로스터를 모두 채워야합니다.",
            false,
            "",
            ""
          );
          return;
        }
        userRoaster.push(playersByPosition[i][1].kboId);
      }

      const bettingData = {
        roaster: userRoaster,
        bettingMoney,
      };

      setSubmitLoading(true);

      const response = await postBetting(gameDate, bettingData);

      if (response.status === 409) {
        setModalMessage(
          "이미 베팅에 참가하셨습니다.",
          true
        );
        return;
      }

      if (response.status === 401) {
        setModalMessage(
          "지금은 베팅 시간이 아닙니다. 베팅은 경기 시작 후 한 시간 동안 오픈됩니다.",
          true
        );
        return;
      }

      if (response.ok === false) {
        setModalMessage(
          "베팅 참가에 실패하였습니다. 다시 시도해주세요.",
          true
        );
        return;
      }

      setModalMessage(
        "베팅 참가에 성공하였습니다.",
        true
      );

      dispatch(updateMoney(bettingMoney));
    } catch (err) {
      setModalMessage(
        "베팅 참가에 실패하였습니다. 다시 시도해주세요.",
        true
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    const getPlayers = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPlayers(gameDate);

        if (response.status === 404) {
          setError("1군 엔트리가 존재하지 않습니다.");
          return;
        }

        if (response.ok === false) {
          setError("데이터 로드에 실패하였습니다.");
          return;
        }

        const { data } = await response.json();
        setPlayers(data);
      } catch (err) {
        setError("데이터 로드에 실패하였습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getPlayers();
  }, []);

  return (
    <>
      {submitLoading
        && <Loading isFullScreen={true} />}
      {bettingCondition === "open"
        ? (
          <Wrapper>
            <BettingWrapper>
              {isLoading
                ? <LoadingEntry />
                : (
                  error
                    ? (
                      <Notification
                        icon="🧢❌"
                        title="FAIL TO LOAD ENTRY"
                        text={error}
                      />
                    )
                    : (
                      <>
                        <SearchEntry
                          players={players}
                          setRoaster={setRoaster}
                        />
                        <BettingOption
                          userMoney={userMoney}
                          bettingMoney={bettingMoney}
                          handleBettingMoney={handleBettingMoney}
                          submitBetting={submitBetting}
                          gameDate={gameDate}
                        />
                      </>
                    )
                )}
            </BettingWrapper>
            <RoasterWrapper>
              <h2 className="hidden">로스터 선택하기</h2>
              <Roaster roaster={roaster} />
            </RoasterWrapper>
          </Wrapper>
        )
        : (
          <Notification
            icon="⚾️💰❌"
            title="NOT NOW..."
            text="지금은 베팅 시간이 아닙니다. 다음에 찾아주세요!"
          />
        )}
    </>
  );
}

export default Betting;
