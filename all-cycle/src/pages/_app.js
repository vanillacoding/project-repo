import React from "react";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import Header from "@/components/layout/header/index";
import Layout from "@/components/layout/Layout";
import THEME from "@/constants/theme";

import "./globals.css";

config.autoAddCss = false; /* eslint-disable import/first */

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={THEME}>
          <Layout>
            <Header />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}
