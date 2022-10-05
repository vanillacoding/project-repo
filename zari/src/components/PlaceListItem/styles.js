import styled from 'styled-components';

export const RoomList = {};

RoomList.Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 200px;
  margin-bottom: 30px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;

  &:hover img {
    transform: scale(1.2);
  }
`;

RoomList.ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

RoomList.BackGroundImage = styled.img`
  background-size: cover;
  filter: blur(2px);
  width: 100%;
  height: 100%;
  transition: all .5s;
`;

RoomList.RoomItem = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  margin: auto;
`;

RoomList.RoomTitle = styled.span`
  color: white;
  font-size: 60px;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
