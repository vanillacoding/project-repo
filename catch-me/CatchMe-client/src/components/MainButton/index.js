import React from "react";
import styled from "styled-components";

const MainButton = ({ name, onClick }) => {
  return (
    <Button className="button" onClick={onClick}>
      <ButtonContent>{name}</ButtonContent>
    </Button>
  );
};

const Button = styled.div`
  width: 100%;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 8px 0 #AB3C2D, 0 15px 20px rgba(0, 0, 0, 0.35);
  transition: box-shadow .1s ease-in-out;
  font-size: 38px;
  color: #fff;
  cursor: pointer;

  :active, 
  :focus {
    box-shadow: 0 8px 0 #AB3C2D, 0 12px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonContent = styled.span`
  display: inline-block;
  width: 85%;
  padding: 7px 20px;
  background: #e55643;
  border-radius: 8px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.15);
  text-shadow: 0 -3px 3px rgba(175, 49, 95, 0.7);
  transition: background-color .2s ease-in-out, transform .1s ease-in-out;

  :active {
    transform: translate(0, 4px);
  }

  :hover {
    background-color: #F16A58;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }
`;

export default MainButton;
