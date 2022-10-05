import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';

import * as api from '../api/bookAPI';
import * as actions from '../action/index';
import { bookSearchAPI } from '../api/bookSearchAPI';
import styles from './css/Writing.module.css';

const Writing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userToken = localStorage.token;

  if (!userToken) {
    history.push('/login');
  }

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  const text = useSelector(state => state.bookReports.text);
  const quote = useSelector(state => state.bookReports.quote);
  const title = useSelector(state => state.bookReports.title);
  const imageUrl = useSelector(state => state.bookReports.image);
  const selectedBook = useSelector(state => state.book.selected);
  const selectedCategory = useSelector(state => state.book.category);

  const [ editMode, setEditMode ] = useState(false);
  const [ searchWord, setSearchWord ] = useState('');
  const [ draftsText, setDraftsText ] = useState('');
  const [ draftsTitle, setDraftsTitle ] = useState('');

  useEffect(() => {
    setDraftsText(text);
    setDraftsTitle(title);
  }, [text, title]);

  useEffect(() => {
    const getBookReport = async () => {
      if (query.has('id')) {
        const reportId = query.get('id');
        dispatch(actions.editModeData(reportId));
        setEditMode(true);

        const bookReport = await api.findOneBookReport(reportId);

        if (imageUrl) {
          return dispatch(actions.changedImageInEditMode(
            bookReport.bookReport,
            imageUrl
          ));
        }

        // if (selectedCategory) {
        //     return dispatch(actions.selectedBookInEditMode(
        //         bookReport.bookReport,
        //         selectedBook,
        //         selectedCategory
        //     ));
        // }
        dispatch(actions.dispatchBookReportData(bookReport.bookReport));
      }
    }
    getBookReport();
  }, []);

  const onSearchButtonClick = useCallback(async () => {
    const searchResult = await bookSearchAPI(userToken, searchWord);

    dispatch(actions.drafts(draftsText, draftsTitle));
    dispatch(actions.receiveSearchResult(searchResult));
    history.push('/writing/book-search');
  }, [searchWord, draftsText, draftsTitle]);

  const onAddImageButtonClick = useCallback(() => {
    history.push('/writing/attaching-image');
    dispatch(actions.drafts(draftsText, draftsTitle));
  }, [draftsText, draftsTitle]);

  const onDoneButtonClick = useCallback(async () => {
    const reportId = query.get('id');

    await api.saveBookReport({
      editMode,
      reportId,
      userToken,
      quote,
      imageUrl,
      draftsText,
      draftsTitle,
      selectedBook,
      selectedCategory
    });
    dispatch(actions.clearDrafts());
    history.push('/');
  }, [editMode, draftsTitle, draftsText]);

  const onCancelButtonClick = useCallback(() => {
    dispatch(actions.clearDrafts());
    history.push('/');
  });

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input type='text'
          className={styles.searchBox}
          name='bookSearch'
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button
          className={styles.searchButton}
          onClick={onSearchButtonClick}
        >search</button>
      </div>
      {
        selectedBook
        && <div className={styles.selectedBook}>
          <input type='text' placeholder={selectedBook.title} readOnly/>
          <input type='text' placeholder={selectedBook.author} readOnly/>
          <input type='text' placeholder={selectedCategory} readOnly/>
        </div>
      }
      <input
        className={styles.title}
        type='text'
        maxlength='15'
        value={draftsTitle}
        placeholder='제목을 입력해주세요.'
        onChange={(e) => setDraftsTitle(e.target.value)}
      />
      <textarea
        className={styles.text}
        rows='10'
        cols='50'
        maxlength='1065'
        placeholder='글을 입력해주세요.'
        defaultValue={draftsText}
        onChange={(e) => setDraftsText(e.target.value)}
      />
      <input
        className={styles.quote}
        placeholder='사진에서 인용구를 추출하거나, 입력해주세요.'
        type='text'
        defaultValue={quote}
      />
      <img src={imageUrl || '/images/attachPicture.png'} className={styles.image} />
      <button
        className={styles.imageButton}
        onClick={onAddImageButtonClick}
      >책 사진 넣기</button>
      <button
        className={styles.doneButton}
        onClick={onDoneButtonClick}
      >게시하기</button>
      <button
        className={styles.cancelButton}
        onClick={onCancelButtonClick}
      > 취소</button>
    </div>
  );
};

export default Writing
