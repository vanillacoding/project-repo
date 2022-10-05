import { AxiosError } from 'axios';
import problem, { initialState, changeUserCode, initializeProblem } from '../../modules/problem';
import { IProblem } from '../../lib/api/problems';

describe('reducer <problem>', () => {
  const mockProblem: IProblem = {
    _id: '5e91ae6f6e301e3164a2f0ca',
    title: 'First non-repeated character',
    level: 1,
    description: 'Given an arbitrary input string, return the first non-repeated character in the string.',
    initial_code: 'function solution(string) {  // your code..}',
    tests: [],
    solutions: []
  };

  const mockError: AxiosError<any> = {
    message: 'Request failed with status code 500',
    name: 'Error',
    stack: 'Error: Request failed with status code 500 at createError',
    config: {},
    isAxiosError: true,
    toJSON: () => ({})
  };

  describe('should handle action', () => {
    it('case: CHANGE_USER_CODE', () => {
      expect(problem(initialState, changeUserCode('function solution(string) {}'))).toEqual({
        ...initialState,
        userCode: 'function solution(string) {}'
      });
    });

    it('case: INITIALIZE_PROBLEM', () => {
      expect(problem(initialState, initializeProblem())).toEqual(initialState);
    });

    it('case: READ_PROBLEM_ASYNC', () => {
      expect(problem(initialState, { type: 'problem/READ_PROBLEM_REQUEST' })).toEqual({
        ...initialState,
        isLoading: true
      });

      expect(problem(initialState, { type: 'problem/READ_PROBLEM_SUCCESS', payload: mockProblem })).toEqual({
        ...initialState,
        problem: mockProblem,
        userCode: mockProblem.initial_code,
        error: null,
        isLoading: false
      });

      expect(problem(initialState, { type: 'problem/READ_PROBLEM_FAILURE', payload: mockError })).toEqual({
        ...initialState,
        error: mockError,
        isLoading: false
      });
    });
  });
});
