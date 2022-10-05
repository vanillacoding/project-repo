import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Responsive from '../common/Responisve';
import Button from '../common/Button';

const PaginationBlock = styled(Responsive)`
  display: flex;
  width: 19rem;
  padding-bottom: 2.5rem;
`;

const LevelSelect = styled.select`
  margin-right: 0.5rem;
  padding-left: 0.125rem;
  padding-right: 0.75rem;
  border: 1px solid ${props => props.theme.color.gray[4]};
  border-radius: 4px;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem 1rem;
`;

const PageNumber = styled.div`
  margin: 0 0.5rem;
  margin-top: 0.5rem;
`;

const createLink = ({ page, level }: { page: number, level: number }) => {
  const query = qs.stringify({ page, level });

  return `/problems?${query}`;
};

type PaginationProps = {
  page: number;
  level: number;
  lastPage: number;
  onChangeLevel: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination = ({ page, level, lastPage, onChangeLevel }: PaginationProps) => (
  <PaginationBlock>
    <LevelSelect value={level} onChange={onChangeLevel}>
      <option value="reset">
        Level All
      </option>
      <option value="1">
        Level 1
      </option>
      <option value="2">
        Level 2
      </option>
      <option value="3">
        Level 3
      </option>
    </LevelSelect>
    <StyledButton
      disabled={page === 1}
      to={page === 1 ? undefined : createLink({ page: page - 1, level })}
    >
      ＜
    </StyledButton>
    <PageNumber>{page}</PageNumber>
    <StyledButton
      disabled={page === lastPage}
      to={page === lastPage ? undefined : createLink({ page: page + 1, level })}
    >
      ＞
    </StyledButton>
  </PaginationBlock>
);

export default Pagination;
