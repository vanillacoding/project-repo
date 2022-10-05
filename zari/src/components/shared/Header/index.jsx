import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Header as S } from './styles';
import { showModal } from '../../../reducers/modalSlice';
import { logout } from '../../../reducers/userSlice';

export default function Nav({ setIsFirstSelect }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogoutClick() {
    dispatch(logout());
    history.push('/');
  }

  function handleChangeCharacter() {
    setIsFirstSelect(false);
    dispatch(showModal());
  }

  return (
    <S.Container>
      <S.NavContainer>
        <S.NavLeft>
          <S.NavItem>
            <S.Title>Zari</S.Title>
          </S.NavItem>
        </S.NavLeft>
        <S.NavRight>
          <S.NavItem>
            <S.Text onClick={handleChangeCharacter}>
              캐릭터 변경
            </S.Text>
          </S.NavItem>
          <S.NavItem>
            <S.Text>
              {user.data?.name}
            </S.Text>
          </S.NavItem>
          {user?.status && (
            <S.NavItem>
              <S.Text onClick={handleLogoutClick}>
                로그아웃
              </S.Text>
            </S.NavItem>
          )}
        </S.NavRight>
      </S.NavContainer>
    </S.Container>
  );
}
