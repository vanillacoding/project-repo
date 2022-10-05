import { rest } from 'msw';
import { baseURL, weatherURL } from '../configs';
import {
  mockPlants,
  mockPlant,
  mockWeather,
  mockPopularPlants,
  mockPlantNameList,
  mockPlantInfo,
} from './data';

export const handlers = [
  rest.get(`${baseURL}/plants`, (req, res, ctx) => res(ctx.json(mockPlants))),
  rest.get(weatherURL, (req, res, ctx) => res(ctx.json(mockWeather))),
  rest.get(`${baseURL}/plants/popular`, (req, res, ctx) =>
    res(ctx.json(mockPopularPlants)),
  ),
  rest.post(`${baseURL}/plants/new`, (req, res, ctx) =>
    res(ctx.json(mockPlant)),
  ),
  rest.put(`${baseURL}/plants/abc111`, (req, res, ctx) =>
    res(ctx.json(mockPlant)),
  ),
  rest.put(`${baseURL}/plants`, (req, res, ctx) => res(ctx.json(mockPlants))),
  rest.get(`${baseURL}/search?keyword=장미`, (req, res, ctx) =>
    res(ctx.json(mockPlantNameList)),
  ),
  rest.get(`${baseURL}/search/100`, (req, res, ctx) =>
    res(ctx.json(mockPlantInfo)),
  ),
];
