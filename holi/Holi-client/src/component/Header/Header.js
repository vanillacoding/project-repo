import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

function Header({ user, onSetUser, color }) {
  const { picture, name } = user;

  function handleLogout() {
    localStorage.removeItem('ACCESS_TOKEN');
    onSetUser({});
  }

  return (
    <header>
      <h1 className='logo'>
        <a href='/'>Holi</a>
      </h1>

      {Object.keys(user).length ? (
        <div className='user-wrap'>

          <div className='profile'>
            <div className='image'>
              <img src={picture} alt='profile image' />
            </div>
            <p className={`name ${color}`}>{name}</p>
          </div>

          <div className='gnb'>
            <ul>
              <li><a href='/users/:user_id/likes' className={color}>좋아요한 나라</a></li>
              <li><a href='/users/:user_id/comments' className={color}>내가 쓴 후기</a></li>
              <li onClick={() => handleLogout()} className={color}>로그아웃</li>
            </ul>
          </div>

        </div>
      ) : (
        <a href='/login' className='button-login'>로그인</a>
      )}
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  onSetUser: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};

export default Header;
