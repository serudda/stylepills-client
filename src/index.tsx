/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';

import { createBrowserHistory as createHistory } from 'history';
import * as queryString from 'query-string';
import * as jwtDecode from 'jwt-decode';

import { config } from './config/config';
import configureStore from './store/store.config';

import { IJwtDecoded } from './core/auth/auth';
import { setTokenAndIdAction, receiveLoginAction } from './actions/auth.action';

import { sassCompilerService, IResponse } from './core/services/compilers/sassCompiler.service';

import App from './components/pages/App/App';

var scss = `
/************************************************/
/*               GLOBAL VARIABLES               */
/************************************************/

$color: (
    lightPrimary:   #FDF980,
    primary:        #FEEB6A,
    darkPrimary:    #FCD85E,
    lightSecondary: #3CDAD5,
    secondary:      #33ADA9,
    darkSecondary:  #288784,
    positive:       #74C080,
    negative:       #FF4949,
    warning:        #FFC82C,
    info:           #408FEC,
    black:        #24292e,
    mirage:         #1F2D3D,
    steel:          #273444,
    slate:          #3C4858,
    silver:       #8492A6,
    smoke:          #E0E6ED,
    darkSmoke:      #D3DCE6,
    extraDarkSmoke: #C0CCDA,
    snow:         #F9FAFC,
    darkSnow:       #EFF2F7,
    extraDarkSnow:  #E5E9F2,
    white:        #FFFFFF,
);


/* $body-background: map-get($color, white); */
$body-font-color: map-get($color, black);


/*               GLOBAL STYLES               */
/*********************************************/

body.mainApp {
    padding: 0;
    background-color: $body-background;
    color: $body-font-color;
    overflow-x: hidden;
    height: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0;

    // Custom Close Icon
    .sp-close-icon {
        background-image: url('./../../../resources/images/x.svg');
        background-size: cover;
        background-repeat: no-repeat;
        width: 2.6em;
        height: 2.6em;
    }

    // Fix Safari row issue
    .row:before {
        display: inherit;
    }

    .AppContent {
        min-height: 100%;
        position: relative;
    }
}
`;

sassCompilerService.compile(scss).then(
    (response: IResponse) => {
        console.log('Result from sassCompilerService: ', response);
    }
);

// -----------------------------------

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Get server config object
let serverConfig = config.getServerConfig();

/*sassCompiler.render({
    data: '.class { color: red; }',
}, (err, result) => {
    console.log(result);
    console.log(err);
});*/

/* var sass = require('node-sass');
sass.render({
    file: null,
    data: 'body{background:blue; a{color:black;}}',
    outputStyle: 'compressed'
}, (error: any, result: any) => { // node-style callback from v3.0.0 onwards
  if (error) {
    console.log(error.status); // used to be "code" in v2x and below
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  } else {
    console.log(result.css.toString());

    console.log(result.stats);

    console.log(result.map.toString());
    // or better
    console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too
  }
}); */


// Initialize apollo client
// TODO: Hacer más disciente que estoy exportando el 'client'
export const client = new ApolloClient({
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
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </ApolloProvider>
), document.getElementById('root'));