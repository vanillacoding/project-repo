import React, { ComponentProps } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../lib/styles/theme';
import SolutionList from '../../../components/solutions/SolutionList';

describe('<SolutionList />', () => {
  type SolutionListProps = ComponentProps<typeof SolutionList>;

  const renderUI = (props: SolutionListProps) => render(
    <ThemeProvider theme={theme}>
      <Router>
        <SolutionList {...props} />
      </Router>
    </ThemeProvider>
  );

  const mockProps: SolutionListProps = {
    solutions: [
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
    ],
    isLoading: false
  };

  it('should render SolutionItem', () => {
    const { getByText, getAllByAltText } = renderUI(mockProps);

    mockProps.solutions!.forEach(solution => {
      getAllByAltText('유저 아바타 이미지');
      getByText(solution.solved_user.name);
      getByText(solution.solved_user.email);
      getByText(solution.submitted_code);
    });
  });
});
