import * as types from '../constants/index'

export const receiveUserData = (userData) => ({
  type: types.RECEIVE_USER_DATA,
  userData
});

export const receiveSearchResult = (searchData) => ({
  type: types.RECEIVE_SEARCH_DATA,
  searchData
});

export const selectedBook = (book, category) => ({
  type: types.SELECTED_BOOK,
  book,
  category
});

export const byUserPreference = (bookReports) => ({
  type: types.BY_USER_PREFERENCE,
  bookReports
});

export const receiveImageData = (url) => ({
  type: types.RECEIVE_IMAGE_DATA,
  url
});

export const drafts = (text, title, quote) => ({
  type: types.DRAFTS,
  text,
  title,
  quote
});

export const clearDrafts = () => ({
  type: types.CLEAR_DRAFTS
});

export const draftsImage = (dataUrl) =>  ({
  type: types.DRAFTS_IMAGE,
  dataUrl
});

export const receiveDetectedText = (detectedText) => ({
  type: types.RECEIVE_DETECTED_TEXT,
  detectedText
});

export const receiveBookmark = ({ isBookmarked, userInfo }) => ({
  type: types.RECEIVE_BOOKMARK,
  isBookmarked,
  userInfo
});

export const dispatchBookReportData = (bookReport) => ({
  type: types.DISPATCH_BOOKREPORT_DATA,
  bookReport
});

export const editModeData = (reportId) => ({
  type: types.EDIT_MODE_DATA,
  reportId
});

export const changedImageInEditMode = (bookReport, image) => ({
  type: types.CHANGED_IMAGE_IN_EDIT_MODE,
  bookReport,
  image
});

// export const selectedBookInEditMode = (bookReport, book, category) => ({
//     type : types.SELECTED_BOOK_IN_EDIT_MODE,
//     bookReport,
//     book,
//     category
// });
