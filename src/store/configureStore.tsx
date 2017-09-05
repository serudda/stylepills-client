import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas'; // TODO: Next step

// Return the store instance
// It can also take initialState argument when provided
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(rootReducer,
        applyMiddleware(sagaMiddleware)),
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