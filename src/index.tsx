/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import { config } from './config/config';
import configureStore from './store/store.config';

import App from './components/pages/App/App';
// -----------------------------------


// Get server config object
let serverConfig = config.getServerConfig();


// Initialize apollo client
const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: serverConfig.dataBaseUrl
    }),
});


// Initialize store
const store = configureStore();


/*         RENDER         */
/**************************/
render((
    <ApolloProvider store={store} client={client}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </ApolloProvider>
), document.getElementById('root'));