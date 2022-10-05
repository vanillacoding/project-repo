import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Like from '../Like/Like';

import 'remixicon/fonts/remixicon.css';
import './LikeList.scss';

function ListList({ user, onSetUser, onSetCountry }) {
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    if (!Object.keys(user).length) {
      window.location.href = '/login';
    }

    const token = localStorage.getItem('ACCESS_TOKEN');

    getLikeData();

    async function getLikeData() {
      const requestData = await fetch(
        `https://api.project-holi.site/api/users/${user.id}/likes`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      const likeData = await requestData.json();
      setLikeList(likeData.likeList);
    }
  }, []);

  return (
    <>
      <Header user={user} onSetUser={onSetUser} color='white' />

      <div className='like-wrap'>
        <div className='banner'>
          <div className='dimm'></div>
          <h2>내가 좋아요한 나라</h2>
        </div>

        <div className='country-wrap'>
          {likeList.length ? (
            likeList.map((country, index) => {
              return (
                <Like
                  country={country}
                  user={user}
                  onSetCountry={onSetCountry}
                  key={`likeCountry-${index}`}
                />
              );
            })
          ) : (
            <div className='nothing'>
              <p>현재 좋아요한 나라가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ListList.propTypes = {
  user: PropTypes.object.isRequired,
  onSetUser: PropTypes.func.isRequired,
  onSetCountry: PropTypes.func.isRequired
};

export default ListList;
