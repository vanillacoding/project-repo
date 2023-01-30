import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../config/constants/theme";
import api from "../../api/channelApi";

export default function ChannelDelete({
  channelInfo,
  setDoUpdate,
  toggleModal,
}) {
  const { _id: channelId } = channelInfo;
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleOnDelete = async () => {
    try {
      await api.deleteChannel(projectId, channelId);
      setDoUpdate(true);
      toggleModal();
    } catch (error) {
      navigate("/error", { replace: true });
    }
  };

  return (
    <Container>
      <ChannelTitle>삭제하시겠습니까?</ChannelTitle>
      <ButtonWrapper>
        <CustomButton onClick={handleOnDelete}>확인</CustomButton>
        <CustomButton onClick={toggleModal}>취소</CustomButton>
      </ButtonWrapper>
    </Container>
  );
}

ChannelDelete.propTypes = {
  channelInfo: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  setDoUpdate: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ChannelTitle = styled.h1``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
`;

export const CustomButton = styled.button`
  width: 80px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.skyBlue};
  cursor: pointer;

  &:hover {
    color: ${theme.white};
    background-color: ${theme.blue};
  }
`;
