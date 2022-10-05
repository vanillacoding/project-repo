import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { boxShadow } from "../../assets/styles/utilsStyled";
import { updateSetting } from "../../utils/api/user";
import { changeMode } from "../setting/settingSlice";

import GoogleAuth from "./GoogleAuth";

function Profile() {
  const email = useAppSelector((state) => state.auth.email);
  const name = useAppSelector((state) => state.auth.name);
  const imageUrl = useAppSelector((state) => state.auth.imageUrl);
  const themeMode = useAppSelector((state) => state.setting.themeMode);

  const [showDetailProfile, setShowDetailProfile] = useState(false);

  const profile = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profile.current && !profile.current.contains(e.target as Node)) {
        setShowDetailProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateThemeMode = useMutation(updateSetting);

  return (
    <ProfileWrap ref={profile}>
      <img
        src={imageUrl}
        alt="profile"
        onClick={() => {
          setShowDetailProfile(!showDetailProfile);
        }}
      />

      <ProfileInfoWrap active={showDetailProfile}>
        <ProfileInfo>
          <div>
            <Title>{name}</Title>
            <Content>
              테마 :
              <select
                value={themeMode}
                onChange={(e) => {
                  const themeMode = e.target.value;

                  dispatch(changeMode({ themeMode }));
                  updateThemeMode.mutate({ id: email, setting: { themeMode } });
                }}
              >
                <option value="light">LIGHT</option>
                <option value="dark">DARK</option>
              </select>
            </Content>
          </div>

          <GoogleAuth />
        </ProfileInfo>
      </ProfileInfoWrap>
    </ProfileWrap>
  );
}

const Content = styled.div`
  select {
    border: none;
    color: ${({ theme }) => theme.color.font};
    background-color: ${({ theme }) => theme.color.backgroundColor};
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  padding-bottom: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
`;

const ProfileInfoWrap = styled.div<{ active: boolean }>`
  position: absolute;
  width: 200px;
  height: 0;
  right: 10px;
  background-color: ${({ theme }) => theme.color.backgroundColor};
  overflow: hidden;
  border-radius: 5px;
  z-index: 999;

  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  ${({ active }) => {
    return (
      active &&
      css`
        height: 150px;
        ${boxShadow}
      `
    );
  }}
`;

const ProfileWrap = styled.div`
  position: relative;

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export default Profile;
