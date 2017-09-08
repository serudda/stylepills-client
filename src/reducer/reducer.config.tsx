import { combineReducers } from 'redux';
import uiComponentReducer from '../models/uiComponent/uiComponent.reducer';

console.log('(reducer) Enter to reducers/index.tsx');
console.log('(reducer) Created rootReducer with combineReducers on reducers/index.tsx');
// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    uiComponentReducer
});

export default rootReducer;