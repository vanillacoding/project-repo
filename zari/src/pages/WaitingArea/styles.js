import styled from 'styled-components';

export const WaitingArea = {};

WaitingArea.Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

WaitingArea.WelcomeImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
`;

WaitingArea.PlaceListContainer = styled.div`
  display: flex;
  margin: 50px 0;
  width: 100%;
  height: fit-content;
`;
