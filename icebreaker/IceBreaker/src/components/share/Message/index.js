import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import theme from '../../../styles/theme';

const STYLES = {
  game: css`
    background-color: ${theme.purple};
  `,
  item: css`
    background-color: ${theme.deepGray};
  `,
  battle: css`
    background-color: ${theme.purple};
  `,
  enterRoom: css`
    background-color: ${theme.deepGray};
  `,
  makeRoom: css`
    background-color: ${theme.purple};
    color: ${theme.deepGray};
  `,
  break: css`
    background-color: ${theme.purple};
  `,
  answer: css`
    background-color: ${theme.deepPink};
  `,
  validationInput: css`
    background-color: ${theme.deepBlue};
  `,
  validationAnswer: css`
    background-color: ${theme.deepGray};
  `,
};

function Message({ height }) {
  const type = useSelector((state) => state.quiz.message.type);
  const text = useSelector((state) => state.quiz.message.text);
  const messageStyle = type ? STYLES[type] : null;

  return (
    <Wrapper height={height}>
      <Text isMessage={!!text} className="text" messageStyle={messageStyle}>
        {text}
      </Text>
    </Wrapper>
  );
}

const MemoizedMessage = memo(Message);
export default MemoizedMessage;

Message.propTypes = {
  height: PropTypes.string,
};

Message.defaultProps = {
  height: '5%',
};

const Wrapper = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  text-align: center;
`;

const Text = styled.p`
  height: 100%;
  font-size: 1em;
  font-family: 'Do Hyeon';
  line-height: 2.3em;
  box-shadow: inset
    ${({ theme, isMessage }) => (isMessage ? theme.boxShadow : null)};
  color: ${({ theme }) => theme.white};

  ${({ messageStyle }) => messageStyle};
`;
