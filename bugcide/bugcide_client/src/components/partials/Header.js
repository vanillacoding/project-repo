import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="gnb">
      <div className="gnb-wrap">
        <h1 className="logo">
          <Link to="/">
            Bugcide.
          </Link>
        </h1>
        <ul className="user-info">
          <li
            className="img-box"
            style={{ background: `url(${props.user.profileUrl}) no-repeat center / cover` }}
          >
          </li>
          <li className="user-name">
            {props.user.name}
          </li>
          <li>
            <button
              type="button"
              className="btn-gnb"
              onClick={props.handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
