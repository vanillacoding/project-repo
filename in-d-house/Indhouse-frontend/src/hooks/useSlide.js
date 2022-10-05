import { useState } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../reducers/user";

const useSlide = (items, viewRange) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const index = currentIndex === 0 ? items.length - 1 : currentIndex - 1;

    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = currentIndex === items.length - 1 ? 0 : currentIndex + 1;

    setCurrentIndex(index);
  };

  const activeMusics = items.slice(currentIndex, currentIndex + viewRange);

  const itemToDisplay = activeMusics.length < viewRange
    ? [...activeMusics, ...items.slice(0, viewRange - activeMusics.length)]
    : activeMusics;

  const handleClick = async idx => {
    const music = items[currentIndex + idx];

    dispatch(actions.musicLikeRequest({ isLike: true, musicId: music._id }));
  };

  return {
    items: itemToDisplay,
    currentIndex,
    prevSlide,
    nextSlide,
    handleClick,
  };
};

export default useSlide;
