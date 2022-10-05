import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.SideBar} >
      <div className={styles.MenuBox}>
        <Link className={styles.Menu} to="/rooms">
          Room
        </Link>
        <Link className={styles.Menu} to="/groups">
          Group
        </Link>
      </div>
    </div >
  );
};

export default Sidebar;
