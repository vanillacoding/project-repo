import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import useSearchField from "../../hooks/useSearchField";
import SearchList from "./SearchList";

const SearchBarWrapper = styled.div`
  position: relative;
  svg {
    font-size: 1.2em;
  }
`;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 80%;
  height: 25px;
  font-size: 1em;
`;

export default function SearchField({
  onSearchInputChange,
  onSelectSearchResult,
}) {
  const {
    searchState,
    handleInputChange,
    handleInputKeyDown,
    handleBlur,
    handleFocus,
    handleSearchItemClick,
    handleSearchItemMouseOver,
    handleSearchItemMouseLeave,
  } = useSearchField({ onSearchInputChange, onSelectSearchResult });

  return (
    <SearchBarWrapper
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Input
        value={searchState.inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <FontAwesomeIcon icon={faSearch} />
      {
        <SearchList
          isVisible={searchState.isListVisible}
          searchList={searchState.searchViewList}
          focusIndex={searchState.searchItemFocusIndex}
          onSearchItemClick={handleSearchItemClick}
          onSearchItemMouseOver={handleSearchItemMouseOver}
          onSearchItemMouseLeave={handleSearchItemMouseLeave}
        />
      }
    </SearchBarWrapper>
  );
}
