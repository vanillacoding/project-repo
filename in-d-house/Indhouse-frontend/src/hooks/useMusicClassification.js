import { useState, useEffect } from "react";

import classificateMusicToGenre from "../utils/classificateMusicToGenre";
import { dateType } from "../constants";
import api from "../api";

const getYear = date => new Date(date).getFullYear();
const getMonth = date => new Date(date).getMonth();

const useMusicClassification = musics => {
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [classificatedData, setClassificatedData] = useState([]);

  useEffect(() => {
    setYear("");
    setMonth("");
    setClassificatedData([]);
  }, [type]);

  useEffect(() => {
    const classificateMusic = async () => {
      let filteredMusic = [];

      if (year === "") return;

      if (type === dateType.year) {
        filteredMusic = musics.filter(music => Number(year) === getYear(music.createdAt));
      } else {
        if (month === "") return;

        const trimedMonth = Number(month) - 1;
        const filteredByYear = musics.filter(music => Number(year) === getYear(music.createdAt));
        filteredMusic = filteredByYear.filter(music => trimedMonth === getMonth(music.createdAt));
      }

      if (filteredMusic.length === 0) return;

      const { genres } = await api.getGenre();
      const { musics: targetMusic } = await api.getMusicBySpecificMusic(filteredMusic);

      const classifiedMusic = classificateMusicToGenre(genres, targetMusic);

      setClassificatedData(classifiedMusic);
    };

    classificateMusic();
  }, [year, month, musics]);

  const handleExit = () => {
    setType("");
    setYear("");
    setMonth("");
    setClassificatedData([]);
  };

  return {
    classificatedData,
    type,
    year,
    month,
    setType,
    setYear,
    setMonth,
    handleExit,
  };
};

export default useMusicClassification;
