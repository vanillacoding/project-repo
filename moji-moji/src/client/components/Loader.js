import React from 'react';
import { PacmanLoader } from 'react-spinners';
import './Loader.scss';

const Loader = () => {
  const styles = {
    pacmanLoader: {
      transform: 'translateX(-50%)'
    }
  };

  return (
    <div className="Loader">
      <div>
        <PacmanLoader
          css={styles.pacmanLoader}
          sizeUnit="rem"
          size={3.5}
          margin="3.5rem"
          color="#FFEE00"
          loading={true}
        />
      </div>
      <p>...Loading</p>
    </div>
  );
};

export default Loader;
