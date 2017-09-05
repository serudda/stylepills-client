import initialState from './initialState';
import * as types from '../constants/actionTypes';


// Handles ui component related actions
export default function (state = initialState.uiComponents, action: any) {
    switch (action.type) {
        case types.GET_UICOMPONENT_SUCCESS:
            return [...state, action.uiComponents]
        
        case types.GET_UICOMPONENT_ERROR:
            return {...state, message: action.errorMessage}
        
        case types.SELECT_UICOMPONENT:
            return {...state, uiComponentSelected: action.component}
        
        case types.ADD_UICOMPONENT:
            return [...state, action.component]

        default:
            return state;  
    }
}
