import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ko';

import Header from '../Header/Header';
import Comment from '../Comment/Comment';
import 'remixicon/fonts/remixicon.css';

import './Country.scss';

moment.locale('ko');

function Country({ country, user, onSetUser }) {
  const [countryData, setCountryData] = useState({});
  const [DescriptionData, setDescriptionData] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [heartIcon, setHeartIcon] = useState('line');
  const [comment, setComment] = useState('');
  const { id, name, bannerUrl, description, likes, comments } = countryData;

  useEffect(() => {
    getCountryData();

    async function getCountryData() {
      const requestData = await fetch(
        `https://api.project-holi.site/api/countries/${country}`,
        { method: 'GET' }
      );
      const countryData = await requestData.json();
      
      setCountryData(countryData);
      setDescriptionData(countryData.description.introduction);
      setLikeCount(countryData.likes.length);

      if (countryData.likes.includes(user.id)) setHeartIcon('fill');
    }
  }, []);

  function handleLnb(target) {
    if (target.textContent === '국가 소개') {
      setDescriptionData(description.introduction);
    } else if (target.textContent === '워홀 비자') {
      setDescriptionData(description.visa);
    } else if (target.textContent === '안전 정보') {
      setDescriptionData(description.safety);
    } else if (target.textContent === '초기 정착') {
      setDescriptionData(description.settlement);
    }
  }

  function handleLike() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    let isLike = false;

    if (Object.keys(user).length) {
      if (!likes.includes(user.id)) {
        setLikeCount(likeCount + 1);
        setHeartIcon('fill');

        likes.push(user.id);
        isLike = true;
      } else {
        setLikeCount(likeCount - 1);
        setHeartIcon('line');

        likes.forEach((userId, index) => {
          if (userId === user.id) {
            likes.splice(index, 1);
          }
        });
      }
    } else {
      if (window.confirm('로그인 사용자만 좋아요를 할 수 있습니다. 로그인 하시겠습니까?')) {
        window.location.href = '/login';
      }

      return;
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

  function handleTextarea() {
    if (
      !Object.keys(user).length && 
      window.confirm('로그인 사용자만 후기를 작성할 수 있습니다. 로그인 하시겠습니까?')
    ) {
      window.location.href = '/login';
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!comment.length) {
      alert('후기를 입력해주세요');
      return;
    }

    const token = localStorage.getItem('ACCESS_TOKEN');
    const commentSplit = comment.split(' ');
    const hashtags = commentSplit.filter((word) => word.startsWith('#'));

    await fetch('https://api.project-holi.site/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: user.id,
        countryId: id,
        contents: comment,
        hashtags,
        created: new Date()
      })
    });

    window.location.reload();
  }

  return (
    <>
      <Header user={user} onSetUser={onSetUser} color='white' />

      <div className='country-wrap'>
        <div className='banner'>
          <img src={bannerUrl}/>
          <div className='dimm'></div>
          <h2>{name}</h2>
        </div>

        <div className='lnb'>
          <ul>
            <li onClick={(event) => handleLnb(event.target)}>국가 소개</li>
            <li onClick={(event) => handleLnb(event.target)}>워홀 비자</li>
            <li onClick={(event) => handleLnb(event.target)}>안전 정보</li>
            <li onClick={(event) => handleLnb(event.target)}>초기 정착</li>
          </ul>
        </div>

        <div className='description'>
          {Object.keys(DescriptionData).length
            ? Object.keys(DescriptionData.contents).map(
                (classification, index) => {
                  return (
                    <section key={`classification-${index}`}>
                      <h3>{classification}</h3>
                      {Array.isArray(
                        DescriptionData.contents[classification]
                      ) ? (
                        DescriptionData.contents[classification].map(
                          (text, index) => {return <li key={`text-${index}`}>{text}</li>;}
                        )
                      ) : (
                        <p>{DescriptionData.contents[classification]}</p>
                      )}
                    </section>
                  );
                }
              )
            : null}
        </div>

        <button type='button' className='likes' onClick={() => handleLike()}>
          <i className={`ri-heart-2-${heartIcon}`}></i>
          <p>{likeCount}</p>
        </button>

        <form onSubmit={(event) => handleSubmit(event)}>
          <textarea
            onClick={() => handleTextarea()}
            onChange={(event) => setComment(event.target.value)}
          />
          <button type='submit'>작성</button>
        </form>

        <div className='comment-wrap'>
          {comments && comments.length ? (
            comments.map((comment, index) => [
              <Comment
                comment={comment}
                user={user}
                key={`comment-${index}`}
              />,
            ])
          ) : (
            <div className='nothing'>
              <p>현재 등록된 후기가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Country.propTypes = {
  country: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onSetUser: PropTypes.func.isRequired
};

export default Country;
