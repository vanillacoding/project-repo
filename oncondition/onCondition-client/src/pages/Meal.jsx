import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import List from "../components/List";
import { PrevButton, NextButton } from "../components/PageButton";
import ContentForm from "../components/ContentForm";
import HeartCounter from "../components/HeartCounter";
import getApi from "../api/category";
import { getKoreanTimeString } from "../utils/time";
import theme from "../theme";

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: center;

  .list {
    padding: 15px;
    flex-grow: 1;
    justify-items: center;
    max-width: 680px;
  }

  .viewer {
    width: 680px;
  }
`;

function Meal() {
  const { creatorId } = useParams();
  const [meals, setMeals] = useState([]);
  const [isReloadRequired, setIsReloadRequired] = useState(true);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const { get, post } = getApi("meal");

  async function loadMeals(page = 1) {
    const result = await get(creatorId, page);

    if (!result) {
      return;
    }

    setPrevPage(result.prevPage);
    setNextPage(result.nextPage);
    setMeals(result.data);
    setIsReloadRequired(false);
  }

  useEffect(() => {
    if (!isReloadRequired) {
      return;
    }

    loadMeals();
  }, [isReloadRequired]);

  const handleSubmitForm = async function ({
    date, heartCount, image, text,
  }) {
    const newMeal = await post(creatorId, {
      date, image, heartCount, text,
    });

    if (newMeal) {
      setIsReloadRequired(true);
    }
  };

  const handlePrevPageButton = function () {
    loadMeals(prevPage);
  };

  const handleNextPageButton = function () {
    loadMeals(nextPage);
  };

  if (!meals) {
    return null;
  }

  const mealBars = (meals.length) ? meals.map((meal) => {
    return (
      <Link to={`/${creatorId}/meal/${meal._id}`} key={meal._id}>
        <List color={theme.background.main}>
          {meal.url
            ? <img src={meal.url} />
            : <img src="/img/add-picture.png" />}
          <div>{getKoreanTimeString(meal.date)}</div>
          <HeartCounter count={meal.rating.heartCount} />
        </List>
      </Link>
    );
  }) : [];

  return (
    <div>
      <h1>식사</h1>
      <Container>
        <div className="viewer">
          <ContentForm
            onSubmit={handleSubmitForm}
            submitButtonText="add meal"
          />
        </div>
        <div className="list">
          {!!prevPage && <PrevButton onClick={handlePrevPageButton} />}
          {mealBars}
          {!!nextPage && <NextButton onClick={handleNextPageButton} />}
        </div>
      </Container>
    </div>
  );
}

export default Meal;
