import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Comment from '../Comment/Comment';

import 'remixicon/fonts/remixicon.css';
import './CommentList.scss';

function CommentList({ user, onSetUser }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!Object.keys(user).length) {
      window.location.href = '/login';
    }

    const token = localStorage.getItem('ACCESS_TOKEN');
    getComments();

    async function getComments() {
      const requestData = await fetch(
        `https://api.project-holi.site/api/users/${user.id}/comments`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );

      const commentData = await requestData.json();
      setCommentList(commentData.commentList);
    }
  }, []);

  return (
    <>
      <Header user={user} onSetUser={onSetUser} color='white' />

      <div className='hashtag-wrap'>
        <div className='banner'>
          <div className='dimm'></div>
          <h2>내가 쓴 후기</h2>
        </div>

        <div className='comment-wrap'>
          {commentList.length ? (
            commentList.map((comment, index) => {
              return (
                <Comment
                  comment={comment}
                  user={user}
                  key={`comment-${index}`}
                />
              );
            })
          ) : (
            <div className='nothing'>
              <p>작성한 후기가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

CommentList.propTypes = {
  user: PropTypes.object.isRequired,
  onSetUser: PropTypes.func.isRequired
};

export default CommentList;
