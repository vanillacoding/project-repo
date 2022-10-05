import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isbnAPI } from '../api/bookSearchAPI';
import { useHistory } from 'react-router-dom';
import { selectedBook } from '../action/index';
import styles from './css/BookSearch.module.css';

const BookSearch = () => {
  const userToken = localStorage.token;
  const searchList = useSelector(state => state.book.searchList);

  const history = useHistory();
  const dispatch = useDispatch();

  const getIsbn = useCallback(async (book) => {
    const isbn = book.isbn;
    const category = await isbnAPI(userToken, isbn);
    const bookInfo = {
      ...book,
      title: book.title.replace(/<b>/gi, '').replace(/<\/b>/gi, ''),
      author: book.author.replace(/<b>/gi, '').replace(/<\/b>/gi, '')
    }
    dispatch(selectedBook(bookInfo, category));
    history.goBack(1);
  })
  return (
    <div className={styles.container}>
      {
        searchList
        && searchList.map((book, index) => {
          return (
            <div key={index} className={styles.bookContainer} onClick={() => getIsbn(book)}>
              <img src={book.image} />
              <div className={styles.bookInfo}>
                Title<h4>{book.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</h4>
                Author<h4>{book.author.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</h4>
                Publisher<h4>{book.publisher}</h4>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default BookSearch
