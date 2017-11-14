/************************************/
/*           DEPENDENCIES           */
/************************************/
import { ApolloClient } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducer/reducer.config';
import { composeWithDevTools } from 'redux-devtools-extension';


// Initialize Client
const client = new ApolloClient();


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

    // Apply middleware
    const middleware = applyMiddleware(apolloMiddleware, thunkMiddleware, logger);
    return {
        ...createStore(rootReducer, composeWithDevTools(middleware))
    };
};


/* Export */
export default configureStore;