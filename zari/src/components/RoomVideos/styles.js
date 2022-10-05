import styled from 'styled-components';

export const RoomVideos = {};

RoomVideos.Container = styled.div`
  position: fixed;
  margin: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 30px;
`;

RoomVideos.StyledVideo = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
`;
