/* TODO: Analizar que vamos a hacer con las actions, reducers, sagas. Si vamos
viendo la necesidad de gestionar algunos estados con nuestro propio metodo, 
mantenemos estos archivos, de lo contrario los eliminamos 
NOTE: Este archivo no se reviso y se limpio */

/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../../constants/action.types';
import * as model from './uiComponent.model';
import { Action } from './uiComponent.action';



/************************************/
/*            INTERFACES            */
/************************************/

export interface IUiComponentState {
    item: model.UiComponent;
    error: string;
    fetching: Boolean;
    fetched: Boolean;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IUiComponentState = {
    item: {
        title: '',
        css: '',
        colorPalette: null,
        scss: '',
        html: ''
    },
    error: '',
    fetching: false,
    fetched: false
};



/** 
 * @desc This function takes UI Component actions and return a new state 
 * @param {IUiComponentState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IUiComponentState} 
 */
export default function (state: IUiComponentState = defaultState, action: Action): IUiComponentState {

    switch (action.type) {

        /***********************************/
        /*       API REQUEST ACTIONS       */
        /***********************************/

        case types.GET_UICOMPONENT: {
            return {...state, fetching: true};
        }

        case types.GET_UICOMPONENT_FULFILLED: {
            return {...state, 
                    item: action.payload,
                    fetching: false,
                    fetched: true
            };
        }
        
        case types.GET_UICOMPONENT_ERROR: {
            return {...state, 
                    fetching: false,
                    error: action.payload
            };
        }


        /***********************************/
        /*            UI ACTIONS           */
        /***********************************/
            
        default:
            return state;  
    }
}
