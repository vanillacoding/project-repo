import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { FaDog } from "react-icons/fa";
import styled from "styled-components";

import { leaveOwnerRoom } from "../../../actions/roomActions";
import route from "../../../constants/routes";

const LeaveRoomAlertModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;

  .leave-icon {
    animation: slide 5s;
  }

  .leave-count {
    font-size: 1rem;
  }

  @keyframes slide {
    from {
      transform: translateX(-500%);
    }

    to {
      transform: translateX(550%);
    }
  }
`;

function LeaveRoomAlertModal() {
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadgingCount = setTimeout(() => {
      setCount(count => count - 1);
    }, 1000);

    return () => clearTimeout(loadgingCount);
  }, [count]);

  if (count <= 0) {
    dispatch(leaveOwnerRoom());

    return <Redirect to={route.HOME} />;
  }

  return (
    <LeaveRoomAlertModalContainer>
      <FaDog
        size={200}
        className="leave-icon"
      />
      방장이 퇴장했습니다.
      <span className="leave-count">
        {count}초 후에 채널 선택창으로 이동합니다.
      </span>
    </LeaveRoomAlertModalContainer>
  );
}

export default LeaveRoomAlertModal;
