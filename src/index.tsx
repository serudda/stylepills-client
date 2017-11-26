/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import createHistory from 'history/createBrowserHistory';
import * as queryString from 'query-string';
import * as jwtDecode from 'jwt-decode';

import { config } from './config/config';
import configureStore from './store/store.config';

import { IJwtDecoded } from './auth/auth';
import { setTokenAndIdAction, receiveLoginAction } from './actions/auth.action';

import App from './components/pages/App/App';

// -----------------------------------

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

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

let token = localStorage.token;
let user = localStorage.user ? JSON.parse(localStorage.user) : undefined;

// Get Token and User User from LocalStorage
/* TODO: Estoy tomando lo que haya en la url y asumiendo que es un Token valido, 
si no valido que es un Token valido, el usuario va a creer que esta logueado, y yo
voy a creer que el usuario esta logueado, y cuando quiera hacer una peticion va a decir
como si no estuviera logueado.*/
if (!token || !user) {

    // If there is a query string
    if (location.search) {
        const parsed = queryString.parse(location.search);

        // If query string is 'token'
        if (parsed.token) {
            const decoded: IJwtDecoded = jwtDecode(parsed.token);
            token = decoded.token;
            user = decoded.user;
            // Set Token an User on Store and Local Storage
            store.dispatch(setTokenAndIdAction(token, user));
        }

    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
} else  {
    // Set Token an User on Store
    store.dispatch(receiveLoginAction(user));
}



/*         RENDER         */
/**************************/
render((
    <ApolloProvider store={store} client={client}>
        <Router history={history}>
            <App />
        </Router>
    </ApolloProvider>
), document.getElementById('root'));