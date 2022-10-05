import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import api from "../api";
import * as actions from "../reducers/user";

const useGenreChoose = () => {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState([]);

  const inputZeroRef = useRef("");
  const inputOneRef = useRef("");
  const inputTwoRef = useRef("");
  const inputThreeRef = useRef("");
  const inputFourRef = useRef("");
  const inputFiveRef = useRef("");
  const inputSixRef = useRef("");
  const inputSevenRef = useRef("");
  const inputEightRef = useRef("");

  const refs = {
    0: inputZeroRef,
    1: inputOneRef,
    2: inputTwoRef,
    3: inputThreeRef,
    4: inputFourRef,
    5: inputFiveRef,
    6: inputSixRef,
    7: inputSevenRef,
    8: inputEightRef,
  };

  useEffect(() => {
    const getGenre = async () => {
      const { genres } = await api.getGenre();

      setGenre(genres);
    };

    getGenre();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const choose = [];

    for (let i = 0; i < Object.keys(refs).length; i++) {
      if (refs[i].current.checked) choose.push({ genreId: refs[i].current.name });
    }

    dispatch(actions.chooseGenreRequest(choose));
  };

  return {
    refs,
    genre,
    handleSubmit,
  };
};

export default useGenreChoose;
