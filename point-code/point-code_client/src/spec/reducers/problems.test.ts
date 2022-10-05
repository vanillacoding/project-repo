import { AxiosError } from 'axios';
import problems, { initialState, initializeProblems } from '../../modules/problems';
import { IProblem } from '../../lib/api/problems';

describe('reducer <problems>', () => {
  const mockProblems: IProblem[] = [
    {
      _id: '5e91ae6f6e301e3164a2f0ca',
      title: 'First non-repeated character',
      level: 1,
      description: 'Given an arbitrary input string, return the first non-repeated character in the string.',
      initial_code: 'function solution(string) {  // your code..}',
      tests: [],
      solutions: []
    },
    {
      _id: '5e957e72c21118203c033b69',
      title: 'Character Frequency',
      level: 1,
      description: 'Write a function that takes as its input a string and returns an array',
      initial_code: 'function solution(string) {  // your code..}',
      tests: [],
      solutions: []
    }
  ];

  const mockError: AxiosError<any> = {
    message: 'Request failed with status code 500',
    name: 'Error',
    stack: 'Error: Request failed with status code 500 at createError',
    config: {},
    isAxiosError: true,
    toJSON: () => ({})
  };

  describe('should handle action', () => {
    it('case: INITIALIZE_PROBLEMS', () => {
      expect(problems(initialState, initializeProblems())).toEqual(initialState);
    });

    it('case: READ_PROBLEMS_ASYNC', () => {
      expect(problems(initialState, { type: 'problems/READ_PROBLEMS_REQUEST' })).toEqual({
        ...initialState,
        isLoading: true
      });

      expect(problems(initialState, {
        type: 'problems/READ_PROBLEMS_SUCCESS',
        payload: {
          data: mockProblems,
          headers: { 'last-page': 1 } }
      })).toEqual({
        ...initialState,
        problems: mockProblems,
        error: null,
        isLoading: false,
        lastPage: 1
      });

      expect(problems(initialState, { type: 'problems/READ_PROBLEMS_FAILURE', payload: mockError })).toEqual({
        ...initialState,
        error: mockError,
        isLoading: false
      });
    });
  });
});
