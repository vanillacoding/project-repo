import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalPortal from '../ModalPortal';
import CommentsModal from './CommentsModal';

import { getUserBookmarks } from '../api/userAPI';

import styles from './css/Bookmarks.module.css';

const Bookmarks = () => {
  const userToken = localStorage.token;
  const [ isModalOpened, setIsModalOpened ] = useState(false);
  const [ bookReportId, setBookReportId ] = useState('');
  const [ bookmarks, setBookmarks ] = useState(null);

  useEffect(() => {
    const getbookmarks = async () => {
      const bookReports = await getUserBookmarks(userToken);
      setBookmarks(bookReports);
    }
    getbookmarks();
  }, []);

  return (
  <>
    <div className={styles.header}>
      <h3>책갈피</h3>
      <Link to='/'>
        <button className={styles.homeButton}>홈으로</button>
      </Link>
      <Link to='/library'>
        <button className={styles.library}>내 서재</button>
      </Link>
    </div>
    <div className={styles.container}>
      {
        bookmarks
        && bookmarks.map((el, index) => {
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

export default Bookmarks