/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/ui.action';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IUiState {
    modals: {
        modalType: string,
        modalProps: any
    };
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IUiState = {
    modals: null
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
            return {
                ...state, 
                modals: {
                    modalType: null,
                    modalProps: {}
                }
            };
        }

        case types.SHOW_MODAL: {
            return {
                ...state,
                modals: {
                    modalType: action.modals.modalType,
                    modalProps: action.modals.modalProps
                }
            };
        }

        case types.CLOSE_MODAL: {
            return {
                ...state, 
                modals: null
            };
        }
            
        default:
            return state;  
    }
}
