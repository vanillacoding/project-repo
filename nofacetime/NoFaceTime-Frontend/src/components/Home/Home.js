import React from 'react';

import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.ServiceDescription}>
        <p>
          <b>Are you there?</b>
          <br />
          Check your students
          <br />
          in real time through emoji
        </p>
      </div>
      <div className={styles.ServiceImage}>
        <img src="https://no-face-time.s3.ap-northeast-2.amazonaws.com/notebook.jpg" alt="notebook" />
      </div>
    </div>
  );
};

export default Home;
