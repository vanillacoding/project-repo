import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IUser } from '../../lib/api/auth';
import Responsive from './Responisve';
import Button from './Button';

const HeaderBlock = styled.header`
  width: 100%;
  z-index: 100;
`;

const Wrapper = styled(Responsive)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;

  .logo {
    font-size: 1.5rem;
    color: ${props => props.theme.color.gray[7]};
  }

  .right {
    display: flex;
    align-items: center;
  }

  .profile-link {
    display: flex;
    align-items: center;
  }

  .login-link {
    margin-right: 1.5rem;
    color: ${props => props.theme.color.gray[6]};
    font-weight: bold;
    &:hover {
      color: ${props => props.theme.color.gray[5]};
    }
  }

  .avatar {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.25rem;
  }

  .name {
    margin-right: 1.375rem;
    color: ${props => props.theme.color.gray[7]};
  }

  @media (max-width: 48rem) {
    .logo {
      font-size: 1.25rem;
    }

    .login-link {
      margin-right: 0.75rem;
    }

    .name {
      display: none;
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 1.125rem;
  background: ${props => props.theme.color.blue[4]};
  &:hover {
    background: ${props => props.theme.color.blue[3]};
  } 
  
  @media (max-width: 48rem) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
`;

type HeaderProps = {
  user: IUser | null;
  onLogout: () => void;
};

const Header = ({ user, onLogout }: HeaderProps) => (
  <HeaderBlock>
    <Wrapper>
      <h1 className="logo">
        <Link to="/">PointCode</Link>
      </h1>
      {user ? (
        <div className="right">
          <Link className="profile-link" to="/profile">
            <img className="avatar" src={user.avatar_url} alt="유저 아바타 이미지" />
            <span className="name">{user.name}</span>
          </Link>
          <StyledButton onClick={onLogout}>로그아웃</StyledButton>
        </div>
      ) : (
        <div className="right">
          <Link className="login-link" to="/users/login">로그인</Link>
          <StyledButton to="/users/signup">회원가입</StyledButton>
        </div>
      )}
    </Wrapper>
  </HeaderBlock>
);

export default Header;
