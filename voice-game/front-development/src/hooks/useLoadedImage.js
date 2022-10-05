import { useSelector } from "react-redux";
import _ from "lodash";

/**
 *
 * @param {string} gameName current game name
 * @returns Object with image list and load status
 */
const useLoadedImage = (gameName) => {
  const myImage = { image: null, isLoaded: false };

  const isLoaded = useSelector((state) => state.imageReducer.isLoaded[gameName]);

  const image = useSelector(
    (state) => {
      if (state.imageReducer.isLoaded[gameName]) {
        return state.imageReducer[gameName];
      }
    },
    (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next)
  );

  if (isLoaded) {
    myImage.image = image;
    myImage.isLoaded = isLoaded;
  }

  return myImage;
};

export default useLoadedImage;
