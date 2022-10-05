import React from 'react';
import BookReport from './BookReport';
import FlipPage from 'react-flip-page';
import styles from './css/FlipBook.module.css';

const FlipBook = ({ bookReport, setBookReportId, setIsModalOpened }) => {
  return (
    <div className={styles.app}>
      <FlipPage
        className={styles.book}
        showSwipeHint
        uncutPages
        orientation='horizontal'
        width='1000'
        height='700'
        pageBackground='#ffffff'
        animationDuration='400'
      >
        { bookReport.map((page, index) => (
          <BookReport
            key={index}
            page={page}
            index={index}
            setIsModalOpened={setIsModalOpened}
            setBookReportId={setBookReportId}
          />
        ))}
      </FlipPage>
    </div>
  );
}

export default FlipBook
