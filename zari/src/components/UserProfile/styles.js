import styled from 'styled-components';

export const UserProfile = {};

UserProfile.Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

UserProfile.Text = styled.span`
  margin: auto 10px;
`;

UserProfile.OnlineText = styled.span`
  font-weight: 400;
  font-size: 14px;
  margin-left: 5px;
`;

UserProfile.TextContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
`;
