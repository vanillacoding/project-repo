import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../lib/styles/theme';
import Introduction from '../../../components/common/Introduction';

describe('<Introduction />', () => {
  const renderUI = () => render(
    <ThemeProvider theme={theme}>
      <Router>
        <Introduction />
      </Router>
    </ThemeProvider>
  );

  it('should render correctly', () => {
    const { getByText } = renderUI();

    getByText('당신의 코드는 몇 점인가요?');
    getByText('Point Code는 풍부한 문제 수는 물론, 당신의 코드를 분석해 점수를 측정하고 시각화해주는 신개념 알고리즘 풀이 사이트입니다.');
    getByText('지금 시작해보세요!');
    getByText('undraw_code_typing.svg');
  });
});
