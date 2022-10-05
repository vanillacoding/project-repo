import React, { ComponentProps } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../lib/styles/theme';
import Pagination from '../../../components/problems/Pagination';

describe('<Pagination />', () => {
  type PaginationProps = ComponentProps<typeof Pagination>;

  const renderUI = (props: PaginationProps) => render(
    <ThemeProvider theme={theme}>
      <Router>
        <Pagination {...props} />
      </Router>
    </ThemeProvider>
  );

  const mockProps: PaginationProps = {
    page: 1,
    level: 1,
    lastPage: 1,
    onChangeLevel: () => {}
  };

  it('should render correctly', () => {
    const { getByText, getByDisplayValue } = renderUI(mockProps);

    getByDisplayValue(`Level ${mockProps.level}`);
    getByText(String(mockProps.page));
    getByText('＜');
    getByText('＞');
  });

  describe('should check that button is disabled', () => {
    it('page: 1, lastPage: 1', () => {
      const { getByText } = renderUI(mockProps);

      expect(getByText('＜')).toBeDisabled();
      expect(getByText('＞')).toBeDisabled();
    });

    it('page: 1, lastPage: 2', () => {
      const { getByText } = renderUI({ ...mockProps, page: 1, lastPage: 2 });

      expect(getByText('＜')).toBeDisabled();
      expect(getByText('＞')).not.toBeDisabled();
    });

    it('page: 2, lastPage: 2', () => {
      const { getByText } = renderUI({ ...mockProps, page: 2, lastPage: 2 });

      expect(getByText('＜')).not.toBeDisabled();
      expect(getByText('＞')).toBeDisabled();
    });

    it('page: 2, lastPage: 3', () => {
      const { getByText } = renderUI({ ...mockProps, page: 2, lastPage: 3 });

      expect(getByText('＜')).not.toBeDisabled();
      expect(getByText('＞')).not.toBeDisabled();
    });
  });
});
