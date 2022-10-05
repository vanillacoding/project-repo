import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ButtonWrap } from "../../components/LoginForm/LoginForm";
import RecordButton from "../../components/RecordButton/RecordButton";

const kakao = window.kakao;

export default function Record({
  userId,
  teamId,
  teamName,
  teamLocation,
  isWorking,
  isWorkDone,
  workOn,
  workOff,
  isLoading,
}) {
  const { latitude, longitude } = teamLocation;
  const map = useRef();

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 4,
    };
    map.current = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      title: teamName,
    });

    marker.setMap(map.current);
  }, [latitude, longitude, teamName]);

  function checkUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      const markerPosition = new kakao.maps.LatLng(latitude, longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        title: teamName,
      });

      marker.setMap(map.current);
    });
  }

  return (
    <Wrapper>
      <Map id="map" />
      <ButtonWrap>
        <button onClick={checkUserLocation}>내 위치 확인하기</button>
        {isWorkDone ? (
          <RecordButton text="근무 완료" isDisabled={true} />
        ) : isWorking ? (
          <RecordButton
            text={isLoading ? "Loading" : "퇴근 기록하기"}
            onClick={workOff.bind(null, teamId, userId)}
            isDisabled={isLoading}
          />
        ) : (
          <RecordButton
            text={isLoading ? "Loading" : "출근 기록하기"}
            onClick={workOn.bind(null, teamId, userId)}
            isDisabled={isLoading}
          />
        )}
      </ButtonWrap>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding: 30px 30px 0;
`;
const Map = styled.div`
  flex: 1;
`;
