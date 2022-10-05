import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8081/'
  : 'https://api.pointcode.site/';
axios.defaults.withCredentials = true;

export interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmation: string;
}

export interface ILoginForm extends Pick<ISignupForm, 'email' | 'password'> {}

interface ITriedSubmission {
  problem_title: string;
  result: string;
  created_at: Date;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar_url: string;
  tried_submissions: ITriedSubmission[];
  solved_problems: string[];
  total_point: number;
}

export const signupAPI = (form: ISignupForm) =>
  axios.post<IUser>('/api/auth/signup', form);

export const loginAPI = (form: ILoginForm) =>
  axios.post<IUser>('/api/auth/login', form);

export const loadUserAPI = () =>
  axios.get<IUser>('/api/auth/user');

export const logoutAPI = () =>
  axios.post('/api/auth/logout');
