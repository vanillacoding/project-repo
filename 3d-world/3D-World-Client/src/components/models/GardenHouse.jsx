import React, { Suspense, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import Speaker from "./Speaker";
import Texts from "./Texts";

export default function GardenHouse({
  user,
  position,
  scale,
  onBuildingClick,
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/gardenHouse/scene.gltf");
  const [isMusicOn, setIsMusicOn] = useState(false);

  function onSpeakerClick(e) {
    e.stopPropagation();
    setIsMusicOn((prev) => !prev);
  }
  return (
    <>
      <Html>
        <ReactPlayer
          url={user.musicURL}
          playing={isMusicOn}
          width={0}
          height={0}
        />
      </Html>
      <group
        ref={group}
        position={position}
        dispose={null}
        scale={scale}
        onClick={(e) => onBuildingClick(e, user._id)}
      >
        <Suspense fallback={null}>
          <Speaker
            position={[-150, 0, 200]}
            onClick={onSpeakerClick}
            scale={30}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Texts
            scale={[5, 5, 5]}
            position={[-140, 500, 10]}
            letters={user.email.split("@")[0]}
          />
        </Suspense>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[255.24, 43.11, 195.02]} rotation={[-Math.PI / 2, 0, 1.21]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer005_07_-_Default_0"].geometry}
                  material={nodes["Flyer005_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[242.93, 59.39, 201.45]} rotation={[-Math.PI / 2, 0, -0.19]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer006_07_-_Default_0"].geometry}
                  material={nodes["Flyer006_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-95.64, 73.43, 57.85]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={[1.52, 1, 1.52]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer002_07_-_Default_0"].geometry}
                  material={nodes["Flyer002_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[10.43, 36.17, 85.38]} rotation={[-Math.PI / 2, 0, 0]} scale={[2.12, 2.12, 2.12]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer001_07_-_Default_0"].geometry}
                  material={nodes["Flyer001_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-95.64, 61.34, 34.2]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer003_07_-_Default_0"].geometry}
                  material={nodes["Flyer003_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group
              position={[-95.64, 98.92, 30.83]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[1.89, 1.89, 1.89]}
            >
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer004_07_-_Default_0"].geometry}
                  material={nodes["Flyer004_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-221.88, 0, 21.18]} rotation={[0, 0, 0]}>
              <group position={[221.88, 0, -21.18]}>
                <mesh
                  geometry={nodes["BusStop_07_-_Default_0"].geometry}
                  material={nodes["BusStop_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[156.03, 193.63, -141.58]} rotation={[0, 0, 0]}>
              <group position={[-156.03, -193.63, 98.56]}>
                <mesh
                  geometry={nodes["Cloths_07_-_Default_0"].geometry}
                  material={nodes["Cloths_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[133.07, 0, -153.04]} rotation={[0, 0, 0]}>
              <group position={[-133.07, 0, 110.02]}>
                <mesh
                  geometry={nodes["Garbage_open_07_-_Default_0"].geometry}
                  material={nodes["Garbage_open_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[0, 0, -43.03]} rotation={[0, 0, 0]}>
              <mesh geometry={nodes["House_07_-_Default_0"].geometry} material={nodes["House_07_-_Default_0"].material} />
            </group>
            <group position={[102.65, -2.21, 137.16]} rotation={[-0.02, 0, 0]}>
              <group position={[-102.65, 1.66, -159.82]}>
                <mesh
                  geometry={nodes["Kombi_07_-_Default_0"].geometry}
                  material={nodes["Kombi_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[245.98, 0, 191.38]} rotation={[0, 0, 0]}>
              <group position={[-245.98, 0, -191.38]}>
                <mesh
                  geometry={nodes["LightPost_07_-_Default_0"].geometry}
                  material={nodes["LightPost_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group rotation={[0, 0, 0]}>
              <mesh
                geometry={nodes["Sidewalk_07_-_Default_0"].geometry}
                material={nodes["Sidewalk_07_-_Default_0"].material}
              />
            </group>
            <group position={[-186.08, 0, 161.74]} rotation={[0, 0, 0]}>
              <group position={[186.08, 0, -161.74]}>
                <mesh
                  geometry={nodes["Vespa_07_-_Default_0"].geometry}
                  material={nodes["Vespa_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-208.84, 0, -157.58]} rotation={[0, 0, 0]}>
              <group position={[208.84, 0, 157.58]}>
                <mesh geometry={nodes["Tree_07_-_Default_0"].geometry} material={nodes["Tree_07_-_Default_0"].material} />
              </group>
            </group>
            <group position={[-175.02, 69.93, 20.48]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={[1.52, 1, 1.52]}>
              <group position={[0.42, 12.59, -9.07]}>
                <mesh
                  geometry={nodes["Flyer007_07_-_Default_0"].geometry}
                  material={nodes["Flyer007_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-174.41, 69.23, -3.71]} rotation={[-1.66, 0, -Math.PI / 2]} scale={[1.52, 1, 1.52]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer008_07_-_Default_0"].geometry}
                  material={nodes["Flyer008_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-174.41, 67.3, -27.91]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={[1.52, 1, 1.52]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer009_07_-_Default_0"].geometry}
                  material={nodes["Flyer009_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[218.24, 0, 172.7]} rotation={[0, 0, 0]}>
              <mesh
                geometry={nodes["Barrel_red_07_-_Default_0"].geometry}
                material={nodes["Barrel_red_07_-_Default_0"].material}
              />
            </group>
            <group position={[20.06, 0, -153.04]} rotation={[0, 0, 0]}>
              <group position={[-133.07, 0, 110.02]}>
                <mesh
                  geometry={nodes["Garbage_closed_07_-_Default_0"].geometry}
                  material={nodes["Garbage_closed_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-54.97, 1.3, -177.62]} rotation={[0, 0.1, 0]}>
              <mesh geometry={nodes["Mac2_07_-_Default_0"].geometry} material={nodes["Mac2_07_-_Default_0"].material} />
            </group>
            <group position={[-32.32, 3.01, -176.53]} rotation={[1.23, -1.29, 1.19]}>
              <mesh
                geometry={nodes["Mac2_kb_07_-_Default_0"].geometry}
                material={nodes["Mac2_kb_07_-_Default_0"].material}
              />
            </group>
            <group position={[-51.18, 0, -177.62]} rotation={[0, 1.32, 0]}>
              <mesh
                geometry={nodes["WoodCrate_07_-_Default_0"].geometry}
                material={nodes["WoodCrate_07_-_Default_0"].material}
              />
            </group>
            <group position={[-76.88, 68.38, -124.13]} rotation={[-Math.PI / 2, 0, Math.PI]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer010_07_-_Default_0"].geometry}
                  material={nodes["Flyer010_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-30.57, 68.38, -124.13]} rotation={[-Math.PI / 2, -0.09, Math.PI]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer011_07_-_Default_0"].geometry}
                  material={nodes["Flyer011_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group position={[-55.49, 68.38, -124.13]} rotation={[-Math.PI / 2, 0, Math.PI]}>
              <group position={[0.42, 11.98, -8.61]}>
                <mesh
                  geometry={nodes["Flyer012_07_-_Default_0"].geometry}
                  material={nodes["Flyer012_07_-_Default_0"].material}
                />
              </group>
            </group>
            <group rotation={[0, 0, 0]}>
              <mesh
                geometry={nodes["Graffiti_08_-_Default_0"].geometry}
                material={nodes["Graffiti_08_-_Default_0"].material}
              />
            </group>
            <group position={[348.04, 0, 60.55]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes["Line001_07_-_Default_0"].geometry}
                material={nodes["Line001_07_-_Default_0"].material}
              />
            </group>
            <group position={[235.12, 240.53, 191.13]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes["Box001_07_-_Default_0"].geometry}
                material={nodes["Box001_07_-_Default_0"].material}
              />
            </group>
            <group position={[6.31, 184.79, 81.16]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[1, 1, 1]}>
              <mesh
                geometry={nodes["Box002_07_-_Default_0"].geometry}
                material={nodes["Box002_07_-_Default_0"].material}
              />
            </group>
            <group position={[-95.38, 348.01, -18.4]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 1]}>
              <mesh
                geometry={nodes["Circle001_07_-_Default_0"].geometry}
                material={nodes["Circle001_07_-_Default_0"].material}
              />
            </group>
            <group position={[0, 0, -43.03]} rotation={[0, 0, 0]}>
              <mesh
                geometry={nodes["Bricks_08_-_Default_0"].geometry}
                material={nodes["Bricks_08_-_Default_0"].material}
              />
            </group>
            <group position={[246.46, 0, 160.67]} rotation={[0, 1.27, 0]}>
              <mesh
                geometry={nodes["Barrel_red001_07_-_Default_0"].geometry}
                material={nodes["Barrel_red001_07_-_Default_0"].material}
              />
            </group>
            <group position={[213.99, 14.71, 141.15]} rotation={[1.29, 0.1, -1.91]}>
              <mesh
                geometry={nodes["Barrel_red002_07_-_Default_0"].geometry}
                material={nodes["Barrel_red002_07_-_Default_0"].material}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

GardenHouse.propTypes = {
  user: PropTypes.object.isRequired,
  position: PropTypes.array.isRequired,
  scale: PropTypes.number.isRequired,
  onBuildingClick: PropTypes.func.isRequired,
};

useGLTF.preload("models/gardenHouse/scene.gltf");
