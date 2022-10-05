import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/root-reducer';
import { Provider } from 'react-redux';
import theme from '../assets/styles/theme';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Router>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </Router>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
