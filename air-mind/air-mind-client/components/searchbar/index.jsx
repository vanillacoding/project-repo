import React from 'react';
import styled from 'styled-components';

export default function SearchBar() {
  return (
    <SearchBarWrapper>
      <SearchInput />
      <SearchButton>돋보기</SearchButton>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  left: 1700px;
`;
const SearchInput = styled.input``;
const SearchButton = styled.button``;
