import { useState, useEffect } from "react";

import filterSimilarUsers from "../utils/filterSimilarUsers";
import filterMusicOfSimilarUser from "../utils/filterMusicOfSimilarUser";

import api from "../api";

const useMusicGeneratorBasedOnUsers = (likeGenre, likeMusic) => {
  const [recommendMusic, setRecommendMusic] = useState([]);

  useEffect(() => {
    const makeRecommendMusic = async () => {
      const { users } = await api.getSampleUser();

      const similarUsers = filterSimilarUsers(likeGenre, users);

      const filterdMusic = filterMusicOfSimilarUser(likeMusic, similarUsers);

      const { musics } = await api.getMusicBySpecificMusic(filterdMusic);

      setRecommendMusic(musics);
    };

    makeRecommendMusic();
  }, [likeMusic]);

  return recommendMusic;
};

export default useMusicGeneratorBasedOnUsers;
