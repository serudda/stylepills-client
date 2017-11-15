/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../constants/action.types';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IClearUiAction {
    type: types.CLEAR_UI;
    showModal: boolean;
}

export interface IShowModalAction {
    type: types.SHOW_MODAL;
    showModal: boolean;
}

export interface ICloseModalAction {
    type: types.CLOSE_MODAL;
    showModal: boolean;
}


export type Action = 
    // UI interaction
    IClearUiAction
|   IShowModalAction
|   ICloseModalAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_UI to reset UI states
 * @function clearUiAction
 * @returns {Action}
 */
export const clearUiAction = (): Action => {
    return {
        type: types.CLEAR_UI,
        showModal: false
    };
};


/**
 * @desc Return an action type, SHOW_MODAL 
 * to indicate that user wants opening a Modal
 * @function showModalAction
 * @returns {Action}
 */
export const showModalAction = (): Action => {
    return {
        type: types.SHOW_MODAL,
        showModal: true
    };
};


/**
 * @desc Return an action type, CLOSE_MODAL
 * to indicate that user wants closing a Modal
 * @function closeModalAction
 * @returns {Action}
 */
export const closeModalAction = (): Action => {
    return {
        type: types.CLOSE_MODAL,
        showModal: false
    };
};