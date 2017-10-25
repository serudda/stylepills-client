/************************************/
/*           DEPENDENCIES           */
/************************************/
import { ApolloClient } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

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
    const apolloMiddleware = client.middleware();
    const middleware = applyMiddleware(apolloMiddleware, logger);
    return {
        ...createStore(rootReducer, composeWithDevTools(middleware))
    };
};


/* Export */
export default configureStore;