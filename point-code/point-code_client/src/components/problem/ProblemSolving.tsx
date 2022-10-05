import React from 'react';
import styled from 'styled-components';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import { AxiosError } from 'axios';
import { IUser } from '../../lib/api/auth';
import { IProblem, ISolution } from '../../lib/api/problems';
import ModalContainer from '../../containers/common/ModalContainer';
import Button from '../common/Button';
import Loading from '../common/Loading';

const ProblemSolvingBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 89vh;
`;

const InfoBlock = styled.div`
  width: 45%;
  border-right: 1px solid ${props => props.theme.color.gray[5]};
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};

  @media (max-width: 64rem) {
    width: 100%;
    border-right: 0;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};

  .title {
    font-size: 1.25rem;
    color: ${props => props.theme.color.gray[8]};
    font-weight: bold;
  }

  .level {
    padding: 0.5rem 1rem;
    border: 1px solid ${props => props.theme.color.gray[5]};
    background: white;
    color: ${props => props.theme.color.gray[8]};
    font-weight: bold;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
`;

const DescriptionBlock = styled.div`
  padding: 1rem;

  .description {
    color: ${props => props.theme.color.gray[9]};
    font-weight: 500;
    white-space: pre-wrap;
  }
`;

const CodeMirrorBlock = styled.div`
  width: 55%;
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};

  .CodeMirror {
    height: 89vh;
  }

  .CodeMirror-gutters {
    border-right: 1px solid ${props => props.theme.color.gray[5]};
  }

  @media (max-width: 64rem) {
    width: 100%;
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(11vh - 1px);
  padding: 0 1rem;

  .right {
    display: flex;
    align-items: center;
  }

  button {
    background: ${props => props.theme.color.gray[4]};
    &:hover {
      background: ${props => props.theme.color.gray[3]};
    }
  }

  button:not(:last-child) {
    margin-right: 0.75rem;
  }

  a:not(:last-child) {
    margin-right: 0.75rem;
  }

  @media (max-width: 48rem) {
    justify-content: center;

    a {
      display: none;
    }
  }
`;

const StyledButton = styled(Button)`
  position: relative;
  width: 100px;
  height: 55.7px;
`;

type ProblemSolvingProps = {
  user: IUser;
  problem: IProblem;
  userCode: string;
  isSolved: boolean;
  problems: IProblem[];
  solution: ISolution | null;
  failureTestsIndex: number[];
  solutionError: AxiosError<any> | null;
  isSolutionLoading: boolean;
  onChangeUserCode: (value: string) => void;
  onConfirmSolution: (userCode: string) => void;
};

const ProblemSolving = ({
  user,
  problem,
  userCode,
  isSolved,
  problems,
  solution,
  failureTestsIndex,
  solutionError,
  isSolutionLoading,
  onChangeUserCode,
  onConfirmSolution
}: ProblemSolvingProps) => {
  const options = {
    mode: 'javascript',
    lineNumbers: true,
    tabSize: 2,
    extraKeys: {
      Tab(cm: any) {
        const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    },
    scrollbarStyle: 'overlay',
    autoCloseBrackets: true
  };

  return (
    <ProblemSolvingBlock>
      {solution && (
        <ModalContainer>
          <p><span role="img" aria-label="success">💙</span> 정답입니다!</p>
          <p>당신의 점수는 {solution.point}점입니다.</p>
        </ModalContainer>
      )}
      {failureTestsIndex.length > 0 && (
        <ModalContainer>
          <p><span role="img" aria-label="failure">💔</span> 틀렸습니다!</p>
          {failureTestsIndex.map(testIndex => (
            <p key={testIndex}>{testIndex}번 테스트 실패</p>
          ))}
        </ModalContainer>
      )}
      {solutionError && (
        <ModalContainer>
          <p><span role="img" aria-label="failure">💔</span> 런타임 에러!</p>
        </ModalContainer>
      )}
      <InfoBlock>
        <TitleBlock>
          <h3 className="title">{problem.title}</h3>
          <button type="button" className="level">Level {problem.level}</button>
        </TitleBlock>
        <DescriptionBlock>
          <p className="description">{problem.description}</p>
        </DescriptionBlock>
      </InfoBlock>
      <CodeMirrorBlock>
        {isSolved ? (
          <CodeMirror
            value={problem.solutions.find(solution => solution.solved_user === user._id)?.submitted_code || userCode}
            options={options}
            onBeforeChange={() => {}}
          />
        ) : (
          <CodeMirror
            value={userCode}
            options={options}
            onBeforeChange={(editor, data, value) => {
              onChangeUserCode(value);
            }}
          />
        )}
      </CodeMirrorBlock>
      <ButtonsBlock>
        <div className="left">
          <Button to="/problems">돌아가기</Button>
          {problem.level !== 1 && problems.length && (
            <Button to={`/problems/${problems[Math.floor(Math.random() * problems.length)]._id}`}>
              난이도 낮추기
            </Button>
          )}
          {isSolved && (
            <Button to={`/problems/${problem._id}/solutions`}>
              솔루션 리스트
            </Button>
          )}
        </div>
        <div className="right">
          <Button disabled={isSolved} onClick={() => onChangeUserCode(problem.initial_code)}>
            초기화
          </Button>
          <StyledButton disabled={isSolved} onClick={() => onConfirmSolution(userCode)}>
            {isSolutionLoading ? <Loading /> : '제출' }
          </StyledButton>
        </div>
      </ButtonsBlock>
    </ProblemSolvingBlock>
  );
};

export default ProblemSolving;
