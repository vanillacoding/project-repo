import React from "react";
import styled from "styled-components";

const PlayerCard = ({ name, isReady, role }) => {
  return (
    <Card isReady={isReady} role={role}>
      <Title>{name}</Title>
      {/* <Content>{isReady ? "ready" : "unReady"}</Content> */}
      <Content>{role}</Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  width: 95%;
  height: 14%;
  padding: 10px;
  flex-direction: column;
  background: ${({ isReady, role }) =>
    isReady ? (role === "rabbit" ? "#e55643" : "#2b9f5e") : "#F3ECE4"};
  color: ${({ isReady }) => isReady && "white"};
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #d6cbbf;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;


const Title = styled.h4`
  font-size: 22px;
  font-weight: lighter;
  margin: 0;
`;

const Content = styled.h4`
  font-size: 18px;
  margin: 8px;
  text-align: right;
  font-weight: lighter;
`;

export default PlayerCard;
