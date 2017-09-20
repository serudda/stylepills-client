/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// App component
import App from './components/pages/App/App';

// configure Store
import configureStore from './store/store.config';

// Third Party
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import 'highlight.js/styles/atom-one-dark.css';


// Initialize apollo client
const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost:4000/graphql'
    }),
});
// Initialize store
const store = configureStore();

/*         RENDER         */
/**************************/
render((
        <ApolloProvider store={store} client={client}>
            <Router>
                <App />
            </Router>
        </ApolloProvider>
), document.getElementById('root'));