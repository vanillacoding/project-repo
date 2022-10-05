import { useState } from "react";
import styled from "styled-components";

import Button from "../../common/Button";

import wordConverter from "../../../utils/wordConverter";
import setHashtagFormat from "../../../utils/setHashtagFormat";

import { SEARCH } from "../../../constants/variants";
import { SEARCH_ICON } from "../../../constants/images";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 28px;
  padding: 5px 0px 5px 10px;
  border: solid rgba(134, 64, 249, 0.48);
  border-width: 2px 0px 2px 2px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 2.5px 2.5px 0px rgba(0, 0, 0, 0.15);
`;

const SearchIcon = styled.img`
  width: 23px;
  height: 20px;
`;

const SearchInput = styled.input`
  padding: 0px 10px;
  width: 340px;
  border: none;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("#");
  const [searchValue, setSearchValue] = useState("");

  const handleInputValue = (event) => {
    const value = setHashtagFormat(event);
    const query = wordConverter(value);

    setInputValue(value);
    setSearchValue(query);
  };

  const handleSearch = () => {
    document.location.replace(searchValue);
  };

  const pressEnterKey = ({ key }) => {
    if (key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchWrapper>
      <SearchIcon
        src={SEARCH_ICON}
        alt="돋보기 아이콘"
      />
      <SearchInput
        type="text"
        placeholder="#HashTag"
        onChange={handleInputValue}
        onKeyPress={pressEnterKey}
        value={inputValue}
      />
      <Button
        variant={SEARCH}
        children={"검 색"}
        onClick={handleSearch} />
    </SearchWrapper>
  );
};
