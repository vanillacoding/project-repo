import React, {
  Suspense, useEffect, useState,
} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Vector3 } from "three";

import Building from "./models/Building";
import UserAvatar from "./models/UserAvatar";
import OtherUserAvatar from "./models/OtherUserAvatar";
import GreenFloor from "./models/GreenFloor";
import GardenHouse from "./models/GardenHouse";
import fetchData from "../utils/fetchData";
import { updateError } from "../reducers/roomSlice";
import { userSelector } from "../reducers/userSlice";
import FloatingIsland from "./models/FloatingIsland";
import CarHouse from "./models/CarHouse";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
`;

// TODO: building HOC으로
const BUILDING_POS = {
  0: [500, -30, -1600],
  1: [-600, -20, -1350],
  2: [-500, 0, -1700],
  3: [0, 0, -2000],
};

function World() {
  const user = useSelector(userSelector);
  const [otherUsers, setOtherUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  function updateOtherUsers(userInfo) {
    if (!userInfo._id) {
      return;
    }

    setOtherUsers((prev) => prev.concat(userInfo));
  }

  function removeOtherUser(userInfo) {
    setOtherUsers((prev) => prev.filter((oldUser) => oldUser._id !== userInfo._id));
  }

  useEffect(() => {
    async function getRandomIds() {
      const params = new URLSearchParams({
        size: 4,
      });

      try {
        const response = await fetchData("GET", `/user/random?${params}`);

        setRandomUsers(response);
      } catch (err) {
        dispatch(updateError(err.message));
      }
    }

    getRandomIds();
  }, []);

  function handleBuildingClick(e, id) {
    e.stopPropagation();
    history.push(`/room/${id}`);
  }

  return (
    <Container>
      <Canvas>
        <Sky distance={55000} sunPosition={new Vector3(1000, 100, 1000)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Suspense fallback={null}>
          {randomUsers.length > 0 && (
            randomUsers.map((randomUser, index) => {
              if (index === 2) {
                return (
                  <CarHouse
                    position={BUILDING_POS[index]}
                    user={randomUser}
                    scale={20}
                    onBuildingClick={handleBuildingClick}
                  />
                );
              }

              if (index === 3) {
                return (
                  <GardenHouse
                    user={randomUser}
                    position={BUILDING_POS[index]}
                    scale={1}
                    onBuildingClick={handleBuildingClick}
                  />
                );
              }

              return (
                <Building
                  user={randomUser}
                  position={BUILDING_POS[index]}
                  onBuildingClick={handleBuildingClick}
                />
              );
            })
          )}
        </Suspense>
        <Suspense fallback={null}>
          {otherUsers.length > 0 && (
            otherUsers.map((otherUser) => (
              <OtherUserAvatar user={otherUser} key={otherUser.email} />
            ))
          )}
        </Suspense>
        <Suspense fallback={null}>
          <UserAvatar
            position={[0, -5, 150]}
            user={user}
            updateOtherUsers={updateOtherUsers}
            removeOtherUser={removeOtherUser}
          />
        </Suspense>
        <Suspense fallback={null}>
          <FloatingIsland position={[0, -5, -1400]} />
        </Suspense>
        <GreenFloor />
      </Canvas>
    </Container>
  );
}

export default World;
