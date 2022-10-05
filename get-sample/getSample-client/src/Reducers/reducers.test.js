import { loginReducer } from '../Reducers/loginReducer';
import { dictionaryReducer } from '../Reducers/dictionaryReducer';
import { modalControlReducer } from '../Reducers/modalControlReducer';
import { modalMessageReducer } from '../Reducers/modalMessageReducer';
import { userReducer } from '../Reducers/userReducer';
import { selectedReducer } from '../Reducers/selectedReducer';

describe('Reducers Test', () => {
  describe('loginReducer', () => {
    const initialState = false;

    it('should provide the initial state', () => {
      expect(loginReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle LOGIN action', () => {
      expect(loginReducer(false, { type: 'LOGIN' })).toEqual(true);
    });
  });

  describe('modalControlReducer', () => {
    const initialState = false;

    it('should provide the initial state', () => {
      expect(modalControlReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle READY_TO_SHOW_MODAL action', () => {
      expect(
        modalControlReducer(initialState, {
          type: 'READY_TO_SHOW_MODAL',
        })
      ).toEqual(true);
    });

    it('should handle NOT_READY_TO_SHOW_MODAL action', () => {
      expect(
        modalControlReducer('', {
          type: 'NOT_READY_TO_SHOW_MODAL',
        })
      ).toEqual(false);
    });
  });

  describe('modalMessageReducer', () => {
    const initialState = '';
    const sampleText = 'It is sample modal text';

    it('should provide the initial state', () => {
      expect(modalMessageReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle UPDATE_MODAL_MESSAGE action', () => {
      expect(
        modalMessageReducer(initialState, {
          type: 'UPDATE_MODAL_MESSAGE',
          data: sampleText,
        })
      ).toEqual(sampleText);
    });
  });

  describe('userReducer', () => {
    const initialState = null;
    const sampleUserInfo = { id: '123123123' };

    it('should provide the initial state', () => {
      expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LOGIN action', () => {
      expect(
        userReducer(initialState, {
          type: 'LOGIN',
          data: sampleUserInfo,
        })
      ).toEqual(sampleUserInfo);
    });
  });

  describe('selectedReducer', () => {
    const initialState = {
      language: 'en',
      categories: [],
    };
    const sampleWord = 'sample word';
    const sampleLanguage = 'sample language';

    it('should provide the initial state', () => {
      expect(selectedReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle TYPED_WORD action', () => {
      expect(
        selectedReducer(initialState, {
          type: 'TYPED_WORD',
          data: sampleWord,
        })
      ).toEqual({ ...initialState, word: sampleWord });
    });

    it('should handle CHECKED_LANGUAGE action', () => {
      expect(
        selectedReducer(initialState, {
          type: 'CHECKED_LANGUAGE',
          data: sampleLanguage,
        })
      ).toEqual({ ...initialState, language: sampleLanguage });
    });

    it('should handle CHECKED_CATEGORY action when categories is an empty array', () => {
      expect(
        selectedReducer(initialState, {
          type: 'CHECKED_CATEGORY',
          data: 'film',
        })
      ).toEqual(
        expect.objectContaining({
          language: 'en',
          categories: expect.arrayContaining(['film']),
        })
      );
    });

    it('should handle CHECKED_CATEGORY action when new data is already included', () => {
      const twoItemsArray = ['film', 'talk'];
      expect(
        selectedReducer(
          {
            language: 'en',
            categories: twoItemsArray,
          },
          {
            type: 'CHECKED_CATEGORY',
            data: 'film',
          }
        )
      ).toEqual(
        expect.objectContaining({
          language: 'en',
          categories: expect.arrayContaining(['talk']),
        })
      );
    });

    it('should handle CHECKED_CATEGORY action when new data is already included', () => {
      const threeItemsArray = ['film', 'talk', 'tech'];

      expect(
        selectedReducer(
          {
            language: 'en',
            categories: threeItemsArray,
          },
          {
            type: 'CHECKED_CATEGORY',
            data: 'comedy',
          }
        )
      ).toEqual(
        expect.objectContaining({
          language: 'en',
          categories: expect.arrayContaining(['film', 'talk', 'tech']),
        })
      );
    });
  });

  describe('dictionaryReducer', () => {
    const initialState = null;
    const result = { word: 'sample' };

    it('should provide the initial state', () => {
      expect(dictionaryReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LOADED_DICTIONARY_DATA action', () => {
      expect(
        dictionaryReducer(initialState, {
          type: 'LOADED_DICTIONARY_DATA',
          data: result,
        })
      ).toEqual(result);
    });
  });
});
