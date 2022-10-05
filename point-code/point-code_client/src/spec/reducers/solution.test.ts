import { AxiosError } from 'axios';
import solution, { initialState } from '../../modules/solution';
import { ISolution } from '../../lib/api/problems';

describe('reducer <solution>', () => {
  const mockSolution: ISolution = {
    solved_user: '5e979d7646645630c470fbab',
    submitted_code: 'function solution(string) { return \'1\' }',
    point: 98
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
    it('case: CONFIRM_SOLUTION_ASYNC', () => {
      expect(solution(initialState, { type: 'solution/CONFIRM_SOLUTION_REQUEST' })).toEqual({
        ...initialState,
        failureTestsIndex: [],
        isLoading: true
      });

      expect(solution(initialState, {
        type: 'solution/CONFIRM_SOLUTION_SUCCESS',
        payload: {
          solution: mockSolution,
          failureTestsIndex: []
        }
      })).toEqual({
        ...initialState,
        solution: mockSolution,
        failureTestsIndex: [],
        error: null,
        isLoading: false
      });

      expect(solution(initialState, { type: 'solution/CONFIRM_SOLUTION_FAILURE', payload: mockError })).toEqual({
        ...initialState,
        error: mockError,
        isLoading: false
      });
    });
  });
});
