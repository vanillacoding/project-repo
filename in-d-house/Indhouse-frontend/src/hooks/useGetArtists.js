import { useState, useEffect } from "react";

import api from "../api";

const useGetArtists = likeMusic => {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const getMusic = async () => {
      const { musics } = await api.getMusicBySpecificMusic(likeMusic);

      const artistIds = musics.map(music => ({ artistId: music.artist }));

      const { artists } = await api.getArtist(artistIds);

      const result = artists.map(artistInfo => artistInfo.name);

      setArtist(result);
    };

    getMusic();
  }, []);

  return { artist };
};

export default useGetArtists;
