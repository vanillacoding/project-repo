import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { LOGO, BUTTON, COLOR } from "../../config/constants";

function Header() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/", { replace: true })}>
        <Text>{LOGO.C}</Text>
        <div>
          <CatImage
            className="cat"
            src="/assets/image/logo_cat.png"
            width="25vw"
            height="25vh"
          ></CatImage>
        </div>
        <Text>{LOGO.BLOCKS}</Text>
      </Logo>
      <ButtonWrapper>
        <Button onClick={() => navigate("/tutorial/stage1", { replace: true })}>
          {BUTTON.TUTORIAL}
        </Button>
        <Button onClick={() => navigate("/game_list", { replace: true })}>
          {BUTTON.GAME_SELECTION}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  border: none;
  background: ${COLOR.YELLOW};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15rem;
  font-size: 2.5rem;
  font-weight: bolder;
  transition: all 300ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:hover .cat {
    transform: rotateY(360deg);
  }
`;

const CatImage = styled.img`
  transition: all 1s ease-in-out;
`;

const Text = styled.span`
  color: ${COLOR.PURPLE};
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 15rem;
`;

const Button = styled.button`
  margin-left: 5rem;
  border: none;
  background: transparent;
  color: ${COLOR.BLACK};
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid ${COLOR.BLACK};
    color: ${COLOR.BLACK};
  }
`;

export { Header };
