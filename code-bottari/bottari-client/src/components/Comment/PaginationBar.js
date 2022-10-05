import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  padding: 3px;
  margin: 0 auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: var(--caret-color);
  color: white;
  text-align: center;
`;

const PageButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 17px;
  font-weight: 600;

  &:focus {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background-color: white;
    color: black;
    outline: none;
  }
`;

const PageLi = styled.li`
  display: inline-block;
  width: 25px;
  padding: 5px;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 600;

  &:hover ${PageButton} {
    color: var(--color-mint-focus);
    cursor: pointer;
  }
`;

export default function PaginationBar({ commentsPerPage, totalComments, paginate }) {
  const pageNumbers = [];
  const lastPageNumber = Math.ceil(totalComments / commentsPerPage);

  for (let i = 1; i <= lastPageNumber; i++) {
    pageNumbers.push(i);
  }

  const handleOnClick = (number) => paginate(number);

  return (
    <PageUl>
      {pageNumbers.map((number) => (
        <PageLi key={number} onClick={() => handleOnClick(number)}>
          <PageButton autoFocus={number === 1}>{number}</PageButton>
        </PageLi>
      ))}
    </PageUl>
  );
};
