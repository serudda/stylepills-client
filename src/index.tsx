/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import * as queryString from 'query-string';
import * as jwtDecode from 'jwt-decode';

import { config } from './config/config';
import configureStore from './store/store.config';

import { IJwtDecoded } from './auth/auth';
import { setTokenAndIdAction } from './actions/auth.action';

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

// Current user id
// let currentUserId = null;


let token = localStorage.token;
let id = localStorage.userId;

// Get Token and User Id from LocalStorage
if (!token || !id) {
    if (location.search) {
        const parsed = queryString.parse(location.search);
        const decoded: IJwtDecoded = jwtDecode(parsed.token);
        token = decoded.token;
        id = decoded.id;
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    }
}

if (token && id) {
    // Set Token an Id on Store and Local Storage
    store.dispatch(setTokenAndIdAction(token, id));
}



/*         RENDER         */
/**************************/
render((
    <ApolloProvider store={store} client={client}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </ApolloProvider>
), document.getElementById('root'));