import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { mapInfo } from "../../mapInfo/mapInfo";
import { COLOR } from "../../config/constants";

function GameList() {
  const navigate = useNavigate();

  const mapLists = Object.entries({ ...mapInfo });

  return (
    <>
      <Header />
      <GuideMessage>도전하고 싶은 맵을 선택하세요.</GuideMessage>
      <ListWrapper>
        {mapLists.map((mapList) => (
          <GameTitleList
            key={mapList[0]}
            onClick={() => navigate(`/game/${mapList[0]}`, { replace: true })}
          >{`${mapList[0]}: ${mapList[1].title}`}</GameTitleList>
        ))}
      </ListWrapper>
    </>
  );
}

const GuideMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  font-size: 1.7rem;
  font-weight: bolder;
`;

const ListWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  height: 75vh;
  margin: 0 15vw 0 15vw;
  padding: 1rem;
  border: none;
  background: ${COLOR.BLUE};
  box-shadow: 0rem 0.3rem 0.3rem rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
`;

const GameTitleList = styled.p`
  margin: 2rem;
  color: ${COLOR.WHITE};
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${COLOR.YELLOW};
    transition: all 200ms;
    transform: scale(1.1);
  }
`;

export { GameList };
