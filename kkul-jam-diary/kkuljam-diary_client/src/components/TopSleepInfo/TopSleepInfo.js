import React from 'react';
import styles from './TopSleepInfo.module.css';

const TopSleepInfo = ({ sleep }) => {
  const { date, hours, duration } = sleep;

  return (
    <section className={styles.topSleepWarpper}>
      <div className={styles.topDate}>{date}</div>
      <h1 className={styles.topTitle}>나의 수면시간</h1>
      <h1 className={styles.topHours}>{hours}</h1>
      <div className={styles.topDuration}>{duration}</div>
    </section>
  );
};

export default TopSleepInfo;
