import React from "react";
import PropTypes from "prop-types";

import Title from "./shared/Title";
import Music from "./shared/Music";

import GridBox from "../styles/shared/gridBox";

import useMusicGeneratorBasedOnUsers from "../hooks/useMusicGeneratorBasedOnUsers";
import useLike from "../hooks/useLike";
import { title } from "../constants";

const TasteFind = ({ likeGenre, likeMusic }) => {
  const displayMusic = useMusicGeneratorBasedOnUsers(likeGenre, likeMusic);
  const handleLike = useLike();

  return (
    <>
      <Title title={title.tasteFind} />
      <GridBox>
        {displayMusic.map(music => {
          return (
            <Music
              key={music._id}
              info={music}
              isLike={true}
              onClick={handleLike}
            />
          );
        })}
      </GridBox>
    </>
  );
};

TasteFind.propTypes = {
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

export default TasteFind;
