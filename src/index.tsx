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

import { setAuthorizationToken, IJwtDecoded } from './auth/auth';
// import { setCurrentUserAction } from './actions/auth.action';

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
let currentUserId = null;


// Set Authorization Token to each user request
if (localStorage.accessToken) {

    setAuthorizationToken(localStorage.accessToken);
    // TODO: Traerme los datos del usuario logueado, guardarlos en el Store y en localStorage
    // store.dispatch(setCurrentUserAction(jwtDecode(localStorage.accessToken)));

} else if (location.search)  {

    const parsed = queryString.parse(location.search);
    const decoded: IJwtDecoded = jwtDecode(parsed.token);
    localStorage.setItem('token', decoded.token);
    // TODO: Traerme los datos del usuario logueado, guardarlos en el Store y en el localStorage
    // store.dispatch(setCurrentUserAction(decoded));
    currentUserId = decoded.id;
}


/*         RENDER         */
/**************************/
render((
    <ApolloProvider store={store} client={client}>
        <BrowserRouter basename="/">
            <App currentUserId={currentUserId}/>
        </BrowserRouter>
    </ApolloProvider>
), document.getElementById('root'));