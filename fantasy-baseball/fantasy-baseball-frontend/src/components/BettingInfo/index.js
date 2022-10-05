import React, { useState, useEffect } from "react";

import { faUsers, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";

import { fetchBettingStatus } from "../../api/game";

const BettingInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const InfoList = styled.ul`
  display: flex;
  gap: 1rem;
`;

const Label = styled.span`
  padding: 0.3rem 0.5rem;
  background: ${({ theme }) => theme.color.blue};
  display: inline-block;
  color: ${({ theme }) => theme.color.white};

  span {
    padding: 0 0 0 0.3rem;
  }
`;

const Value = styled.span`
  padding: 0 0 0 0.5rem;
`;

function SharedBettingInfo({ gameDate, setIsCalculated }) {
  const [bettingUsers, setBettingUsers] = useState([]);
  const [bettingTotalMoney, setBettingTotalMoney] = useState([]);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const getBettingData = async () => {
      try {
        const response = await fetchBettingStatus(gameDate);

        if (response.status === 404) {
          setError("현재 베팅 정보가 존재하지 않습니다.");
          return;
        }

        if (response.ok === false) {
          setError("데이터 로드에 실패하였습니다.");
          return;
        }

        const { data } = await response.json();

        setBettingUsers(data.users);
        setBettingTotalMoney(data.totalMoney);
        setIsCalculated(data.hasResult);
      } catch (err) {
        setError("현재 베팅 정보를 가져올 수 없습니다.");
      }
    };

    if (!isMounted) {
      getBettingData();
    }

    return () => { setIsMounted(true); };
  }, [bettingTotalMoney]);

  return (
    <BettingInfo>
      {error
        ? <p>{error}</p>
        : (
          <InfoList>
            <li>
              <Label>
                <FontAwesomeIcon
                  icon={faUsers}
                  size="lg"
                  color="white"
                />
                <span>
                  참가한 유저 수
                </span>
              </Label>
              <Value>
                {bettingUsers.length}
              </Value>
            </li>
            <li>
              <Label>
                <FontAwesomeIcon
                  icon={faCoins}
                  size="lg"
                  color="white"
                />
                <span>
                  총 베팅 금액
                </span>
              </Label>
              <Value>{bettingTotalMoney}</Value>
            </li>
          </InfoList>
        )}
    </BettingInfo>
  );
}

SharedBettingInfo.propTypes = {
  gameDate: PropTypes.string.isRequired,
  setIsCalculated: PropTypes.func,
};

SharedBettingInfo.defaultProps = {
  setIsCalculated: (state) => state,
};

export default React.memo(SharedBettingInfo);
