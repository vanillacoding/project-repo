import React, { ComponentProps } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../lib/styles/theme';
import ProblemList from '../../../components/problems/ProblemList';

describe('<ProblemList />', () => {
  type ProblemListProps = ComponentProps<typeof ProblemList>;

  const renderUI = (props: ProblemListProps) => render(
    <ThemeProvider theme={theme}>
      <Router>
        <ProblemList {...props} />
      </Router>
    </ThemeProvider>
  );

  const mockProps: ProblemListProps = {
    problems: [
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
    ],
    isLoading: false
  };

  it('should render ProblemItem', () => {
    const { getByText, getAllByText } = renderUI(mockProps);

    mockProps.problems!.forEach(({ level, title }) => {
      getAllByText(`Level ${level}`);
      getByText(title);
    });
  });
});
