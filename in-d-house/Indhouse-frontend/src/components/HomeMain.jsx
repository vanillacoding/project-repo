import React from "react";
import PropTypes from "prop-types";

import Title from "./shared/Title";
import HomeMusicRecommend from "./HomeMusicRecommend";

import { title } from "../constants";

const HomeMain = ({ name, likeGenre, likeMusic }) => {
  return (
    <>
      <Title title={`${title.home}${name}`} />
      <HomeMusicRecommend likeGenre={likeGenre} likeMusic={likeMusic} />
    </>
  );
};

HomeMain.propTypes = {
  likeGenre: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    musicId: PropTypes.string.isRequired,
    _id: PropTypes.string,
  })),
  likeMusic: PropTypes.arrayOf(PropTypes.shape({
    genreId: PropTypes.string.isRequired,
    _id: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
};

export default HomeMain;
