/************************************/
/*           DEPENDENCIES           */
/************************************/
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { ApolloClient } from 'react-apollo';

import rootReducer from '../reducer/reducer.config';
import rootSaga from '../saga/saga.config';
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
    const sagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(apolloMiddleware, sagaMiddleware, logger);
    return {
        ...createStore(rootReducer, composeWithDevTools(middleware)),
        runSaga: sagaMiddleware.run(rootSaga)
    };
};

/* Export */
export default configureStore;



/* 

Flow:

1. Inicializamos nuestro SagaMiddleware.
2. Pasamos rootReducer y sagaMiddleware al createStore para crear nuestro Redux Store.
3. Finalmente, corremos nuestros sagas. 

*/