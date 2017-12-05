/// <reference path="../../node_modules/redux-segment/typings/redux-segment.d.ts" />
/************************************/
/*           DEPENDENCIES           */
/************************************/
import { ApolloClient } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createTracker } from 'redux-segment';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducer/reducer.config';
import { composeWithDevTools } from 'redux-devtools-extension';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';


// Initialize Client
const client = new ApolloClient();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

/**
 * @desc Create store passing rootReducer (combined reducers) and 
 * each middleware. This returns the store instance.
 * @function getUiComponentSuccessAction
 * @returns {*} configureStore
 */
const configureStore = () => {
    // Middlewares list
    const apolloMiddleware = client.middleware();
    const thunkMiddleware = thunk;
    const routerMiddlewareInstance = routerMiddleware(history);
    const tracker = createTracker();
    const immutableMiddleware = immutableStateInvariantMiddleware();

    let middleware;

    // Apply middleware depends of the environment
    if (process.env.NODE_ENV !== 'production') {
        middleware = applyMiddleware(
            apolloMiddleware, 
            thunkMiddleware, 
            routerMiddlewareInstance, 
            tracker, 
            logger, 
            immutableMiddleware);
    } else {
        middleware = applyMiddleware(
            apolloMiddleware, 
            thunkMiddleware, 
            routerMiddlewareInstance, 
            tracker);
    }

    return {
        ...createStore(rootReducer, composeWithDevTools(middleware))
    };
};


/* Export */
export default configureStore;