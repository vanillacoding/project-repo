import { rest } from 'msw';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { server } from '../../test/server';
import store from '../store';

import reducer, {
  searchPlantNames,
  searchPlantInfo,
  clearPlantList,
} from './search';
import { baseURL } from '../../configs';
import { mockPlantNameList, mockPlantInfo } from '../../test/data';

const mockStore = configureMockStore([thunk])();

beforeEach(() => {
  mockStore.clearActions();
});

describe('search', () => {
  describe('actions', () => {
    it('searchPlantNames dispatches proper actions', async () => {
      await mockStore.dispatch(searchPlantNames('장미'));
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'search/getPlantNames/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'search/getPlantNames/fulfilled',
      );
    });

    it('should handle searchPlantNames failure', async () => {
      server.use(
        rest.get(`${baseURL}/search?keyword=abc`, async (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              result: 'error',
              message: 'error message',
            }),
            ctx.delay(150),
          );
        }),
      );
      await mockStore.dispatch(searchPlantNames('장미'));
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'search/getPlantNames/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'search/getPlantNames/rejected',
      );
    });

    it('searchPlantInfo dispatches proper actions', async () => {
      await mockStore.dispatch(searchPlantInfo(100));
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'search/searchPlantInfo/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'search/searchPlantInfo/fulfilled',
      );
    });

    it('should handle searchPlantInfo failure', async () => {
      server.use(
        rest.get(`${baseURL}/search/123`, async (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              result: 'error',
              message: 'error message',
            }),
          );
        }),
      );
      await mockStore.dispatch(searchPlantInfo(123));
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'search/searchPlantInfo/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'search/searchPlantInfo/rejected',
      );
    });
  });

  describe('reducer', () => {
    let state = reducer(undefined, {});
    it('should return the initialState', () => {
      expect(state).toEqual({
        plantList: [],
        plantInfo: null,
        error: null,
        isLoading: false,
      });
    });

    it('should process searchPlantNames', async () => {
      await store.dispatch(searchPlantNames('장미'));
      expect(store.getState().search.plantList).toEqual(mockPlantNameList.data);
      expect(store.getState().search.isLoading).toBe(false);
    });

    it('should process searchPlantNames', async () => {
      await store.dispatch(searchPlantInfo(100));
      expect(store.getState().search.plantInfo).toEqual(
        mockPlantInfo.plantData,
      );
      expect(store.getState().search.isLoading).toBe(false);
    });

    it('should clear plant name list', () => {
      expect(store.getState().search.plantList.length).toBe(
        mockPlantNameList.data.length,
      );
      store.dispatch(clearPlantList());
      state = store.getState();
      expect(store.getState().search.plantList.length).toBe(0);
    });
  });
});
