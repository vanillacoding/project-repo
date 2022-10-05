import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import TopSleepInfo from '../TopSleepInfo/TopSleepInfo';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import DailyPatternChart from '../Chart/DailyPatternChart';
import styles from './Detail.module.css';

// export for testing purpose
export const DetailSleep = ({ sleep }) => {
  const { sleepCycle } = sleep;

  return (
    <div className={styles.sleepWrapper}>
      <span className={styles.sleepItemIcon}>얕은 수면</span>
      <span className={styles.sleepItemIcon}>깊은 수면</span>
      { sleepCycle.map((cycle, i) => {
        if (cycle[0] === 'light') {
          return <span key={i} className={styles.lightSleep}>{`${cycle[1]} ~ ${cycle[2]}`}</span>;
        }
        return <span key={i}>{`${cycle[1]} ~ ${cycle[2]}`}</span>;
      })}
    </div>
  );
};

// export for testing purpose
export const DetailDiary = ({ diary }) => {
  const { behaviorScore, feelingColor, behaviorScoreReason, memo } = diary;

  return (
    <>
      <div className={styles.scoreWrapper}>
        <h2 className={styles.diaryTitle}>
          오늘 나의 말, 행동을
          <br />
          점수로 매긴다면?
        </h2>
        <h2 className={styles.diaryScore}>
          {behaviorScore}
          점
        </h2>
        <div className={styles.subText}>{behaviorScoreReason}</div>
      </div>
      <div className={styles.colorWrapper}>
        <h2 className={styles.diaryTitle}>
          오늘 나의 기분을
          <br />
          색깔로 표현하면?
        </h2>
        <div
          className={styles.diaryColor}
          style={{ backgroundColor: feelingColor[0] }}
        >
          {feelingColor[1]}
        </div>
      </div>
      {memo && (
        <div className={styles.memoWrapper}>
          <span className={styles.subTitle}>Memo</span>
          <div className={styles.subText}>{memo}</div>
        </div>
      )}
    </>
  );
};

export default function Detail(props) {
  const { sleep, cycleForDailyChart, history } = props;
  const isLoading = !Object.keys(sleep).length;
  const link = `/write?sleepId=${sleep._id}`;
  let diary;

  if (sleep) diary = sleep.diary;

  return (
    <div className={styles.detailWrapper}>
      <Header history={history} />
      {isLoading
        ? <Loading />
        : (
          <main>
            <TopSleepInfo sleep={sleep} />
            <div className={styles.contents}>
              <div className={styles.limitWidth}>
                <DailyPatternChart sleep={cycleForDailyChart} />
                <DetailSleep sleep={sleep} />
                {diary && <DetailDiary diary={diary} />}
                {!diary
                && (
                  <Link to={link}>
                    <div className="button fill" id="wirteButton">나의 하루 기록하기</div>
                  </Link>
                )}
              </div>
            </div>
          </main>
        )}
      <BottomNavigation />
    </div>
  );
}
