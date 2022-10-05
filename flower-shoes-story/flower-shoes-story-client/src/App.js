import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

import { ModalProvider } from "./contexts/ModalContext";

import GlobalStyles from "./styles";
import GlobalFonts from "./styles/fonts";
import theme from "./styles/theme";

import Pages from "./pages";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <GlobalFonts />
        <ModalProvider>
          <Layout>
            <Pages />
          </Layout>
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
