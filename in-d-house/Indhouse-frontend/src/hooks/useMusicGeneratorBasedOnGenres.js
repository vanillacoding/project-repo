import { useState, useEffect } from "react";

import filterSameMusicOfUserToMusic from "../utils/filterSameMusicOfUserToMusic";
import api from "../api";

const useMusicGeneratorBasedOnGenres = (likeGenre, likeMusic) => {
  const [recommendMusic, setRecommendMusic] = useState([]);

  useEffect(() => {
    const getMusic = async () => {
      const { musics } = await api.getMusicByLikeGenre(likeGenre);

      const filterdMusics = filterSameMusicOfUserToMusic(likeMusic, musics);

      setRecommendMusic(filterdMusics);
    };

    getMusic();
  }, [likeGenre, likeMusic]);

  return recommendMusic;
};

export default useMusicGeneratorBasedOnGenres;
