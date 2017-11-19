/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IClearUiAction {
    type: types.CLEAR_UI;
    modals: {
        type: string,
        show: boolean,
        props: any
    };
}

export interface IShowModalAction {
    type: types.SHOW_MODAL;
    modals: {
        modalType: string,
        modalProps: any
    };
}

export interface ICloseModalAction {
    type: types.CLOSE_MODAL;
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
        modals: {
            type: null,
            props: {},
            show: false
        }
    };
};


/**
 * @desc Return an action type, SHOW_MODAL 
 * to indicate that user wants opening a Modal
 * @function showModalAction
 * @returns {Action}
 */
export const showModalAction = (modalType: string, modalProps: any): Action => {
    return {
        type: types.SHOW_MODAL,
        modals: {
            modalType,
            modalProps
        }
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
        type: types.CLOSE_MODAL
    };
};