import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IColor } from '../../lib/styles/styled';
import { IProblem } from '../../lib/api/problems';
import Responsive from '../common/Responisve';
import Loading from '../common/Loading';

const ProblemListBlock = styled(Responsive)`
  position: relative;
  height: 369.5px;
  margin-top: 2rem;

  @media (max-width: 64rem) {
    height: 835px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.li`
  width: 50%;
  padding: 0 1rem;
  &:nth-child(odd) {
    padding-left: 0;  
  }
  &:nth-child(even) {
    padding-right: 0;
  }
  
  @media (max-width: 64rem) {
    width: 100%;
    padding: 0;
    padding-bottom: 1rem;
  }
`;

const Block = styled.div<{ borderColor: keyof IColor }>`
  padding: 0 1.125rem;
  padding-top: 0.625rem;
  padding-bottom: 2.5rem;
  border-top: 3px solid ${({ theme, borderColor }) => theme.color[borderColor][3]};

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.625rem;
  }

  .category {
    color: ${props => props.theme.color.gray[6]};
    font-weight: 500;
  }

  .level {
    padding: 0.5rem 1rem;
    border: 1px solid ${props => props.theme.color.gray[4]};
    background: white;
    color: ${props => props.theme.color.gray[8]};
    font-weight: bold;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .title {
    font-size: 1.25rem;
    color: ${props => props.theme.color.gray[7]};
    font-weight: bold;
  }
`;

type ProblemItemProps = {
  problem: IProblem;
};

const ProblemItem = ({ problem }: ProblemItemProps) => {
  const { _id, level, title } = problem;
  const colors = { 1: 'green', 2: 'teal', 3: 'grape' };
  const borderColor = colors[level] as keyof IColor;

  return (
    <Item>
      <Link to={`/problems/${_id}`}>
        <Block borderColor={borderColor}>
          <div className="top">
            <button type="button" className="level">Level {level}</button>
          </div>
          <h3 className="title">{title}</h3>
        </Block>
      </Link>
    </Item>
  );
};

type ProblemListProps = {
  problems: IProblem[] | null;
  isLoading: boolean;
};

const ProblemList = ({ problems, isLoading }: ProblemListProps) => (
  <ProblemListBlock>
    {isLoading && <Loading />}
    <List>
      {!isLoading && problems && problems.map(problem => (
        <ProblemItem
          key={problem._id}
          problem={problem}
        />
      ))}
    </List>
  </ProblemListBlock>
);

export default ProblemList;
