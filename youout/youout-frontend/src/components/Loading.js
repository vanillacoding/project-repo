import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Splash from './Splash';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <Splash>
        <Loader
          className={styles.loader}
          type='ThreeDots'
          color='rgb(112, 112, 112)'
          height={50}
          width={50}
        />
      </Splash>
    </div>
  );
};

export default Loading;
