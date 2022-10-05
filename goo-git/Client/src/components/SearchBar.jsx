import React, { useState } from 'react';
import { StyledForm } from '../styledComponents/EditorPageHeader.styled';
import SearchInput from './SearchInput';
import SearchIconButton from './SearchIconButton';

export default function SearchBar({ handleInput, onSubmit }) {
  const [keyword, setKeyword] = useState('');

  function keywordChangeHandler(event) {
    setKeyword(event.target.value);
  };

  function submitHandler(event) {
    event.preventDefault();
    if (!keyword) return;
    setKeyword('');
    onSubmit();
    handleInput(event);
  }
  return (
    <StyledForm onSubmit={submitHandler}>
      <SearchInput onChange={keywordChangeHandler} keyword={keyword} />
      <SearchIconButton />
    </StyledForm>
  );
}
