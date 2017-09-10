/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// App component
import App from './components/pages/App/App';

// Redux Provider component
import { Provider } from 'react-redux';

// configure Store
import configureStore from './store/store.config';



// Initialize store
const store = configureStore();


/*         RENDER         */
/**************************/
render((
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
), document.getElementById('root'));