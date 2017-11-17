/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/ui.action';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IUiState {
    showModal: boolean;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IUiState = {
    showModal: false
};

// -----------------------------------


/** 
 * @desc This function takes UI actions and return a new state 
 * @param {IUiState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IUiState} 
 */
export default function (state: IUiState = defaultState, action: Action): IUiState {

    switch (action.type) {

        /***********************************/
        /*            UI ACTIONS           */
        /***********************************/

        case types.CLEAR_UI: {
            return {...state, showModal: false};
        }

        case types.SHOW_MODAL: {
            return {...state, showModal: true};
        }

        case types.CLOSE_MODAL: {
            return {...state, showModal: false};
        }
            
        default:
            return state;  
    }
}
