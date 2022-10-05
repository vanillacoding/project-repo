import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CodeTyping } from '../../lib/images/undraw_code_typing.svg';
import Responsive from './Responisve';
import Button from './Button';

const IntroductionBlock = styled(Responsive)`
  margin-top: 2rem;
  padding-bottom: 2.5rem;
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  padding: 1rem;
  &:first-child {
    flex-direction: column;
  }

  .title {
    align-self: flex-start;
    margin-bottom: 1rem;
    color: ${props => props.theme.color.gray[9]};
    font-size: 2.25rem;
    font-weight: bold;
  }

  .sub-title {
    margin-bottom: 6rem;
    color: ${props => props.theme.color.gray[6]};
    font-weight: bold;
  }

  .code-typing {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 64rem) {
    .sub-title {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 48rem) {
    width: 100%;
    padding: 0;

    .title {
      margin-bottom: 0.5rem;
      font-size: 1.875rem;
    }

    .code-typing {
      margin-top: 1rem;
    }

    a {
      width: 100%;
      text-align: center;
    }
  }
`;

const Introduction = () => (
  <IntroductionBlock>
    <Column>
      <Row>
        <h2 className="title">당신의 코드는 몇 점인가요?</h2>
        <h3 className="sub-title">
          Point Code는 풍부한 문제 수는 물론, 당신의 코드를 분석해 점수를 측정하고 시각화해주는 신개념 알고리즘 풀이 사이트입니다.
        </h3>
        <Button to="/problems">지금 시작해보세요!</Button>
      </Row>
      <Row>
        <CodeTyping className="code-typing" />
      </Row>
    </Column>
  </IntroductionBlock>
);

export default Introduction;
