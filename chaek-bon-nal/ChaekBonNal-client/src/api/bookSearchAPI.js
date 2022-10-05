import api from './config';

export const bookSearchAPI = async (userToken, word) => {
  const bookInfo = await api.get(`users/${userToken}/writing/book-search/${word}`);

  return bookInfo.data.result;
}

export const isbnAPI = async (userToken, isbn) => {
  const isbnInfo = await api.get(`users/${userToken}/writing/isbn-search/${isbn}`);

  return isbnInfo.data.result;
}
