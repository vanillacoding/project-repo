import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useDispatch } from "react-redux";

import {
  resetTranslatedBlocks,
  updateExecutingBlock,
} from "../../features/block/blockSlice";
import { tutorialMapsData } from "../../mapInfo/tutorialMapsData";

import { Modal } from "../../components/Modal/Modal";
import { Header } from "../../components/Header/Header";
import { BlockCombinator } from "../../components/BlockCombinator/BlockCombinator";
import { Map } from "../../components/Map/Map";

import { STARS, BUTTON, MESSAGE, COLOR } from "../../config/constants";

function Tutorial() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [keyQuantity, setKeyQuantity] = useState(0);

  const navigate = useNavigate();
  const { tutorialId } = useParams();
  const catAsset = useRef(new Image());
  const mapAsset = useRef(new Image());

  const allTutorialKeys = Object.keys(tutorialMapsData);

  const [mapData, setMapData] = useState(
    tutorialMapsData[tutorialId] && cloneDeep(tutorialMapsData[tutorialId]),
  );

  useEffect(() => {
    if (!tutorialMapsData[tutorialId]) {
      navigate("/not_found");
    }

    setMapData(cloneDeep(tutorialMapsData[tutorialId]));
    setIsSubmit(false);
  }, [tutorialId]);

  useEffect(() => {
    catAsset.current.src = "/assets/image/cat_asset.png";
    mapAsset.current.src = "/assets/image/map_asset.png";
  }, [mapData]);

  const moveNextStage = () => {
    dispatch(updateExecutingBlock("end"));
    dispatch(resetTranslatedBlocks());

    const currentIndex = allTutorialKeys.indexOf(tutorialId);

    if (currentIndex + 1 === allTutorialKeys.length) {
      setResultMessage(MESSAGE.LAST_STAGE);
      setIsModalOpen(!isModalOpen);
    } else {
      navigate(`/tutorial/${allTutorialKeys[currentIndex + 1]}`, {
        replace: true,
      });
    }
  };

  const restart = () => {
    dispatch(updateExecutingBlock("end"));
    dispatch(resetTranslatedBlocks());
    setMapData(cloneDeep(tutorialMapsData[tutorialId]));
    setIsSubmit(false);
  };

  const start = () => {
    setIsSubmit(true);
  };

  const handleStarClick = (stage) => {
    dispatch(updateExecutingBlock("end"));
    dispatch(resetTranslatedBlocks());
    setMapData(cloneDeep(tutorialMapsData[tutorialId]));
    setIsSubmit(false);

    navigate(`/tutorial/${stage}`, { replace: true });
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          resultMessage={resultMessage}
        />
      )}
      <Wrapper>
        <Header />
        <TopWrapper>
          <GuideWrapper>
            {allTutorialKeys.map((stage, index) =>
              stage === tutorialId ? (
                <Star
                  color={COLOR.YELLOW}
                  key={`tutorial${tutorialId}-${index}`}
                >
                  {STARS.FULFILLED_STAR}
                </Star>
              ) : (
                <Star
                  color={COLOR.GRAY}
                  key={`tutorial${tutorialId}-${index}`}
                  onClick={() => handleStarClick(stage)}
                >
                  {STARS.EMPTY_STAR}
                </Star>
              ),
            )}
            <Tip>Tip: {mapData.tip}</Tip>
          </GuideWrapper>
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
            availableBlocks={mapData.blocks}
            limitCount={mapData.limitCount}
            mapId={tutorialId}
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
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.PURPLE};
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;

const GuideWrapper = styled.div`
  display: absolute;
  margin-left: 15rem;
`;

const Star = styled.div`
  display: inline-block;
  margin-right: 5rem;
  color: ${(props) => props.color};
  font-size: 1.5rem;
  font-weight: bolder;
  transition: all 300ms ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.5);
  }
`;

const Tip = styled.p`
  margin-top: 0.5rem;
  color: ${COLOR.WHITE};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
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

export { Tutorial };
