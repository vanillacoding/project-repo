import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useDispatch } from "react-redux";

import {
  resetTranslatedBlocks,
  updateExecutingBlock,
} from "../../features/block/blockSlice";
import { mapInfo } from "../../mapInfo/mapInfo";

import { Modal } from "../../components/Modal/Modal";
import { Header } from "../../components/Header/Header";
import { BlockCombinator } from "../../components/BlockCombinator/BlockCombinator";
import { Map } from "../../components/Map/Map";

import { BUTTON, MESSAGE, COLOR } from "../../config/constants";

function Game() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [keyQuantity, setKeyQuantity] = useState(0);

  const navigate = useNavigate();
  const { gameId } = useParams();
  const catAsset = useRef(new Image());
  const mapAsset = useRef(new Image());

  const mapInfoKeys = Object.keys(mapInfo);

  const [mapData, setMapData] = useState();

  useEffect(() => {
    if (!mapInfo[gameId]) {
      navigate("/not_found");
    }

    setMapData(cloneDeep(mapInfo[gameId]));
    setIsSubmit(false);
  }, [gameId]);

  useEffect(() => {
    catAsset.current.src = "/assets/image/cat_asset.png";
    mapAsset.current.src = "/assets/image/map_asset.png";
  }, [mapData]);

  const moveNextStage = () => {
    dispatch(updateExecutingBlock("end"));
    dispatch(resetTranslatedBlocks());

    const currentIndex = mapInfoKeys.indexOf(gameId);

    if (currentIndex + 1 === mapInfoKeys.length) {
      setResultMessage(MESSAGE.LAST_STAGE);
      setIsModalOpen(!isModalOpen);
    } else {
      navigate(`/game/${mapInfoKeys[currentIndex + 1]}`, { replace: true });
    }
  };

  const restart = () => {
    dispatch(updateExecutingBlock("end"));
    dispatch(resetTranslatedBlocks());
    setMapData(cloneDeep(mapInfo[gameId]));
    setIsSubmit(false);
  };

  const start = () => {
    setIsSubmit(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          resultMessage={resultMessage}
        />
      )}
      <Header />
      <TopWrapper>
        <Title>{mapData?.title}</Title>
        <ButtonsWrapper>
          <Button onClick={restart} rightMargin={"4rem"}>
            {BUTTON.RESTART}
          </Button>
          <Button rightMargin={"15rem"} onClick={moveNextStage}>
            {BUTTON.NEXT_GAME}
          </Button>
        </ButtonsWrapper>
      </TopWrapper>
      <ContentsWrapper>
        <BlockCombinator
          submittedBlockInfo={isSubmit}
          setSubmittedBlockInfo={setIsSubmit}
          availableBlocks={mapData?.blocks || []}
          limitCount={mapData?.limitCount || 10}
          mapId={gameId}
        />
        <RightWrapper>
          <div>
            {mapData && (
              <Map
                mapInfo={mapData}
                setMapInfo={setMapData}
                catAsset={catAsset.current}
                mapAsset={mapAsset.current}
                setIsModalOpen={setIsModalOpen}
                setResultMessage={setResultMessage}
                keyQuantity={keyQuantity}
                setKeyQuantity={setKeyQuantity}
                unlockBlockControl={() => setIsSubmit(false)}
              />
            )}
            <KeyWrapper>
              {mapData &&
                mapData.keyCount !== 0 &&
                Array(mapData.keyCount)
                  .fill("")
                  .map((none, index) =>
                    keyQuantity < index + 1 ? (
                      <img
                        src="/assets/image/empty_key.png"
                        key={`keyCount-${index}`}
                        alt="empty_key"
                        draggable={false}
                      ></img>
                    ) : (
                      <img
                        src="/assets/image/key.png"
                        key={`keyCount-${index}`}
                        alt="fulFillKey"
                        draggable={false}
                      ></img>
                    ),
                  )}
            </KeyWrapper>
          </div>
          <Button onClick={start}>{BUTTON.START}</Button>
        </RightWrapper>
      </ContentsWrapper>
    </>
  );
}

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;

const Title = styled.span`
  margin-left: 15rem;
  color: ${COLOR.DEEP_BLUE};
  font-size: 1.5rem;
  font-weight: bolder;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 1rem;
  margin-right: ${(props) => props.rightMargin};
  border: none;
  border-radius: 30px;
  background: ${COLOR.RED};
  color: ${COLOR.WHITE};
  font-size: 1.3rem;
  font-weight: bolder;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.WHITE};
    color: ${COLOR.RED};
    transition: all 200ms;
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  margin: 0 15rem;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 70vh;
`;

const KeyWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export { Game };
