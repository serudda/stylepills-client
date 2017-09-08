import initialState from '../../reducer/reducer.initialState';
import * as types from '../../constants/action.types';


// Handles ui component related actions
export default function ( state: any = initialState.uiComponents, action: any ) {
    console.log('(reducer) Enter to uiComponentReducer on reducers/uiComponentReducer');
    console.log('(reducer) action type:', action.type);
    switch (action.type) {
        
        case types.GET_UICOMPONENT: {
            console.log('(reducer) Enter to Switch option: *GET_UICOMPONENT* on reducers/uiComponentReducer');
            return {...state, fetching: true};
        }

        case types.GET_UICOMPONENT_FULFILLED: {
            console.log('(reducer) Enter to Switch option: *GET_UICOMPONENT_FULFILLED* on reducers/uiComponentReducer');
            return {...state, 
                    uiComponents: action.payload,
                    fetching: false,
                    fetched: true
            };
        }
        
        case types.GET_UICOMPONENT_ERROR: {
            console.log('(reducer) Enter to Switch option: *GET_UICOMPONENT_ERROR* on reducers/uiComponentReducer');
            return {...state, 
                    fetching: false,
                    error: action.payload
            };
        }
            
        default:
            console.log('(reducer) Enter to Switch option: *default* on reducers/uiComponentReducer');
            return state;  
    }
}
