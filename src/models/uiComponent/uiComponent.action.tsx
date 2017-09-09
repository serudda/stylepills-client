/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../../constants/action.types';


/************************************/
/*            INTERFACES            */
/************************************/
export interface IGetUiComponentAction {
    type: types.GET_UICOMPONENT;
}

export interface IGetUiComponentSuccessAction {
    type: types.GET_UICOMPONENT_FULFILLED;
    payload: any;
}

export interface IGetUiComponentErrorAction {
    type: types.GET_UICOMPONENT_ERROR;
    payload: any;
}

type Action = IGetUiComponentAction 
            | IGetUiComponentSuccessAction 
            | IGetUiComponentErrorAction;


/************************************/
/*             ACTIONS              */
/************************************/


/**
 * getUiComponentAction
 * @description - Return an action type, GET_UICOMPONENT 
 * to indicate that app requests ui components list
 * @function
 * @return {void}
*/
export const getUiComponentAction = (): Action => {
    return {
        type: types.GET_UICOMPONENT
    }
};


/**
 * getUiComponentSuccessAction
 * @description - Return an action type, GET_UICOMPONENT_FULFILLED 
 * and the ui components list from database
 * @function
 * @return {void}
*/
export const getUiComponentSuccessAction = ({payload}:any): Action => {
    return {
        type: types.GET_UICOMPONENT_FULFILLED,
        payload
    }
};


/**
 * getUiComponentErrorAction
 * @description - Return an action type, GET_UICOMPONENT_ERROR 
 * and the error message
 * @function
 * @return {void}
*/
export const getUiComponentErrorAction = ({payload}:any): Action => ({
    type: types.GET_UICOMPONENT_ERROR,
    payload
});

