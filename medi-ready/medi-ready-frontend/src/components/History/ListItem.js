import React from "react";
import styled from "styled-components";

const ListItem = ({ prescription, openModal, className }) => {
  const description = prescription.description;
  const date = prescription.created_at.slice(0, 10);
  const { name, picture } = prescription.patient.user;

  return (
    <Wrapper onClick={openModal} className={className}>
      <User>
        <span><img src={picture} alt={name} /></span>
        <b>{name}</b>
      </User>
      <span>{description}</span>
      <span>{date}</span>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  span {
    font-size: 14px;
    color: #767676;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  color: #767676;
  font-size: 14px;

  img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50px;
  }
`;

export default ListItem;
