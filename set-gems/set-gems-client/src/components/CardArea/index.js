import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./CardArea.css";
import Card from "../Card";
import {
  getAllCardInfo,
  shuffleCards,
  validateSet,
  findValidSet,
} from "../../helper/card";
import {
  NEW_PLAYER,
  SELECT_CARD,
  SET_CARDS,
  LET_JOIN,
} from "../../constants/socketEvents";

function CardArea({
  onSuccess,
  onGameCompleted,
  socket,
  roomName,
  isLeader,
}) {
  const hintTime = 30000;
  const maxCardCount = 12;
  const [isRequiredShuffle, setIsRequiredShuffle] = useState(false);
  const [remainingCards, setRemainingCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [hintCard, setHintCard] = useState([]);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    if (socket & !isLeader) {
      return;
    }

    const initialCards = shuffleCards(getAllCardInfo());
    const openedCards = initialCards.splice(-maxCardCount, maxCardCount);

    setRemainingCards(initialCards);
    setOpenedCards(openedCards);

    if (socket) {
      socket.emit(SET_CARDS, roomName, openedCards, initialCards);
    }
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleNewPlayer = (player) => {
      if (isLeader) {
        socket.emit(LET_JOIN, player.id, openedCards, remainingCards);
      }
    };

    socket.on(NEW_PLAYER, handleNewPlayer);

    return () => socket.off(NEW_PLAYER, handleNewPlayer);
  }, [socket?.id, openedCards, remainingCards, isLeader]);

  const handleCardSelect = useCallback((i) => {
    setSelectedCards((prev) => {
      if (prev.includes(i)) {
        return prev.filter((cardIndex) => cardIndex !== i);
      }

      return [ ...prev, i];
    });
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(SET_CARDS, (openedCards, remainingCards) => {
      setRemainingCards(remainingCards);
      setOpenedCards(openedCards);
    });

    socket.on(SELECT_CARD, handleCardSelect);

    return () => {
      socket.removeAllListeners(SET_CARDS);
      socket.removeAllListeners(SELECT_CARD);
    };
  }, [socket?.id, isLeader, handleCardSelect]);

  useEffect(() => {
    const correctSet = findValidSet(openedCards);

    if (!correctSet.length && isLeader) {
      return setIsRequiredShuffle(true);
    }

    const hintTimer = setTimeout(() => {
      setHintCard(correctSet);
    }, hintTime);

    return () => clearTimeout(hintTimer);
  }, [openedCards]);

  useEffect(() => {
    if (!isRequiredShuffle) {
      return;
    }

    setIsRequiredShuffle(false);

    if (!remainingCards.length) {
      return onGameCompleted();
    }

    const newRemainingCards = shuffleCards([...remainingCards, ...openedCards]);

    const newOpenedCards = newRemainingCards.splice(
      -maxCardCount,
      maxCardCount,
    );

    setRemainingCards(newRemainingCards);
    setOpenedCards(newOpenedCards);

    if (isLeader) {
      socket.emit(SET_CARDS, roomName, newOpenedCards, newRemainingCards);
    }
  }, [isRequiredShuffle, isLeader]);

  useEffect(() => {
    if (selectedCards.length !== 3) {
      return;
    }

    const selectedSet = selectedCards.map(
      (cardIndex) => openedCards[cardIndex],
    );

    if (!validateSet(selectedSet)) {
      const animationTime = 300;

      setIsWrong(true);

      setTimeout(() => {
        setIsWrong(false);
      }, [animationTime]);

      return;
    }

    const newOpenedCards = [...openedCards];
    const newRemainingCards = [...remainingCards];

    selectedCards.forEach((deletedIndex) => {
      if (!newRemainingCards.length) {
        newOpenedCards.splice(deletedIndex, 1);
        return;
      }

      newOpenedCards[deletedIndex] = newRemainingCards.pop();
    });

    const cardCount = newOpenedCards.length + newRemainingCards.length;

    onSuccess(cardCount);
    setOpenedCards(newOpenedCards);
    setRemainingCards(newRemainingCards);
  }, [selectedCards.length]);

  useEffect(() => {
    if (isWrong) {
      return;
    }

    setSelectedCards([]);
    setHintCard([]);
  }, [isWrong, openedCards]);

  const handleCardClick = useCallback((i) => {
    if (socket) {
      socket.emit(SELECT_CARD, roomName, i);
    } else {
      handleCardSelect(i);
    }
  }, [socket?.id, roomName]);

  const cardElements = openedCards.map((cardProps, i) => {
    let state = "";

    if (hintCard.includes(i)) {
      state = "hint";
    }

    if (selectedCards.includes(i)) {
      state = isWrong ? "wrong" : "selected";
    }

    return (
      <Card
        key={JSON.stringify(cardProps)}
        state={state}
        index={i}
        {...cardProps}
        onClick={handleCardClick}
      />
    );
  });

  return (
    <div className="card-area">
      {cardElements}
    </div>
  );
}

CardArea.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onGameCompleted: PropTypes.func.isRequired,
  socket: PropTypes.shape({
    id: PropTypes.string,
    emit: PropTypes.func,
    on: PropTypes.func,
    removeAllListeners: PropTypes.func,
    off: PropTypes.func,
  }),
  roomName: PropTypes.string,
  isLeader: PropTypes.bool,
};

export default React.memo(CardArea);
