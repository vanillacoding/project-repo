import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Comment from '../Comment/Comment';

import 'remixicon/fonts/remixicon.css';
import './HashtagList.scss';

function Hashtag({ user, onSetUser }) {
  const url = window.location.href.split('/');
  const hashtagId = url[url.length - 1];
  const [hashtagData, setHashtagData] = useState({});

  useEffect(() => {
    getHashtagData();

    async function getHashtagData() {
      const requestData = await fetch(`https://api.project-holi.site/api/hashtags/${hashtagId}`);
      const hashtagData = await requestData.json();
      setHashtagData(hashtagData);
    }
  }, []);

  return (
    <>
      <Header user={user} onSetUser={onSetUser} color='white' />

      <div className='hashtag-wrap'>
        <div className='banner'>
          <div className='dimm'></div>
          <h2>{hashtagData.hashtag}</h2>
        </div>

        <div className='comment-wrap'>
          {Object.keys(hashtagData).length ? (
            hashtagData.hashtagList.map((comment, index) => {
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
              <p>해당 해시태그와 관련된 후기가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Hashtag.propTypes = {
  user: PropTypes.object.isRequired,
  onSetUser: PropTypes.func.isRequired,
};

export default Hashtag;
