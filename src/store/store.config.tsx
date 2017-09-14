/************************************/
/*           DEPENDENCIES           */
/************************************/
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducer/reducer.config';
import rootSaga from '../saga/saga.config';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * @desc Create store passing rootReducer (combined reducers) and 
 * each middleware. This returns the store instance.
 * @function getUiComponentSuccessAction
 * @returns {*} configureStore
 */

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(sagaMiddleware, logger);
    return {
        ...createStore(rootReducer, composeWithDevTools(middleware)),
        runSaga: sagaMiddleware.run(rootSaga)
    };
};

export default configureStore;



/* 

Flow:

1. Inicializamos nuestro SagaMiddleware.
2. Pasamos rootReducer y sagaMiddleware al createStore para crear nuestro Redux Store.
3. Finalmente, corremos nuestros sagas. 

*/