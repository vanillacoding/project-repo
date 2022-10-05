import React from 'react';
import styled from 'styled-components';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/theme/material-darker.css';
import { IPopulatedSolution } from '../../lib/api/problems';
import Responsive from '../common/Responisve';
import Loading from '../common/Loading';

const SolutionListBlock = styled(Responsive)`
  margin-top: 2rem;
  padding-bottom: 2.5rem;
`;

const List = styled.ul``;

const Item = styled.li`
  margin-bottom: 2rem;
`;

const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;

  .avatar {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.25rem;
  }

  .name {
    margin-bottom: 0.125rem;
    color: ${props => props.theme.color.gray[7]};
  }

  .email {
    color: ${props => props.theme.color.blue[7]};
  }
`;

type SolutionItemProps = {
  solution: IPopulatedSolution;
};

const SolutionItem = ({ solution }: SolutionItemProps) => {
  const options = {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'material-darker'
  };

  return (
    <Item>
      <ProfileBlock>
        <img className="avatar" src={solution.solved_user.avatar_url} alt="유저 아바타 이미지" />
        <div className="right">
          <p className="name">{solution.solved_user.name}</p>
          <p className="email">{solution.solved_user.email}</p>
        </div>
      </ProfileBlock>
      <CodeMirror
        value={solution.submitted_code}
        options={options}
        onBeforeChange={() => {}}
      />
    </Item>
  );
};

type SolutionListProps = {
  solutions: IPopulatedSolution[] | null;
  isLoading: boolean;
};

const SolutionList = ({ solutions, isLoading }: SolutionListProps) => (
  <SolutionListBlock>
    {isLoading && <Loading />}
    <List>
      {!isLoading && solutions && solutions.map(solution => (
        <SolutionItem
          key={solution.solved_user._id}
          solution={solution}
        />
      ))}
    </List>
  </SolutionListBlock>
);

export default SolutionList;
