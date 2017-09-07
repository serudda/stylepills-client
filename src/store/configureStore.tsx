import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// Return the store instance
// It can also take initialState argument when provided
const configureStore = () => {
    console.log('(2) Launch configureStore on store/configureStore.tsx');
    const sagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(sagaMiddleware, logger);
    console.log('(3) The sagaMiddleware run rootSaga on store/configureStore.tsx');
    console.log('(4) Launched createStore on store/configureStore.tsx');
    return {
        ...createStore(rootReducer, middleware),
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