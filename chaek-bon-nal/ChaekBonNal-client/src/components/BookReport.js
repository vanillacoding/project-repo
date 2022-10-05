import React from 'react';
import styles from './css/BookReport.module.css';

const BookReport = ({ page, index, setIsModalOpened, setBookReportId }) => {
  return (
    <article
      key={index}
      className={styles.article}
      onClick={() => {
        setIsModalOpened(true);
        setBookReportId(page._id);
      }}
    >
      <div className={styles.leftContainer}>
        <h1>
          {page.title}
        </h1>
        <img src={page.image_url} className={styles.image} />
        <blockquote>
          {page.quote}
        </blockquote>
        <div className={styles.bookInfo}>
          <div>
            <img src={page.book_info.image} />
          </div>
          <div className={styles.bookDetail}>
            <span>Title</span>
            <a href={page.book_info.link} target='_blank'>
              {page.book_info.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
            </a>
            <span>Author</span>
            {page.book_info.author.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
            <span>Main Category</span>
            {page.book_info.category}
            <span>Publisher</span>
            {page.book_info.publisher}
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.text}>
          {page.text}
        </div>
        <div className={styles.userInfo}>
          <img className={styles.avartar} src={page.author.imageUrl} />
          <a className={styles.name}>{page.author.name}</a>
        </div>
      </div>
    </article>
  );
};

export default BookReport
