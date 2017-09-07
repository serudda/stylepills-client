// HOLA NO EL NUEVO CAMBIO

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

console.log('(1) Create store base on configureStore on index.tsx');
// Initialize store
const store = configureStore();

console.log('(7) Render App component on index.tsx');

render((
  <Provider store={store}> 
    <Router>
      <App />
    </Router>
  </Provider>
  ), document.getElementById('root'));
