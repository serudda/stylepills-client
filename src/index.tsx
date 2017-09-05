// Dependencies
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// App component
import App from './containers/App/App';

// Redux Provider component
import { Provider } from 'react-redux';

// configure Store
import configureStore from './store/configureStore';


// Initialize store
const store = configureStore();

render((
  <Provider store={store}> 
    <Router>
      <App />
    </Router>
  </Provider>
  ), document.getElementById('root'));
