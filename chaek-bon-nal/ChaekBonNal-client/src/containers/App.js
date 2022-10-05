import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../api/bookAPI';
import { byUserPreference } from '../action/index'

import CommentsModal from './CommentsModal';
import ModalPortal from '../ModalPortal';
import Header from '../components/Header';
import FlipBook from '../components/FlipBook';
import styles from './css/App.module.css';

const App = () => {
  const userToken = localStorage.token;
  const dispatch = useDispatch();
  const bookReports = useSelector(state => state.bookReports.list);
  let bookReport = null;

  const [ bookReportId, setBookReportId ] = useState('');
  const [ isModalOpened, setIsModalOpened ] = useState(false);

  useEffect(() => {
    const receiveData = async () => {
      if (userToken) {
        bookReport = await api.receiveMemberBookReport(userToken);
      } else {
        bookReport = await api.receiveNonMemberBookReport();
      }
      dispatch(byUserPreference(bookReport));
    };
    receiveData();
  }, [])

  return (
    <>
      <div className={styles.header}>
        <Header/>
      </div>
      {
        bookReports
        && <FlipBook
          setBookReportId={setBookReportId}
          setIsModalOpened={setIsModalOpened}
          bookReport={bookReports}
        />
      }
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
};

export default App
