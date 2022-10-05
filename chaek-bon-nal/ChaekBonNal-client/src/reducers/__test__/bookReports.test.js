import { bookReports, initialState } from '../bookReports';
import * as actions from '../../action/index';

describe('bookReports reducer', () => {
  const bookReport = {
    book_info: { title: '데미안', category: '문학' },
    author: { choosenCategory: ['objectId'], name: 'hyojeong', bookmarks: ['objectId'] },
    comments: ['objectId'],
    title: 'mock_title',
    text: 'mock_text',
    quote: 'mock_quote',
    image_url: 'mock_image_url'
  };
  const bookReportList = [bookReport];

  it('should return the initial state', () => {
    expect(bookReports(initialState, {})).toEqual(initialState);
  });

  it('should handle BY_USER_PREFERENCE', () => {
    const receivedData = bookReports(initialState, actions.byUserPreference(bookReportList));

    expect(receivedData.list).toEqual(bookReportList);
    expect(receivedData.list[0].author).toBeInstanceOf(Object);
    expect(receivedData.list[0].author.choosenCategory).toBeInstanceOf(Array);
    expect(receivedData.list[0].author.bookmarks).toBeInstanceOf(Array);
    expect(receivedData.list[0].book_info).toBeInstanceOf(Object);
    expect(receivedData.list[0].comments).toBeInstanceOf(Array);
  });

  it('should handle DISPATCH_BOOKREPORT_DATA', () => {
    const receivedData = bookReports(initialState, actions.dispatchBookReportData(bookReport));

    expect(receivedData.title).toEqual(bookReport.title);
    expect(receivedData.image).toEqual(bookReport.image_url);
    expect(receivedData.quote).toEqual(bookReport.quote);
    expect(receivedData.text).toEqual(bookReport.text);
  });

  it('should handle EDIT_MODE_DATA', () => {
    const reportId = 'mock_report_id';
    const receivedData = bookReports(initialState, actions.editModeData(reportId));

    expect(receivedData.id).toEqual(reportId);
  });

  it('should handle CHANGED_IMAGE_IN_EDIT_MODE', () => {
    const image = 'mock_image_url';
    const receivedData = bookReports(initialState, actions.changedImageInEditMode(bookReport, image));

    expect(receivedData.image).toEqual(image);
    expect(receivedData.title).toEqual(bookReport.title);
    expect(receivedData.quote).toEqual(bookReport.quote);
    expect(receivedData.text).toEqual(bookReport.text);
  });

  it('should handle DRAFTS', () => {
    const text = 'mock_text';
    const title = 'mock_title';
    const receivedData = bookReports(initialState, actions.drafts(text, title));

    expect(receivedData.title).toEqual(title);
    expect(receivedData.text).toEqual(text);
  });

  it('should handle CLEAR_DRAFTS', () => {
    expect(bookReports(initialState, actions.clearDrafts)).toEqual(initialState);
  });

  it('should handle DRAFTS_IMAGE', () => {
    const dataUrl = 'mock_data_url';
    const receivedData = bookReports(initialState, actions.draftsImage(dataUrl));

    expect(receivedData.dataUrl).toEqual(dataUrl);
  });

  it('should handle RECEIVE_DETECTED_TEXT', () => {
    const detectedText = 'mock_detected_text';
    const receivedData = bookReports(initialState, actions.receiveDetectedText(detectedText));

    expect(receivedData.quote).toEqual(detectedText);
  });
});