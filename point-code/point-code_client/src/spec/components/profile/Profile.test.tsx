import React, { ComponentProps } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { RUNTIME_ERROR, WRONG_ANSWER, ACCEPTED } from '../../../lib/constants/submissionResult';
import theme from '../../../lib/styles/theme';
import Profile from '../../../components/profile/Profile';

describe('<Profile />', () => {
  type ProfileProps = ComponentProps<typeof Profile>;

  const renderUI = (props: ProfileProps) => render(
    <ThemeProvider theme={theme}>
      <Router>
        <Profile {...props} />
      </Router>
    </ThemeProvider>
  );

  const mockProps: ProfileProps = {
    user: {
      _id: '5e979d7646645630c470fbab',
      name: 'test',
      email: 'test@gmail.com',
      avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
      tried_submissions: [],
      solved_problems: [
        '5e91ae6f6e301e3164a2f0ca',
        '5e91ae6f6e301e3164a2f0cb',
        '5e91ae6f6e301e3164a2f0cc',
        '5e91ae6f6e301e3164a2f0cd',
        '5e91ae6f6e301e3164a2f0ce',
        '5e91ae6f6e301e3164a2f0cf'
      ],
      total_point: 500
    },
    chartSize: 500,
    totalCounts: {
      [RUNTIME_ERROR]: 1,
      [WRONG_ANSWER]: 1,
      [ACCEPTED]: 1
    },
    lastWeekCounts: [
      ['2020-04-13', 2],
      ['2020-04-12', 1],
      ['2020-04-11', 0],
      ['2020-04-10', 0],
      ['2020-04-09', 0],
      ['2020-04-08', 0],
      ['2020-04-07', 0]
    ]
  };

  it('should render correctly', () => {
    const { getByText } = renderUI(mockProps);

    getByText('통계');
    getByText('✅ 맞은 문제');
    getByText('💯 평균 점수');
    getByText('📝 최근 일주일 제출');
    getByText(String(mockProps.user.solved_problems.length));
    getByText(String(Math.floor(mockProps.user.total_point / mockProps.user.solved_problems.length)));
    getByText(String(mockProps.lastWeekCounts.reduce((acc, cur) => acc + cur[1], 0)));

    getByText('차트');
    getByText('모든 제출 결과');
    getByText('최근 일주일 제출');
  });
});
