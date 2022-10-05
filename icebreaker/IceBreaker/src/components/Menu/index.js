import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSound from 'use-sound';

import { smallPounding } from '../../styles/share/animation';
import { ROUTE } from '../../constants/game';

import Button from '../share/Button';

function Menu() {
  const [play] = useSound('/audio/click.mp3');

  return (
    <Container>
      <TitleWrapper>
        <h1 className="app-title">
          ICE <br />
          BREAKER
        </h1>
      </TitleWrapper>
      <MenuButtons>
        <li>
          <Link to={ROUTE.READY}>
            <Button
              text="혼자 얼음깨기"
              size="large"
              backgroundColor="skyBlue"
              onClick={play}
            />
          </Link>
        </li>
        <li>
          <Link to={ROUTE.ROOMS}>
            <Button
              text="같이 얼음깨기"
              size="large"
              backgroundColor="skyBlue"
              onClick={play}
            />
          </Link>
        </li>
        <Link to={ROUTE.RANKING}>
          <li>
            <Button
              text="랭킹 보기"
              size="large"
              backgroundColor="purple"
              onClick={play}
            />
          </li>
        </Link>
        <Link to={ROUTE.GAME_RULES}>
          <li>
            <Button
              text="게임 방법"
              size="large"
              backgroundColor="purple"
              onClick={play}
            />
          </li>
        </Link>
      </MenuButtons>
    </Container>
  );
}

export default Menu;

const Container = styled.div`
  height: 100%;
  background-image: url(/background/menu.jpg);
`;

const TitleWrapper = styled.div`
  height: 53%;
  text-align: center;
  padding-top: 210px;

  .app-title {
    width: 100%;
    line-height: 1.6em;
    font-size: 40px;
    color: white;
    -webkit-text-stroke: 2px ${({ theme }) => theme.deepBlue};
  }
`;

const MenuButtons = styled.ul`
  height: 47%;
  text-align: center;

  button {
    margin-bottom: 15px;
    animation: ${smallPounding} 1.2s infinite;
  }
`;
