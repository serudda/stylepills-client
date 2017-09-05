import { combineReducers } from 'redux';
import uiComponents from '../reducers/uiComponentReducer';


// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    uiComponents
});

export default rootReducer;