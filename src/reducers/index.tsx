import { combineReducers } from 'redux';
import uiComponents from '../reducers/uiComponentReducer';

console.log('(reducer) Enter to reducers/index.tsx');
console.log('(reducer) Created rootReducer with combineReducers on reducers/index.tsx');
// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    uiComponents
});

export default rootReducer;