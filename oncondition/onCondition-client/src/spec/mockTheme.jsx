import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import { ThemeProvider } from "styled-components";

function MockTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

MockTheme.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MockTheme;
