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

export interface IOpenModalAction {
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
|   IOpenModalAction
|   ICloseModalAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_UI to reset UI states
 * @function clearUi
 * @returns {Action}
 */
export const clearUi = (): Action => {
    return {
        type: types.CLEAR_UI,
        showModal: false
    };
};


/**
 * @desc Return an action type, OPEN_MODAL 
 * to indicate that user wants opening a Modal
 * @function openModal
 * @returns {Action}
 */
export const openModal = (): Action => {
    return {
        type: types.SHOW_MODAL,
        showModal: true
    };
};


/**
 * @desc Return an action type, CLOSE_MODAL
 * to indicate that user wants closing a Modal
 * @function closeModal
 * @returns {Action}
 */
export const closeModal = (): Action => {
    return {
        type: types.CLOSE_MODAL,
        showModal: false
    };
};