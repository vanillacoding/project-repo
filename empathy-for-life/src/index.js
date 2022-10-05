import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import "./auth/firebase";

import { Provider } from "./features/rootSlice";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
