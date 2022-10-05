import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 3rem;

  .date {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.tasteTitleSize};
  }

  .genres {
    margin-top: 1rem;
  }

  .genre-info {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
  }

  .span-container {
    display: flex;
  }

  .per {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

const TasteMusicInfo = ({ year, month, infoData }) => {
  return (
    <Wrapper>
      <span className="date">{`${year}. ${month}`}</span>
      <div className="genres">
        {infoData.map((genre, i) => {
          return (
            <div
              key={`${i}${genre.genre}`}
              className="genre-info"
            >
              <span>
                {`${genre.genre}: ${Math.round(genre.percentage)}`}
              </span>
              <span className="per">%</span>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

TasteMusicInfo.propTypes = {
  infoData: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  })),
  month: PropTypes.string,
  year: PropTypes.string,
};

export default TasteMusicInfo;
