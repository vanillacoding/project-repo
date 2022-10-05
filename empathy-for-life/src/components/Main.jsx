import React, { useEffect, useState, useContext } from "react";

import socket from "../socket/socket";
import { ReducerContext, selectors } from "../features/rootSlice";
import { IMAGE_URLS } from "../constants/constants";
import calculateTime from "../utils/calculateTime";

import styles from "./styles/Main.module.css";
import HeaderBoard from "./shared/HeaderBoard";
import Video from "./Video";
import Chat from "./Chat"
import MainNavigation from "./MainNavigation";
import Canvas from "./Canvas";

const Main = () => {
  const { state } = useContext(ReducerContext);
  const [accessTime, setAccessTime] = useState(selectors.getAccessTime(state));
  const userName = selectors.getUserName(state);
  const userId = selectors.getUserId(state);
  const calcuatedAccessTime = calculateTime(accessTime);

  useEffect(() => {
    socket.auth = { userName };
    socket.connect();

    return () => socket.disconnect();
  }, [userName]);

  useEffect(() => {
    const timeId = setInterval(
      () => setAccessTime(accessTime + 1),
      1000,
    );
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const saveUserAccessTime = async () => {
      const body = JSON.stringify({ id: userId, access_time: accessTime });
      await fetch(
        `${serverUrl}/user`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body,
        },
      );
    };
    window.addEventListener("beforeunload", saveUserAccessTime);

    return () => {
      window.removeEventListener(
        "beforeunload",
        saveUserAccessTime,
      );
      clearInterval(timeId);
    };
  }, [accessTime, userId]);

  return (
    <div className={styles.container}>
      <div className={styles.leftSideContainer}>
        <Video />
        <Chat />
      </div>
      <main className={styles.main}>
        <header className={styles.header}>
          <HeaderBoard
            boardClassName={styles.volunteerTimeBoard}
            barClassName={styles.volunteerTimeBar}
          >
            <span className={styles.timeBoardTitle}>봉사활동 시간</span>
            <div className={styles.timeBoardTimeText}>{calcuatedAccessTime}</div>
          </HeaderBoard>
          <MainNavigation />
        </header>
          <Canvas />
          <img
            className={styles.grassGroundImage}
            src={IMAGE_URLS.GRASS_GROUND}
            alt="grass ground"
          />
      </main>
    </div>
  );
};

export default Main;
