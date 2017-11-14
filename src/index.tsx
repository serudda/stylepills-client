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


// Set Authorization Token to each user request
if (localStorage.accessToken) {
    setAuthorizationToken(localStorage.accessToken);
    /* TODO: Si hay un access Token en localStorage, decodificar para obtener 
        el Id del User logueado, y asi poder llamar al BE y obtener todos sus 
        datos 
        reference: https://www.youtube.com/watch?v=FyyPUIAe6kc&list=PLuNEz8XtB51K-x3bwCC9uNM_cxXaiCcRY&index=18
        11:10 min*/
    // store.dispatch(setCurrentUserAction(jwt.decode(localStorage.accessToken)));
}


/*         RENDER         */
/**************************/
render((
    <ApolloProvider store={store} client={client}>
        <BrowserRouter basename="/">
            <MainRoutes />
        </BrowserRouter>
    </ApolloProvider>
), document.getElementById('root'));