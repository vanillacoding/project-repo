import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ko';

import 'remixicon/fonts/remixicon.css';
import './Comment.scss';

moment.locale('ko');

function Comment({ comment, user }) {
  const [heartIcon, setHeartIcon] = useState('line');
  const [likeCount, setLikeCount] = useState(0);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const { _id: id, author, contents, hashtags, created, likes } = comment;

  useEffect(() => {
    if (comment.likes.includes(user.id)) setHeartIcon('fill');
  }, []);

  async function handleDelete(target) {
    const commentId = target.parentNode.parentNode.id;

    await fetch(`https://api.project-holi.site/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });

    window.location.reload();
  }

  function handleLike() {
    let isLike = false;

    if (Object.keys(user).length) {
      if (!likes.includes(user.id)) {
        setLikeCount(likeCount + 1);
        setHeartIcon('fill');
  
        isLike = true;
        likes.push(user.id);
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
        return;
      }
    }

    fetch(`https://api.project-holi.site/api/comments/${comment._id}/like`, {
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
      <div className='comment' id={id}>
        <div className='user-wrap'>
          <div className='user'>
            <div className='user-image'>
              <img src={author.picture_url} alt='profile image'></img>
            </div>
            <div className='user-name'>{author.name}</div>
          </div>
          <button type='button' onClick={() => handleLike()}>
            <i className={`ri-heart-2-${heartIcon}`}></i>
          </button>
        </div>

        <div className='contents'>
          {(() => {
            const text = contents.split(' ').map(word => {
              if (word.startsWith('#')) {
                hashtags.forEach((hashtagData, index) => {
                  if (hashtagData.hashtag === word) {
                    word = (
                      <a href={`/hashtags/${hashtagData._id}`} key={`word-${index}`}>
                        {word}{' '}
                      </a>
                    );
                  }
                });
              } else {
                word += ' ';
              }

              return word;
            });

            return <p>{text}</p>;
          })()}
        </div>

        <ul className='util-wrap'>
          <li>{moment(created).format('LLL')}</li>
          <li>좋아요 {likes.length}개</li>
          {user.id === author._id && (
            <li className='button-delete' onClick={(event) => handleDelete(event.target)} >
              삭제
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Comment;
