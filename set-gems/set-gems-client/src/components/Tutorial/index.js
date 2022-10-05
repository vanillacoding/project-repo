import React, { useEffect, useRef, useState, useCallback } from "react";

import "./Tutorial.css";
import Card from "../Card";
import CARD_PROPERTY_KOR from "../../constants/koCardProperty";
import { GEM_COLOR, GEM_SHAPE, METAL_COLOR, METAL_SHAPE } from "../../constants/cardProperty";

function Tutorial() {
  const numberOfCardsPerSet = 3;
  const numberOfProperties = 4;
  const cardAreaRef = useRef();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [propertyCheck, setPropertyCheck] = useState([]);

  useEffect(() => {
    const gemColors = Object.values(GEM_COLOR);
    const gemShapes = Object.values(GEM_SHAPE);
    const metalColors = Object.values(METAL_COLOR);
    const metalShapes = Object.values(METAL_SHAPE);

    function getOneSameSet(sameProperty) {
      const set = [...Array(numberOfCardsPerSet)].map((_, i) => {
        const common = sameProperty > 2
          ? sameProperty - 2
          : sameProperty;

        const gemColor = gemColors[sameProperty === 0 ? common : i];
        const gemShape = gemShapes[sameProperty === 1 ? common : i];
        const metalColor = metalColors[sameProperty === 2 ? common : i];
        const metalShape = metalShapes[sameProperty === 3 ? common : i];

        return { gemColor, gemShape, metalColor, metalShape };
      });

      return set;
    }

    const cards = [...Array(numberOfProperties)].reduce((acc, _, i) => {
      return acc.concat(getOneSameSet(i));
    }, []);

    setCards(cards);
  }, []);

  useEffect(() => {
    if (selectedCards.length !== 3) {
      return setPropertyCheck([]);
    }

    const properties = [];

    selectedCards.forEach((cardIndex) => {
      const card = cards[cardIndex];

      Object.values(card).forEach((value, i) => {
        if (properties[i]) {
          properties[i].add(value);
        } else {
          properties[i] = new Set([value]);
        }
      });
    });

    const propertyCheck = properties.map((selected) => {
      switch (selected.size) {
        case 1:
          return "전부 같음";
        case 2:
          return "두개만 같음";
        case 3:
          return "전부 다름";
      }
    });

    setPropertyCheck(propertyCheck);
  }, [selectedCards.length]);

  const handleCardClick = useCallback((clickedCardIndex) => {
    setSelectedCards((prev) => {
      if (prev.includes(clickedCardIndex)) {
        return prev.filter((cardIndex) => cardIndex !== clickedCardIndex);
      }

      if (prev.length === 3) {
        return [clickedCardIndex];
      }

      return [...prev, clickedCardIndex];
    });
  }, [cardAreaRef.current]);

  const cardElements = cards.map((cardProps, i) => (
    <div key={JSON.stringify(cardProps)}>
      <Card
        index={i}
        state={selectedCards.includes(i) ? "selected" : ""}
        {...cardProps}
        onClick={handleCardClick}
      />
    </div>
  ));

  const cardTds = selectedCards.map((cardIndex) => {
    const { gemColor, gemShape, metalColor, metalShape } = cards[cardIndex];
    return [
      <td key={`gc${cardIndex}`}>{CARD_PROPERTY_KOR[gemColor]}</td>,
      <td key={`gs${cardIndex}`}>{CARD_PROPERTY_KOR[gemShape]}</td>,
      <td key={`mc${cardIndex}`}>{CARD_PROPERTY_KOR[metalColor]}</td>,
      <td key={`ms${cardIndex}`}>{CARD_PROPERTY_KOR[metalShape]}</td>,
    ];
  });

  const cardTrs = [...Array(numberOfCardsPerSet)].map((_, i) => {
    const blankTds = [...Array(numberOfProperties)].map((_, j) => <td key={`blank${i}${j}`}></td>);

    return (
      <tr key={`selectedCard${i}`}>
        <th>
          {i + 1}
        </th>
        {cardTds[i] ? cardTds[i] : blankTds}
      </tr>
    );
  });

  const cardCheck = propertyCheck.length ? propertyCheck.map((check, i) => (
    <td
      key={`check${i}`}
      className={check === "두개만 같음" ? "wrong-set" : "correct-set"}
    >{check}</td>
  )): [...Array(numberOfProperties)].map((_, i) => <td key={`blankCheck${i}`}></td>);

  return (
    <div className="tutorial">
      <div>
        <p>두장의 카드만 속성의 값이 같다면 조합이 아닙니다.</p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>보석의 색상</th>
              <th>보석의 모양</th>
              <th>금속의 종류</th>
              <th>금속의 모양</th>
            </tr>
          </thead>
          <tbody>
            {cardTrs}
          </tbody>
          <tfoot>
            <tr>
              <th>판정</th>
              {cardCheck}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="card-area" ref={cardAreaRef}>
        {cardElements}
      </div>
    </div>
  );
}

export default Tutorial;
