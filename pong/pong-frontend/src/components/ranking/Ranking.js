import React, { useEffect, useState } from "react";
import { getUserData } from "../../api/gameApi";
import GameBoy from "../gameBoy/GameBoy";
import styles from "./Ranking.module.css";

const Ranking = () => {
  const [users, setUsers] = useState([]);

  let userList = null;
  let data;

  useEffect(() => {
    getUserData(data, setUsers);
  }, []);

  if (users.length !== 0) {
    userList = users.map((user, index) => {
      let rank;

      if (index + 1 === 1) {
        rank = "1st";
      } else if (index + 1 === 2) {
        rank = "2st";
      } else {
        rank = `${index + 1}th`;
      }

      return (
        <div className={styles.user} key={user._id}>
          <div className={styles.rank}>
            {rank}
          </div>
          <div className={styles.userName}>
            {user.name}
          </div>
          <div className={styles.score}>
            {user.winningPoint}
          </div>
        </div>
      );
    });
  }

  return (
    <div className={styles.wrapper}>
      <GameBoy>
        <div className={styles.rankingWrapper}>
          <div className={styles.rankingTitle}>
            <span>RANKING</span>
          </div>
          <div className={styles.usersWrapper}>
            <span>RANK</span>
            <span>NAME</span>
            <span>SCORE</span>
          </div>
          {userList}
        </div>
      </GameBoy>
    </div>
  );
};

export default Ranking;
