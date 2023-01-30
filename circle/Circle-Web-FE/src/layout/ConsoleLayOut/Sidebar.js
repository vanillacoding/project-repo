import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MdOutlineTrackChanges, MdOutlineChat } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

import useLogout from "../../hooks/useLogout";
import theme from "../../config/constants/theme";
import defaultProfile from "../../assets/images/app1.png";

export default function Sidebar({ authUserData }) {
  const { projectId } = useParams();

  const handleOnLogOut = useLogout();

  const { displayName, photoUrl } = authUserData;

  return (
    <Container>
      <UserWrapper>
        <UserImage alt="profile-img" src={photoUrl || defaultProfile} />
        <UserName>{`${displayName} 님`}</UserName>
      </UserWrapper>
      <SideWrapper>
        <ListWrapper>
          <ListItem>
            <ProjectLink to={`/console/projects/${projectId || ""}`}>
              <SettingIcon />
              버튼 설치 및 설정
            </ProjectLink>
          </ListItem>
          <ListItem>
            <ChannelLink to={`/console/projects/${projectId}/channels`}>
              <ChannelIcon />
              채널 관리
            </ChannelLink>
          </ListItem>
        </ListWrapper>
        <LogoutButton onClick={handleOnLogOut}>
          <LogoutIcon />
          Logout
        </LogoutButton>
      </SideWrapper>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15vw;
  min-width: 230px;
  height: 100%;
  background-color: ${theme.gray};
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;
  z-index: 9;
`;

const UserWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 1vh;
  margin-left: 2vw;
  padding: 16px;
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
`;

const UserName = styled.span`
  padding-left: 1vw;
  max-width: 130px;
  font-size: 18px;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ListWrapper = styled.ul`
  display: block;
  margin-top: 2vh;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: inline-block;
  width: 90%;
  margin: 15px;
  padding-left: 0;
  border-radius: 20px;
`;

const ProjectLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5vmin;
  border-radius: 20px;
  font-size: 18px;
  color: ${theme.black};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    @include transition(all 0.5s ease);
  }
`;

const SettingIcon = styled(MdOutlineTrackChanges)`
  margin-right: 0.7vw;
  font-size: 28px;
  cursor: pointer;
`;

const ChannelLink = styled(Link)`
  display: flex;
  align-items: center;
  text-align: center;
  min-width: 7vw;
  padding: 1.5vmin;
  border-radius: 20px;
  font-size: 18px;
  color: ${theme.black};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    @include transition(all 0.5s ease);
  }
`;

const ChannelIcon = styled(MdOutlineChat)`
  margin-right: 0.7vw;
  font-size: 28px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-self: end;
  width: 90%;
  margin: 1vmin;
  padding: 1.5vmin;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    @include transition(all 0.5s ease);
  }
`;

const LogoutIcon = styled(RiLogoutBoxLine)`
  margin-right: 0.7vw;
  font-size: 28px;
  cursor: pointer;
`;

Sidebar.propTypes = {
  authUserData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
