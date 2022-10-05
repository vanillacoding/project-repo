import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import getApi from "../api/category";
import { PrevButton, NextButton } from "../components/PageButton";
import ContentBoard from "../components/ContentBoard";
import RateForm from "../components/RateForm";

const CONTENT_BOARD_PIXEL_WIDTH = 400;
const CONTENT_BOARD_PIXEL_HEIGHT = 150;

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: center;

  .grid {
    position: relative;
    flex-grow: 1;
    max-width: 500px;
    margin: 5%;
    display: grid;
    grid-template-columns: repeat(5, 100px);
    grid-template-rows: repeat(6, 100px);
  }

  .button {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.small};
    cursor: pointer;
  }

  .viewer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    padding: 10px;
  }

  .content {
    position: relative;
  }

  @media screen and (max-width: 550px) {
    .grid {
      grid-template-columns: repeat(5, 20%);
      grid-template-rows: repeat(6, 13%);
    }
  }
`;

const Grid = styled.div`
  border-radius: 50%;
  padding: 50%;
  background-color: ${({ level, theme }) => theme.grid[level]};
  border: ${(props) => !props.level ? "inset" : "none"};
  color: ${({ theme }) => theme.text.sub};
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  height: calc(100% - 45px);
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background.input};
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.fontSizes.small};

  p {
    line-height: 3rem;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.gridMessage};
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;

  p {
    line-height: 3rem;
  }
`;

function calculateLevel(count) {
  const countPerHeart = 2;
  const level = ["tooBad", "bad", "soso", "good", "veryGood"];
  const index = Math.floor(count / countPerHeart);

  return level[index] || "veryGood";
}

function CustomGrid() {
  const numberPerPage = 30;
  const { creatorId, category } = useParams();
  const { get, post } = getApi(category);
  const [grids, setGrids] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const history = useHistory();

  async function fetchGrid(page = "last") {
    const result = await get(creatorId, page);

    if (!result) {
      return;
    }

    const { data, nextPage, prevPage } = result;

    setPrevPage(prevPage);
    setNextPage(nextPage);
    setGrids(data);
  }

  useEffect(() => {
    fetchGrid();
  }, [category]);

  const handleGridClick = function (id) {
    history.push(`${category}/${id}`);
  };

  const handlePrevPageButton = function () {
    fetchGrid(prevPage);
  };

  const handleNextPageButton = function () {
    fetchGrid(nextPage);
  };

  const handleAddButtonClick = function () {
    setIsClicked(!isClicked);
  };

  const handleSubmitForm = async function ({
    date, heartCount, text,
  }) {
    const result = await post(creatorId, {
      date, heartCount, text,
    });

    if (result) {
      await fetchGrid();
      setIsClicked(false);
    }
  };

  const gridElements = grids.map(({ _id, rating }, i) => {
    return (
      <Grid
        key={_id}
        level={calculateLevel(rating.heartCount)}
        onClick={handleGridClick.bind(null, _id)}
      >{i + 1}</Grid>
    );
  });

  const AddGridButton = grids.length !== numberPerPage
    ? <Grid
      className="button"
      key="add"
      onClick={handleAddButtonClick}
    >{isClicked ? "X" : "+"}</Grid>
    : <ButtonContainer onClick={handleAddButtonClick}>
      <p>다음 챌린지를 시작하려면</p>
      <p>이곳을 클릭하세요!</p>
    </ButtonContainer>;

  const GoalAchievedMessage = (
    <MessageContainer onClick={handleAddButtonClick}>
      <p>{"🎉챌린지 성공!🎉"}</p>
    </MessageContainer>
  );

  const blankGrids = (grids.length !== numberPerPage)
    ? [...Array(numberPerPage - grids.length - 1)].map((_, i) => <Grid key={`blank${i}`} />)
    : [];

  const heading = <div>You Achieved</div>;
  const newAchievedCount = (grids.length === numberPerPage)
    ? 1 : grids.length + 1;
  const defaultValues = {
    date: new Date().toDateString(),
    snippet: `${newAchievedCount}/30`,
    type: category,
  };

  return (
    <div>
      <h1>{category}</h1>
      <Container>
        <div className="viewer">
          {!!prevPage && <PrevButton onClick={handlePrevPageButton} />}
          <div className="content">
            {grids.length === numberPerPage && GoalAchievedMessage}
            <ContentBoard
              text={`${grids.length} / 30`}
              width={CONTENT_BOARD_PIXEL_WIDTH}
              height={CONTENT_BOARD_PIXEL_HEIGHT}
              heading={heading}
            />
          </div>
          {!!nextPage && <NextButton onClick={handleNextPageButton} />}
          {isClicked
            && <RateForm
              onSubmit={handleSubmitForm}
              submitButtonText="add grid"
              defaultValues={defaultValues}
            />}
        </div>
        <div className="grid">
          {gridElements}
          {!nextPage && AddGridButton}
          {blankGrids}
        </div>
      </Container>
    </div>
  );
}

export default CustomGrid;
