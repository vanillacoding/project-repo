import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const GameCardContainer = styled.div`
  height: 35vh;
  padding-top: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #34495e;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
`;

const GameTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const GameThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 30vw;
  max-height: 25vh;
`;

const GameThumbnailGif = styled.img`
  margin: 2vh 0;
  width: 30vw;
  height: 25vh;

  @media only screen and (max-width: 1120px) {
    width: 50vw;
  }
`;

const GameCard = ({ title, gif, onClick }) => {
  return (
    <GameCardContainer onClick={() => onClick(title)}>
      <GameTitle>{title}</GameTitle>
      <GameThumbnailContainer>
        <GameThumbnailGif src={gif} alt="gameGif" />
      </GameThumbnailContainer>
    </GameCardContainer>
  );
};

GameCard.propTypes = {
  title: PropTypes.string,
  gif: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default GameCard;
