import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { getMedicineNames } from "../../api";
import useDebounce from "../../hooks/useDebounce";

import SearchPreview from "./SearchPreview";
import TextInput from "../Shared/TextInput";

const SearchBar = ({ className, keyword, setKeyword, searchResult, setSearchResult }) => {
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedSearchKeyword) {
      try {
        async function getSearchData() {
          setIsSearching(true);

          const { data } = await getMedicineNames(debouncedSearchKeyword);

          setSearchResult(data);
          setIsSearching(false);
        }

        getSearchData();
      } catch (error) {}

    }
  }, [debouncedSearchKeyword]);

  const renderResults = searchResult?.map(({ medicine_id, itemName, frequency }, index) => {
    return (
      <SearchPreview
        index={index}
        name={itemName}
        id={medicine_id}
        key={medicine_id, index}
        frequency={frequency}
        updateValue={setKeyword}
      />
    );
  });

  return (
    <>
      <TextInput
        label="search"
        name="search"
        value={keyword}
        className={className}
        placeholder="약 검색어를 입력해주세요."
        onChange={(event) => setKeyword(event.target.value)}
      />
      {searchResult.length > 0 && <SearchResult>{renderResults}</SearchResult>}
    </>
  );
};

const AutoCompleteWrapper = styled.input`
  display: inline-block;
  width: ${(props) => props.width};
  height: 45px;
  padding: 0 20px;
  border-radius: 8px;
  background-color: #eff0f6;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 210px;
  background-color: white;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  z-index: 99;
  overflow-y: scroll;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
`;

AutoCompleteWrapper.defaultProps = {
  width: "100%",
};

export default SearchBar;
