/* TODO: Analizar que vamos a hacer con las actions, reducers, sagas. Si vamos
viendo la necesidad de gestionar algunos estados con nuestro propio metodo, 
mantenemos estos archivos, de lo contrario los eliminamos 
NOTE: Este archivo no se reviso y se limpio */

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
    payload: model.UiComponent;
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
 * @desc Return an action type, GET_UICOMPONENT 
 * to indicate that app requests ui components list
 * @function getUiComponentAction
 * @returns {Action}
 */
export const getUiComponentAction = (): Action => {
    return {
        type: types.GET_UICOMPONENT
    };
};


/**
 * @desc Return an action type, GET_UICOMPONENT_FULFILLED 
 * and the ui components list from database
 * @function getUiComponentSuccessAction
 * @param {Array<model.UiComponent>} {payload}
 * @returns {Action}
 */
export const getUiComponentSuccessAction = (payload: model.UiComponent): Action => {
    return {
        type: types.GET_UICOMPONENT_FULFILLED,
        payload
    };
};


/**
 * @desc Return an action type, GET_UICOMPONENT_ERROR 
 * and the error message
 * @function getUiComponentErrorAction
 * @param {*} {payload}
 * @returns {Action}
 * FIXME: Especificar que parametro recibe: un payload? un mensaje de error?
 * Después de eso, tiparlo.
 */
export const getUiComponentErrorAction = ({payload}: any): Action => {
    return {
        type: types.GET_UICOMPONENT_ERROR,
        payload
    }; 
};

