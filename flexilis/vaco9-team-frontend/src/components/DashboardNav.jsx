import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { selectCampaign } from '../reducers/selectedCampaign';

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.WHITE};
  font-family: 'Nanum Barun Gothic';
`;

const NavProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14%;
`;

const NavProfile = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
  background-color: ${props => props.theme.WHITE};
  border-radius: 5px;
`;

const NavIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const NavUserInfos = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const NavUserInfoItem = styled.span`
  font-size: 15px;
`;

const NavCampaignContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 65%;
`;

const NavCampaigns = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;
`;

const NavCampaignItem = styled.button`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 15px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  background-color: white;
  &:hover {
    background-color: ${props => props.theme.MAIN}
  }
  &:focus {
    background-color: ${props => props.theme.SUB}
  }
`;

export default function DashboardNav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { allIds, byId } = useSelector(state => state.campaigns);

  function handleNavItemOnClick(event) {
    dispatch(selectCampaign(event.target.id));
  }

  return (
    <NavWrapper>
      <NavProfileContainer>
        <NavProfile>
          <NavIconContainer>
            <FaRegUserCircle size={35} />
          </NavIconContainer>
          <NavUserInfos>
            <NavUserInfoItem>{user.name}</NavUserInfoItem>
            <NavUserInfoItem>{user.email}</NavUserInfoItem>
          </NavUserInfos>
        </NavProfile>
      </NavProfileContainer>
      <NavCampaignContainer>
        <NavCampaigns>
          {allIds && allIds.map((id) => (
            <NavCampaignItem
              key={byId[id]._id}
              id={byId[id]._id}
              onClick={handleNavItemOnClick}
            >
              {byId[id].title}
            </NavCampaignItem>
          ))}
        </NavCampaigns>
      </NavCampaignContainer>
    </NavWrapper>
  );
}
