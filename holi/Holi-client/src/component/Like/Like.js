import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import 'remixicon/fonts/remixicon.css';
import './Like.scss';

function Like({ country, user, onSetCountry }) {
  const { id, name, flag_url: flagUrl, description, likes } = country;
  const [heartIcon, setHeartIcon] = useState('line');

  useEffect(() => {
    if (likes.includes(user.id)) setHeartIcon('fill');
  }, []);

  function handleLike() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    let isLike = false;

    if (!country.likes.includes(user.id)) {
      setHeartIcon('fill');
      likes.push(user.id);
      isLike = true;
    } else {
      setHeartIcon('line');

      likes.forEach((userId, index) => {
        if (userId === user.id) {
          likes.splice(index, 1);
        }
      });
    }

    fetch(`https://api.project-holi.site/api/countries/${id}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: user.id,
        isLike
      })
    });
  }

  return (
    <>
      <div className='like-country'>
        <div className='country-info'>
          <div className='flag'>
            <img src={flagUrl} alt='지도 이미지' />
          </div>
          <div className='country'>
            <h3><a onClick={() => onSetCountry(String(id))} href={`/countries/${id}`}>{name}</a></h3>
            <ul>
              <li>수도 : {description.introduction.contents['수도']}</li>
              <li>언어 : {description.introduction.contents['언어']}</li>
            </ul>
          </div>
        </div>

        <button type='button' onClick={() => handleLike()}>
          <i className={`ri-heart-2-${heartIcon}`}></i>
        </button>
      </div>
    </>
  );
}

Like.propTypes = {
  country: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Like;
