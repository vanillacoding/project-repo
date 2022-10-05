import { useState, useEffect } from "react";

import api from "../api";

const useGetLikeMusic = likeMusic => {
  const [likeMusics, setLikeMusics] = useState([]);

  useEffect(() => {
    const getLikeMusic = async () => {
      if (likeMusic.length === 0) return;

      const { musics } = await api.getMusicBySpecificMusic(likeMusic);

      setLikeMusics(musics);
    };

    getLikeMusic();
  }, [likeMusic]);

  return likeMusics;
};

export default useGetLikeMusic;
