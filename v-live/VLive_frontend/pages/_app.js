import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';
import theme from '../src/styles/theme';

import '../src/config/firebase-config';
import '/public/global.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
