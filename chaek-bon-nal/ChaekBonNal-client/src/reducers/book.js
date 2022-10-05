import * as actions from '../constants/index';

export const initialState = {
  searchList: [],
  selected: {},
  category: ''
};

export const book = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVE_SEARCH_DATA:
      return {
        searchList: action.searchData
      };
    case actions.SELECTED_BOOK:
      return {
        selected: action.book,
        category: action.category
      }
    case actions.DISPATCH_BOOKREPORT_DATA:
      return {
        selected: action.bookReport.book_info,
        category: action.bookReport.book_info.category
      }
    // case actions.SELECTED_BOOK_IN_EDIT_MODE:
    //   return {
    //     selected: action.book,
    //     category: action.category
    //   }
    case actions.CLEAR_DRAFTS:
      return {
        searchList: '',
        selected: {},
        category: ''
      }
    default:
      return state;
  }
};
