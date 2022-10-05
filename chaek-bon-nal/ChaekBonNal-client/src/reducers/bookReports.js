import * as actions from '../constants/index';

export const initialState = {
  id: '',
  list: [],
  image: '',
  quote: '',
  title: '',
  text: '',
  dataUrl: ''
};

export const bookReports = (state = initialState, action) => {
  switch (action.type) {
    case actions.BY_USER_PREFERENCE:
      return {
        ...state,
        list: action.bookReports
      };
    case actions.DISPATCH_BOOKREPORT_DATA:
      return {
        ...state,
        image: action.bookReport.image_url,
        quote: action.bookReport.quote,
        title: action.bookReport.title,
        text: action.bookReport.text
      }
    case actions.EDIT_MODE_DATA:
      return {
        ...state,
        id: action.reportId
      }
    // case actions.SELECTED_BOOK_IN_EDIT_MODE:
    //     return {
    //         ...state,
    //         image: action.bookReport.image_url,
    //         quote: action.bookReport.quote,
    //         title: action.title,
    //         text: action.text
    //     }
    case actions.CHANGED_IMAGE_IN_EDIT_MODE:
      return {
        ...state,
        image: action.image,
        title: action.bookReport.title,
        text: action.bookReport.text,
        quote: action.bookReport.quote
      }
    case actions.RECEIVE_IMAGE_DATA:
      return {
        ...state,
        image: action.url
      }
    case actions.DRAFTS:
      return {
        ...state,
        title: action.title,
        text: action.text
      }
    case actions.CLEAR_DRAFTS:
      return {
        list: [],
        id: '',
        image: '',
        quote: '',
        title: '',
        text: '',
        dataUrl: ''
      }
    case actions.DRAFTS_IMAGE:
      return {
        ...state,
        dataUrl: action.dataUrl
      }
    case actions.RECEIVE_DETECTED_TEXT:
      return {
        ...state,
        quote: action.detectedText
      }
    default:
      return state;
  }
};
