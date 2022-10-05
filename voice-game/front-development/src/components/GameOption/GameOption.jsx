import React, { useCallback } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import Button from "../shared/Button/Button";

const GameOptionContainer = styled.div`
  width: 100%;
  padding: 1vh 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameOption = ({ bgm }) => {
  const history = useHistory();
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(false);

  const gameTitle = location.pathname.split("/")[2];
  const roomId = location.pathname.split("/")[3];

  const toggleBgm = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  return (
    <GameOptionContainer>
      <div>
        {bgm && (
          <>
            <audio loop autoPlay={true} muted={isMuted}>
              <source src={bgm} type="audio/mpeg" />
            </audio>
            <Button
              onClick={toggleBgm}
              margin={["0", "1vw", "0", "0"]}
              fontWeight={"600"}
              fontSize={"0.9rem"}
              bgColor={isMuted ? "#74b9ff" : "#fab1a0"}
            >
              {isMuted ? "BGM ON" : "BGM OFF"}
            </Button>
          </>
        )}
      </div>
      <div>
        {gameTitle && roomId && (
          <Button
            onClick={() => history.push(`/games/${gameTitle}`)}
            bgColor={"#dfe4ea"}
            margin={["0", "1vw", "0", "0"]}
            fontWeight={"600"}
            fontSize={"0.9rem"}
          >
            Leave Room
          </Button>
        )}
        {gameTitle && (
          <Button
            onClick={() => history.push("/games")}
            margin={["0", "1vw", "0", "0"]}
            fontWeight={"600"}
            fontSize={"0.9rem"}
          >
            Choose Game
          </Button>
        )}
        <Button
          onClick={() => history.push("/logout")}
          margin={["0", "1vw", "0", "0"]}
          bgColor={"#eb4d4b"}
          fontWeight={"600"}
          fontSize={"0.9rem"}
        >
          Log Out
        </Button>
      </div>
    </GameOptionContainer>
  );
};

export default GameOption;
