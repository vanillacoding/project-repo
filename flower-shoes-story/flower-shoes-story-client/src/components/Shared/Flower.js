import React from "react";
import styled from "styled-components";

const Flower = ({ flower }) => {
  const petals = Array(flower).fill("");

  return (
    <Wrapper flower={flower}>
      {petals.map((_, index) => {
        return <Petal index={index} petals={flower} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.li`
  position: relative;
  div {
    top: 20px;
    left: 20px;
    width: 20px;
    height: 20px;
  }
  :after {
    content: "";
    position: absolute;
    z-index: 2;
    top: calc(50% - 4px);
    left: calc(50% - 4px);
    width: 7px;
    height: 7px;
    background-color: tomato;
    border-radius: 50%;
    opacity: 1;
  }
  > div {
    width: 20px;
    height: 20px;
    top: 20px;
    left: 20px;
  }
`;

const Petal = styled.div`
  position: absolute;
  z-index: 1;
  background: #f18989;
  border-radius: 2px 20px;
  transform-origin: 0% 0%;
  border-radius: 2% 50%;
  opacity: 1;
  transition: all 0.5s ease-in-out;
  box-shadow: 0 0 0 0 rgb(0 0 0 / 0%);
  transform: ${(props) => `rotate(${props.index * (360 / props.petals)}deg) translateY(0);`};
`;

export default Flower;
