import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import styles from './Home.module.css';

const Home = props => {
  const { user, latelySleep, history } = props;
  const hasUser = user.email !== '';
  const hasLatelySleep = Object.keys(latelySleep).length > 0;
  const isLoading = !hasUser || !hasLatelySleep;
  let sleepInfo;

  if (hasLatelySleep) {
    const {
      bedTime,
      createdAt,
      wakeUpTime,
      sleepDuration
    } = latelySleep;
    const sleepDurationList = sleepDuration.split(':');

    sleepInfo = {
      createdAt: moment(createdAt).format('YYYY.MM.DD'),
      bedTime: moment(bedTime).format('LT'),
      wakeUpTime: moment(wakeUpTime).format('LT'),
      sleepDuration: `${sleepDurationList[0]}시간 ${sleepDurationList[1]}분`
    };
  }

  return (
    <div>
      <Header history={history} />
      {isLoading && <Loading />}
      {!isLoading
        && (
          <main>
            <section className={styles.welcome}>
              <h2>
                {user.email}
                님,
                <br />
                안녕하세요.
              </h2>
            </section>
            <div className={styles.contents}>
              <div className={styles.writeButton}>
                <Link to="/write">오늘 일기쓰기 ►</Link>
              </div>
              <div className={styles.sleepCard}>
                <h3 className={styles.sleepTitle}>지난 밤, 나의 수면상태는?</h3>
                {latelySleep && (
                  <div className={styles.sleepDetail}>
                    <span className="subText">
                      (
                      {sleepInfo.createdAt}
                      {' '}
                      기준)
                    </span>
                    <p>
                      • 잠든 시간
                      <span className={styles.detail}>{sleepInfo.bedTime}</span>
                    </p>
                    <p>
                      • 일어난 시간
                      <span className={styles.detail}>{sleepInfo.wakeUpTime}</span>
                    </p>
                    <p>
                      • 총 수면시간
                      <span className={styles.detail}>{sleepInfo.sleepDuration}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        )}
      <BottomNavigation />
    </div>
  );
};

export default Home;
