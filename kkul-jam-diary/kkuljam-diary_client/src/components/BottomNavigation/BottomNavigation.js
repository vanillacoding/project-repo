import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaChartBar } from 'react-icons/fa';
import { MdHome, MdFormatListBulleted } from 'react-icons/md';
import '../App/App.css';
import styles from './BottomNavigation.module.css';

const BottomNavigation = props => (
  <nav>
    <ul>
      <Link to="/home">
        <li>
          <MdHome className={styles.home} />
        </li>
      </Link>
      <Link to="/write">
        <li>
          <FaPen className={styles.write} />
        </li>
      </Link>
      <Link to="/list">
        <li>
          <MdFormatListBulleted className={styles.list} />
        </li>
      </Link>
      <Link to="/chart">
        <li>
          <FaChartBar className={styles.chart} />
        </li>
      </Link>
    </ul>
  </nav>
);

export default BottomNavigation;
