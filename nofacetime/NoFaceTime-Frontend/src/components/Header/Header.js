import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import ButtonInHeader from '../ButtonInHeader/ButtonInHeader';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.Header}>
      <Link to='/'>
        <Logo />
      </Link>
      <Link to='/login'>
        <ButtonInHeader />
      </Link>
    </div>
  );
};

export default Header;
