import { book, initialState } from '../book';
import * as actions from '../../action/index';

describe('book reducer', () => {
  const mockBookReport = {
    book_info: { title: '데미안', category: '문학' },
    comments: ['objectId'],
    title: 'mock_title',
    text: 'mock_text'
  };

  it('should return the initial state', () => {
    expect(book(initialState, {})).toEqual(initialState);
  });
  it('should handle RECEIVE_SEARCH_DATA', () => {
    const mockData = [{ title: 'demian' }, { title: 'the old man and the sea' }];
    const receivedData = book(initialState, actions.receiveSearchResult(mockData));
    expect(receivedData.searchList).toEqual(mockData);
  });

  it('should handle SELECTED_BOOK', () => {
    const mockData = { book: { author: '헤르만 헤세', title: '나르치스와 골드문트' }, category: '문학' };
    const receivedData = book(initialState, actions.selectedBook(mockData.book, mockData.category));

    expect(receivedData.selected).toEqual(mockData.book);
    expect(receivedData.category).toEqual(mockData.category);
  });

  it('should handle DISPATCH_BOOKREPORT_DATA', () => {
    const receivedData = book(initialState, actions.dispatchBookReportData(mockBookReport));

    expect(receivedData.selected).toEqual(mockBookReport.book_info);
    expect(receivedData.category).toEqual(mockBookReport.book_info.category);
  });

  it('should handle CLEAR_DRAFTS', () => {
    expect(book(initialState, actions.clearDrafts)).toEqual(initialState);
  });
});