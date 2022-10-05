import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MusicSlider from "./shared/MusicSlider";

import useMusicGeneratorBasedOnGenres from "../hooks/useMusicGeneratorBasedOnGenres";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .sub-title {
    margin: 10vh;
    color: ${({ theme }) => theme.colors.yellow};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
  }
`;

const HomeMusicRecommend = ({ likeGenre, likeMusic }) => {
  const displayMusic = useMusicGeneratorBasedOnGenres(likeGenre, likeMusic);

  return (
    <Wrapper>
      <MusicSlider musics={displayMusic} isLike={true} />
      <span className="sub-title">These are the musics we recommend.</span>
    </Wrapper>
  );
};

HomeMusicRecommend.propTypes = {
  likeGenre: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    musicId: PropTypes.string.isRequired,
    _id: PropTypes.string,
  })),
  likeMusic: PropTypes.arrayOf(PropTypes.shape({
    genreId: PropTypes.string.isRequired,
    _id: PropTypes.string,
  })).isRequired,
};

export default HomeMusicRecommend;
