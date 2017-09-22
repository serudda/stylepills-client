/* TODO: Analizar que vamos a hacer con las actions, reducers, sagas. Si vamos
viendo la necesidad de gestionar algunos estados con nuestro propio metodo, 
mantenemos estos archivos, de lo contrario los eliminamos 
NOTE: Este archivo no se reviso y se limpio */

/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../../constants/action.types';
import * as model from './colorPalette.model';


/************************************/
/*            INTERFACES            */
/************************************/
export interface IGetColorPaletteAction {
    type: types.GET_COLORPALETTE;
}

export interface IGetColorPaletteSuccessAction {
    type: types.GET_COLORPALETTE_FULFILLED;
    payload: Array<model.ColorPalette>;
}

export interface IGetColorPaletteErrorAction {
    type: types.GET_COLORPALETTE_ERROR;
    payload: any;
}

export type Action = 
    // API Requests
    IGetColorPaletteAction 
|   IGetColorPaletteSuccessAction 
|   IGetColorPaletteErrorAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, GET_COLORPALETTE 
 * to indicate that app requests color palette list
 * @function getColorPaletteAction
 * @returns {Action}
 */
export const getColorPaletteAction = (): Action => {
    return {
        type: types.GET_COLORPALETTE
    };
};


/**
 * @desc Return an action type, GET_COLORPALETTE_FULFILLED 
 * and the color palette list from database
 * @function getColorPaletteSuccessAction
 * @param {Array<model.UiComponent>} {payload}
 * @returns {Action}
 */
export const getColorPaletteSuccessAction = (payload: Array<model.ColorPalette>): Action => {
    return {
        type: types.GET_COLORPALETTE_FULFILLED,
        payload
    };
};


/**
 * @desc Return an action type, GET_UICOMPONENT_ERROR 
 * and the error message
 * @function getColorPaletteErrorAction
 * @param {*} {payload}
 * @returns {Action}
 * FIXME: Especificar que parametro recibe: un payload? un mensaje de error?
 * Después de eso, tiparlo.
 */
export const getColorPaletteErrorAction = ({payload}: any): Action => {
    return {
        type: types.GET_COLORPALETTE_ERROR,
        payload
    }; 
};

