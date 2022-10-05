import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import '../App/App.css';
import './Header.css';

const Header = props => {
  const { history, backButton } = props;
  const handleLogout = () => {
    const result = window.confirm('로그아웃 하시겠습니까?');
    if (result) {
      localStorage.clear();
      history.push('/login');
    }
  };

  return (
    <header>
      {backButton
        && (
          <Link to="/">
            <span className="button-back">
              <MdArrowBack />
            </span>
          </Link>
        )}
      <h1>Mi Sleep Diary</h1>
      <span
        className="button-logout"
        onClick={handleLogout}
      >
        <IoIosLogOut />
      </span>
    </header>
  );
};

export default Header;
