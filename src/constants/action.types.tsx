/**
 * @desc Action Types 
 * Naming convention: 
 * <VERB>_<NOUN>
 * e.g. GET_UICOMPONENT, ADD_TODO, GET_UICOMPONENT_FULFILLED
 * @type constants
 */

export const GET_UICOMPONENT = 'GET_UICOMPONENT';
export type GET_UICOMPONENT = typeof GET_UICOMPONENT;

export const GET_UICOMPONENT_FULFILLED = 'GET_UICOMPONENT_FULFILLED';
export type GET_UICOMPONENT_FULFILLED = typeof GET_UICOMPONENT_FULFILLED;

export const GET_UICOMPONENT_ERROR = 'GET_UICOMPONENT_ERROR';
export type GET_UICOMPONENT_ERROR = typeof GET_UICOMPONENT_ERROR;



/*
 * Es necesario crear un 'type' a cada constante si queremos asignarla despues a una interface
 *      export interface getUiComponent {
 *          type: types.GET_UICOMPONENT;
 *      }
 * 
 * Si no lo creamos, al querer hacer - type: types.GET_UICOMPONENT; daria error:
 * 
 * Namespace '"/Users/sergioruizdavila/Documents/Projects/react-redux-typescript/src/constants/action.types"' 
 * has no exported member 'GET_UICOMPONENT'.
 * 
 */