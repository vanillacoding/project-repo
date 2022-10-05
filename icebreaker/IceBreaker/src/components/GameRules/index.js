import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IoCaretBack } from 'react-icons/io5';
import { pounding } from '../../styles/share/animation';
import { ROUTE } from '../../constants/game';

function GameRules() {
  return (
    <Container>
      <Link to={ROUTE.MENU}>
        <BackButton type="button">
          <IoCaretBack />
        </BackButton>
      </Link>
    </Container>
  );
}

export default GameRules;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(/background/rules.jpg);
  background-size: 375px 713px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 5px;
  left: 0;
  font-size: 30px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.purple};
  transition: all 100ms ease-out;
  animation: ${pounding} 1.2s infinite;

  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.deepPink};
  }
`;
