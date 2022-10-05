import React, { useContext } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ModalContext } from "../../../contexts/ModalContext";
import Button from "../../Shared/NormalButton";

const Content = styled.div`
  width: 400px;
  height: auto;
  padding: ${({ theme }) => theme.padding.big};
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const List = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Menu() {
  const { handleModal } = useContext(ModalContext);
  const history = useHistory();

  const goToMain = () => {
    handleModal(null);
    history.push("/");
  };

  const goToReview = () => {
    handleModal(null);
    history.push("/review");
  };

  return (
    <Content>
      <Title>MENU</Title>
      <List>
        <Button
          color="black"
          title="메인 화면으로"
          handleClick={goToMain}
        />
        <Button
          color="black"
          title="리뷰 보러가기"
          handleClick={goToReview}
        />
      </List>
    </Content>
  );
}

export default Menu;
