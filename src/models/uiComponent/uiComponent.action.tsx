/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../../constants/action.types';
import * as model from './uiComponent.model';


/************************************/
/*            INTERFACES            */
/************************************/
export interface IGetUiComponentAction {
    type: types.GET_UICOMPONENT;
}

export interface IGetUiComponentSuccessAction {
    type: types.GET_UICOMPONENT_FULFILLED;
    payload: Array<model.UiComponent>;
}

export interface IGetUiComponentErrorAction {
    type: types.GET_UICOMPONENT_ERROR;
    payload: any;
}

export type Action = 
    // API Requests
    IGetUiComponentAction 
|   IGetUiComponentSuccessAction 
|   IGetUiComponentErrorAction;



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
export const getUiComponentSuccessAction = (payload: Array<model.UiComponent>): Action => {
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

