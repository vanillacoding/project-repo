import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalPortal from '../ModalPortal';
import CommentsModal from './CommentsModal';

import { getUserLibrary } from '../api/userAPI';

import styles from './css/Library.module.css';

const Library = () => {
  const userToken = localStorage.token;
  const [ isModalOpened, setIsModalOpened ] = useState(false);
  const [ bookReportId, setBookReportId ] = useState('');
  const [ library, setLibrary ] = useState(null);

  useEffect (() => {
    const getlibrary = async () => {
      const bookReports = await getUserLibrary(userToken);
      setLibrary(bookReports);
    }
    getlibrary();
  }, [])

  return (
    <>
      <div className={styles.header}>
        <h3>내 서재</h3>
        <Link to='/'>
        <button className={styles.homeButton}>홈으로</button>
        </Link>
        <Link to='/bookmarks'>
          <button className={styles.bookmarkButton}>책갈피</button>
        </Link>
      </div>
      <div className={styles.container}>
        {
          library
          && library.map((el, index) => {
            return (
              <div
                key={index}
                className={styles.bookReportContainer}
                onClick={() => {
                  setIsModalOpened(true);
                  setBookReportId(el._id);
                }}>
                  <div className={styles.title}>{el.title}</div>
                  <div className={styles.book}>
                  <div><img src={el.book_info.image} /></div>
                  <div className={styles.bookInfo}>
                    <span>Title</span>
                    {el.book_info.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
                    <span>Author</span>
                    {el.book_info.author.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
                  </div>
                </div>
                <div className={styles.text}>{el.text.slice(0,180)}...</div>
              </div>
            );
          })
        }
      </div>
      {
        isModalOpened
        && <ModalPortal>
          <CommentsModal
            setModal={setIsModalOpened}
            bookReportId={bookReportId}
          />
        </ModalPortal>
      }
    </>
  );
}

export default Library
