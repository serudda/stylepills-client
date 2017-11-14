/**
 * @desc Action Types 
 * Naming convention: 
 * <VERB>_<NOUN>
 * e.g. GET_UICOMPONENT, ADD_TODO, GET_UICOMPONENT_FULFILLED
 * @type constants
 */


/* UI Actions Type */
export const CLEAR_UI = 'CLEAR_UI';
export type CLEAR_UI = typeof CLEAR_UI;

export const SHOW_MODAL = 'SHOW_MODAL';
export type SHOW_MODAL = typeof SHOW_MODAL;

export const CLOSE_MODAL = 'CLOSE_MODAL';
export type CLOSE_MODAL = typeof CLOSE_MODAL;

/* Auth Actions Type */
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export type SET_CURRENT_USER = typeof SET_CURRENT_USER;

/* Search Actions Type */
export const SEARCH_ATOMS = 'SEARCH_ATOMS';
export type SEARCH_ATOMS = typeof SEARCH_ATOMS;


/* Pagination Actions Type */
export const NEXT_PAGE_ATOMS = 'NEXT_PAGE_ATOMS';
export type NEXT_PAGE_ATOMS = typeof NEXT_PAGE_ATOMS;

export const PREV_PAGE_ATOMS = 'PREV_PAGE_ATOMS';
export type PREV_PAGE_ATOMS = typeof PREV_PAGE_ATOMS;



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