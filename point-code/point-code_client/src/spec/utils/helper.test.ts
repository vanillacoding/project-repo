import { convertDateToISOString, getTotalCounts } from '../../lib/utils/helper';
import { IUser } from '../../lib/api/auth';
import { RUNTIME_ERROR, WRONG_ANSWER, ACCEPTED } from '../../lib/constants/submissionResult';

describe('util <helper function>', () => {
  const mockDates = [new Date('2020-01-01'), new Date(95, 11, 17, 3, 24, 10)];

  const mockUsers: IUser[] = [
    {
      _id: '5e979d7646645630c470fbab',
      name: 'test',
      email: 'test@gmail.com',
      avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
      tried_submissions: [
        {
          problem_title: 'First non-repeated character',
          result: RUNTIME_ERROR,
          created_at: new Date()
        }
      ],
      solved_problems: [],
      total_point: 0
    },
    {
      _id: '5e979d7646645630c470fbac',
      name: 'test2',
      email: 'test2@gmail.com',
      avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
      tried_submissions: [
        {
          problem_title: 'First non-repeated character',
          result: WRONG_ANSWER,
          created_at: new Date()
        },
        {
          problem_title: 'First non-repeated character',
          result: RUNTIME_ERROR,
          created_at: new Date()
        },
        {
          problem_title: 'First non-repeated character',
          result: ACCEPTED,
          created_at: new Date()
        }
      ],
      solved_problems: [],
      total_point: 98
    }
  ];

  describe('should return output correctly', () => {
    it('case: convertDateToISOString', () => {
      expect(convertDateToISOString(mockDates[0])).toBe('2020-01-01T09:00:00.000Z');
      expect(convertDateToISOString(mockDates[1])).toBe('1995-12-17T03:24:10.000Z');
    });

    it('case: getTotalCounts', () => {
      expect(getTotalCounts(mockUsers[0])).toEqual({ [RUNTIME_ERROR]: 1, [WRONG_ANSWER]: 0, [ACCEPTED]: 0 });
      expect(getTotalCounts(mockUsers[1])).toEqual({ [RUNTIME_ERROR]: 1, [WRONG_ANSWER]: 1, [ACCEPTED]: 1 });
    });
  });
});
