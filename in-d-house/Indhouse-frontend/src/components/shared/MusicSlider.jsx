import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Music from "./Music";

import useLike from "../../hooks/useLike";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-y: hidden;
  overflow-x: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color:${({ theme }) => theme.colors.blue};
    border-radius: 1rem;
  }
`;

const MusicSlider = ({ musics, isLike }) => {
  const handleLike = useLike();

  return (
    <Wrapper>
      {musics.map(music => (
        <Music
          key={music._id}
          info={music}
          isLike={isLike}
          onClick={handleLike}
        />
      ))}
    </Wrapper>
  );
};

MusicSlider.propTypes = {
  isLike: PropTypes.bool.isRequired,
  musics: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverPhotoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    youtubeUrl: PropTypes.string.isRequired,
  }),
};

export default MusicSlider;
