import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { server } from '../../test/server';
import store from '../store';

import { getAllPlantsByUserId, getMostPopularPlants } from './plants';
import { baseURL } from '../../configs';
import { mockPlants, mockPopularPlants } from '../../test/data';

const mockStore = configureMockStore([thunk])();

beforeEach(() => {
  mockStore.clearActions();
});

describe('plants', () => {
  describe('actions', () => {
    it('getAllPlantsByUserId dispatches proper actions', async () => {
      await mockStore.dispatch(getAllPlantsByUserId());
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'plants/getAllPlantsByUserId/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'plants/getAllPlantsByUserId/fulfilled',
      );
    });

    it('should handle getAllPlantsByUserId failure', async () => {
      server.use(
        rest.get(`${baseURL}/plants`, async (req, res, ctx) => {
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
      await mockStore.dispatch(getAllPlantsByUserId());
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'plants/getAllPlantsByUserId/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'plants/getAllPlantsByUserId/rejected',
      );
    });

    it('getMostPopularPlants dispatches proper actions', async () => {
      await mockStore.dispatch(getMostPopularPlants());
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'plants/getMostPopularPlants/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'plants/getMostPopularPlants/fulfilled',
      );
    });

    it('should handle getMostPopularPlants failure', async () => {
      server.use(
        rest.get(`${baseURL}/plants/popular`, async (req, res, ctx) => {
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
      await mockStore.dispatch(getMostPopularPlants());
      expect(mockStore.getActions()[0]).toHaveProperty(
        'type',
        'plants/getMostPopularPlants/pending',
      );
      expect(mockStore.getActions()[1]).toHaveProperty(
        'type',
        'plants/getMostPopularPlants/rejected',
      );
    });
  });

  describe('reducer', () => {
    it('should process getAllPlantsByUserId', async () => {
      await store.dispatch(getAllPlantsByUserId());
      expect(store.getState().plants.currentPlant).toEqual(mockPlants[0]);
      expect(store.getState().plants.isLoading).toBe(false);
    });

    it('should process getMostPopularPlants', async () => {
      await store.dispatch(getMostPopularPlants());
      expect(store.getState().plants.popularPlants).toEqual(mockPopularPlants);
      expect(store.getState().plants.isLoading).toBe(false);
    });
  });
});
