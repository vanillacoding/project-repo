import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateIsMusicPlay } from "../../features/block/blockSlice";

import { LOGO, BUTTON } from "../../config/constants";
import { COLOR } from "../../config/constants";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateIsMusicPlay(false));
  }, []);

  return (
    <Background>
      <Logo>
        <Text>{LOGO.C}</Text>
        <div>
          <CatImage
            className="cat"
            src="/assets/image/logo_cat.png"
            width="110vw"
            height="110vh"
          ></CatImage>
        </div>
        <Text>{LOGO.BLOCKS}</Text>
      </Logo>
      <Button
        onClick={() => {
          navigate("/tutorial/stage1", { replace: true });
          dispatch(updateIsMusicPlay(true));
        }}
      >
        <Icon className="fa-solid fa-gamepad" />
        {BUTTON.TUTORIAL}
      </Button>
      <Button
        onClick={() => {
          navigate("game_list", { replace: true });
          dispatch(updateIsMusicPlay(true));
        }}
      >
        <Icon className="fa-solid fa-list" />
        {BUTTON.GAME_SELECTION}
      </Button>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.YELLOW};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13rem;
  font-weight: 900;
  margin-bottom: 3rem;
  transition: all 1s;

  &:hover {
    transform: scale(1.05);
  }

  &:hover .cat {
    transform: rotateY(360deg);
  }
`;

const Text = styled.span`
  color: ${COLOR.PURPLE};
`;

const Icon = styled.i`
  margin-right: 1rem;
`;

const CatImage = styled.img`
  transition: all 1s ease-in-out;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 15rem;
  margin: 1rem;
  border: none;
  border-radius: 30px;
  background: ${COLOR.WHITE};
  color: ${COLOR.RED};
  font-size: 2rem;
  font-weight: bolder;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:hover {
    background-color: ${COLOR.RED};
    color: ${COLOR.WHITE};
    transition: all 200ms;
  }
`;

export { Home };
