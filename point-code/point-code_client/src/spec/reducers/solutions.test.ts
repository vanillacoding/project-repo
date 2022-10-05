import { AxiosError } from 'axios';
import solutions, { initialState } from '../../modules/solutions';
import { IPopulatedSolution } from '../../lib/api/problems';

describe('reducer <solutions>', () => {
  const mockPopulatedSolution: IPopulatedSolution[] = [
    {
      solved_user: {
        _id: '5e979d7646645630c470fbab',
        name: 'test',
        email: 'test@gmail.com',
        avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
        tried_submissions: [],
        solved_problems: [],
        total_point: 98
      },
      submitted_code: 'function solution(string) { return \'1\' }',
      point: 98
    },
    {
      solved_user: {
        _id: '5e979d7646645630c470fbac',
        name: 'test2',
        email: 'test2@gmail.com',
        avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
        tried_submissions: [],
        solved_problems: [],
        total_point: 98
      },
      submitted_code: 'function solution(string) { return \'2\' }',
      point: 98
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
    it('case: READ_SOLUTIONS_ASYNC', () => {
      expect(solutions(initialState, { type: 'solutions/READ_SOLUTIONS_REQUEST' })).toEqual({
        ...initialState,
        isLoading: true
      });

      expect(solutions(initialState, { type: 'solutions/READ_SOLUTIONS_SUCCESS', payload: mockPopulatedSolution })).toEqual({
        ...initialState,
        solutions: mockPopulatedSolution,
        error: null,
        isLoading: false
      });

      expect(solutions(initialState, { type: 'solutions/READ_SOLUTIONS_FAILURE', payload: mockError })).toEqual({
        ...initialState,
        error: mockError,
        isLoading: false
      });
    });
  });
});
