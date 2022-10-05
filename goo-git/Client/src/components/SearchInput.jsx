import React from 'react';
import StyledInputArea, { searchBarTheme } from './InputArea';

export default function SearchInput({ onChange, keyword }) {
  return (
    <StyledInputArea
      theme={searchBarTheme}
      name='keyword'
      value={keyword}
      placeholder='검색어를 입력하세요'
      onChange={onChange}
    />
  );
}
