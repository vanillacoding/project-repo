import React, { useState, useEffect, useContext } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { savePasswords } from "../../actions/password";
import { savePuzzles } from "../../actions/puzzle";
import { fetchPuzzles, fetchPasswords } from "../../api";
import configIcon from "../../assets/common/config_icon.png";
import { ModalContext } from "../../contexts/ModalContext";
import Loading from "../Loading";
import IconButton from "../Shared/IconButton";
import NotFound from "../Shared/NotFound";
import Memo from "./Memo";
import Menu from "./Menu";
import Music from "./Music";
import ProgressBar from "./ProgressBar";
import Room from "./Room";
import TextBox from "./TextBox";
import Timer from "./Timer";
import TodoList from "./TodoList";

const Wrapper = styled.div`
  width: 800px;
  height: 600px;
  margin: -3rem 0 0 0;
  position: relative;
  border: 1px solid ${({ theme }) => theme.color.black};

  &::before,
  &::after {
    content: "";
    width: 800px;
    height: 600px;
    display: block;
    position: absolute;
  }

  &::before {
    background: #ffffff;
    transform: rotate(-3deg);
  }

  &::after {
    top: 0;
    background: ${({ theme, room }) => theme.color[room]};
    transform: rotate(3deg);
  }
`;

function Game() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleModal } = useContext(ModalContext);
  const { room } = useParams();
  const dispatch = useDispatch();

  const fetchData = async (apiCallback, dispatchAction) => {
    const response = await apiCallback();

    if (response.status === 200) {
      const { data } = await response.json();
      dispatch(dispatchAction(data));
      return;
    }

    setError("게임 데이터를 불러올 수 없습니다.");
  };

  const getData = async () => {
    try {
      setIsLoading(true);

      await fetchData(fetchPuzzles, savePuzzles);
      await fetchData(fetchPasswords, savePasswords);
    } catch (err) {
      setError("게임 데이터를 불러올 수 없습니다.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2300);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading
        ? <Loading />
        : error
          ? <NotFound title={"500\nError"} text="게임 데이터를 불러올 수 없습니다." />
          : (
            <Wrapper room={room}>
              <Timer />
              <ProgressBar />
              <TodoList />
              <Room room={room} />
              <TextBox />
              <IconButton
                type="button"
                name="메뉴 보기"
                icon={configIcon}
                top="0px"
                handleClick={() => handleModal(<Menu />)}
              />
              <Music />
              <Memo />
            </Wrapper>
          )}
    </>
  );
}

export default Game;
