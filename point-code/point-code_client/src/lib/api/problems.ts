import axios from 'axios';
import qs from 'qs';
import { IUser } from './auth';

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8081/'
  : 'https://api.pointcode.site/';
axios.defaults.withCredentials = true;

enum Level {
  EASY = 1,
  NORMAL = 2,
  HARD = 3
}

interface ITest {
  expected_input: string;
  expected_output: any;
}

export interface ISolution {
  solved_user: string;
  submitted_code: string;
  point: number;
}

export interface IPopulatedSolution {
  solved_user: IUser;
  submitted_code: string;
  point: number;
}

export interface IProblem {
  _id: string;
  title: string;
  level: Level;
  description: string;
  initial_code: string;
  tests: ITest[];
  solutions: ISolution[];
}

export interface IResponseConfirmSolution {
  result: 'success' | 'failure';
  solution: ISolution | null;
  failureTestsIndex: number[];
}

export const readProblemAPI = (id?: string) =>
  axios.get<IProblem>(`/api/problems/${id}`);

export const readProblemsAPI = ({ page, level }: { page?: string, level?: string }) => {
  const queryString = qs.stringify({ page, level });

  return axios.get<IProblem[]>(`/api/problems?${queryString}`);
};

export const readSolutionsAPI = (id?: string) =>
  axios.get<IPopulatedSolution[]>(`/api/problems/${id}/solutions`);

export const confirmSolutionAPI = (userCode: string, id: string) =>
  axios.put<IResponseConfirmSolution>(`/api/problems/${id}`, { userCode });
