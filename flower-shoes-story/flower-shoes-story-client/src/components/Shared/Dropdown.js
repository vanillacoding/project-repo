import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({ options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickToggle = () => setIsOpen(!isOpen);

  const handleClickOption = (option) => {
    setSelectedOption(() => option);
    setIsOpen(false);
  };

  return (
    <DropDownContainer isOpen={isOpen}>
      <DropDownHeader onClick={handleClickToggle}>
        {selectedOption || "visit"}
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          {options.map(option => (
            <li onClick={() => handleClickOption(option)} key={option}>
              {option}
            </li>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 160px;
  margin: 0 10px;
  border-bottom: 1px solid #222;
  height: 45px;
  line-height: 45px;
  text-align: left;
  vertical-align: bottom;

  :after {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% - 6px);
    right: 10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    padding: 3px;
    transform: ${(props) => props.isOpen ? "rotate(-135deg)" : "rotate(45deg)"};
    transition: .3s;
  }
`;

const DropDownHeader = styled.div`
  padding: 0 10px;
  font-weight: 500;
  font-size: 14px;
  color: #222;
`;

const DropDownList = styled.ul`
  margin: -10px 0 0;
  padding: 10px 10px 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;
  color: #222;
  font-size: 14px;
  font-weight: 500;
`;

export default Dropdown;
