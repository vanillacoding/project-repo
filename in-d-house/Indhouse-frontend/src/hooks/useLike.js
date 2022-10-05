import { useDispatch } from "react-redux";

import * as actions from "../reducers/user";

const useLike = () => {
  const dispatch = useDispatch();

  const handleClick = (musicId, isLike) => {
    setTimeout(() => {
      if (isLike) {
        dispatch(actions.musicLikeRequest({ musicId, isLike }));
        return;
      }
      dispatch(actions.musicDislikeRequest({ musicId, isLike }));
    }, 500);
  };

  return handleClick;
};

export default useLike;
