import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App/App';

render((
  <Router>
    <App />
  </Router>
  ), document.getElementById('root'));
