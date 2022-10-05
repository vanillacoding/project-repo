import React from 'react';
import { useDispatch } from 'react-redux';
import { FaHamburger } from 'react-icons/fa';
import { RiUser5Fill } from 'react-icons/ri';
import { setRoute } from '../reducer/route';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const ICON_SIZE = '1.5em';

const Header = ({ title, children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.container}>
        <div onClick={() => dispatch(setRoute('/games'))}>
          <FaHamburger size={ICON_SIZE}/>
        </div>
        <h1>{title}</h1>
        <div onClick={() => dispatch(setRoute('/user'))}>
          <RiUser5Fill size={ICON_SIZE}/>
        </div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </>
  );
};

Header.proptypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default Header;
