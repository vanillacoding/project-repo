import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { getCookie, deleteCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';

import MindMapInfo from '../mindmapinfo';
import { HeaderButton } from '../shared/button';
import ProfileIcon from '../shared/profileicon';

import { logOut } from '../../service/auth';
import { currentUserInfo } from '../../store/states';
import { AUTH_EXPIRED } from '../../constants/constants';

export default function Header() {
  const router = useRouter();
  const { mindMapId } = router.query;

  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo);

  const [isLogin, setIsLogin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loginData = getCookie('loginData');

    if (loginData !== 'notAuth' && !userInfo.username) {
      try {
        const userData = jwtDecode(loginData);
        const userId = getCookie('loginData-id');
        const { name, email, picture } = userData;

        setUserInfo({
          _id: userId,
          username: name,
          email,
          profile: picture,
        });
        setIsLogin(true);
      } catch (error) {
        return;
      }
    }

    if (loginData !== 'notAuth' && userInfo.username) {
      setIsLogin(true);
    }

    if (userInfo.username && loginData === 'notAuth') {
      setUserInfo({});
      setIsLogin(false);
    }

    const loginDate = new Date(getCookie('loginTime'));
    const currentDate = new Date();

    if (currentDate.getTime() - loginDate.getTime() >= 3600000) {
      deleteCookie('loginData');
      deleteCookie('loginData-id');
      deleteCookie('loginTime');
      setUserInfo({});
      setIsLogin(false);

      alert(AUTH_EXPIRED);
    }
  }, []);

  const clickLogOutHandler = () => {
    logOut();
    deleteCookie('loginData');
    deleteCookie('loginData-id');
    deleteCookie('loginTime');
    setUserInfo({});
    setIsLogin(false);
    return router.push('/');
  };

  return (
    mounted && (
      <HeaderWrapper>
        <HeaderLeftSide>
          <Link href="/">
            <div>
              <Image
                src="/images/air_mind_logo.png"
                width="55px"
                height="55px"
                className="homeIcon"
                alt="airmind-logo"
              />
            </div>
          </Link>
          <Link href="/">
            <div>
              <HeaderHomeButton>air-mind</HeaderHomeButton>
            </div>
          </Link>
        </HeaderLeftSide>
        {mindMapId && <MindMapInfo mindMapId={mindMapId} />}
        {!isLogin ? (
          <HeaderRightSide>
            <Link href="/login">
              <div>
                <HeaderLoginButton>Log In</HeaderLoginButton>
              </div>
            </Link>
            <ProfileIcon
              src={userInfo.profile || 'guest'}
              alt="profile"
              size="medium"
            />
          </HeaderRightSide>
        ) : (
          <HeaderRightSide>
            <HeaderMyWorkButton onClick={() => router.push('/my-works')}>
              My Work
            </HeaderMyWorkButton>
            <HeaderLoginButton onClick={clickLogOutHandler}>
              LogOut
            </HeaderLoginButton>
            <ProfileIcon
              src={userInfo.profile || 'guest'}
              alt="profile"
              size="medium"
            />
          </HeaderRightSide>
        )}
      </HeaderWrapper>
    )
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100px;
  padding: 0 10px;
  background-color: #2c2c2c;
`;

const HeaderLeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  margin-left: 30px;

  .homeIcon {
    cursor: pointer;
  }
`;

const HeaderRightSide = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 30px;
`;

const HeaderHomeButton = styled(HeaderButton)`
  &:hover {
    color: #e64c82;
  }
`;

const HeaderMyWorkButton = styled(HeaderButton)`
  &:hover {
    color: #82c91e;
  }
`;

const HeaderLoginButton = styled(HeaderButton)`
  margin-right: 15px;
  &:hover {
    color: #fab004;
  }
`;
