/**
 * @desc Action Types 
 * Naming convention: 
 * <VERB>_<NOUN>
 * e.g. GET_UICOMPONENT, ADD_TODO, GET_UICOMPONENT_FULFILLED
 * @type constants
 */


/* UI Actions Type */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export type LOCATION_CHANGE = typeof LOCATION_CHANGE;

export const CLEAR_UI = 'CLEAR_UI';
export type CLEAR_UI = typeof CLEAR_UI;

export const SHOW_MODAL = 'SHOW_MODAL';
export type SHOW_MODAL = typeof SHOW_MODAL;

export const CLOSE_MODAL = 'CLOSE_MODAL';
export type CLOSE_MODAL = typeof CLOSE_MODAL;

export const CHANGE_ATOM_DETAILS_TAB = 'CHANGE_ATOM_DETAILS_TAB';
export type CHANGE_ATOM_DETAILS_TAB = typeof CHANGE_ATOM_DETAILS_TAB;

export const CHANGE_SOURCE_CODE_TAB = 'CHANGE_SOURCE_CODE_TAB';
export type CHANGE_SOURCE_CODE_TAB = typeof CHANGE_SOURCE_CODE_TAB;

export const COPY_SOURCE_CODE = 'COPY_SOURCE_CODE';
export type COPY_SOURCE_CODE = typeof COPY_SOURCE_CODE;

export const DUPLICATE_ATOM_REQUEST = 'DUPLICATE_ATOM_REQUEST';
export type DUPLICATE_ATOM_REQUEST = typeof DUPLICATE_ATOM_REQUEST;
export const DUPLICATE_ATOM_SUCCESS = 'DUPLICATE_ATOM_SUCCESS';
export type DUPLICATE_ATOM_SUCCESS = typeof DUPLICATE_ATOM_SUCCESS;
export const DUPLICATE_ATOM_FAILURE = 'DUPLICATE_ATOM_FAILURE';
export type DUPLICATE_ATOM_FAILURE = typeof DUPLICATE_ATOM_FAILURE;

/* Auth Actions Type */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export type LOGIN_REQUEST = typeof LOGIN_REQUEST;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export type LOGOUT_REQUEST = typeof LOGOUT_REQUEST;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export type LOGOUT_SUCCESS = typeof LOGOUT_SUCCESS;
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export type LOGOUT_FAILURE = typeof LOGOUT_FAILURE;

/* Search Actions Type */
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export type CLEAR_SEARCH = typeof CLEAR_SEARCH;
export const SEARCH_ATOMS = 'SEARCH_ATOMS';
export type SEARCH_ATOMS = typeof SEARCH_ATOMS;

/* Pagination Actions Type */
export const CLEAR_PAGINATION = 'CLEAR_PAGINATION';
export type CLEAR_PAGINATION = typeof CLEAR_PAGINATION;
export const NEXT_PAGE_ATOMS = 'NEXT_PAGE_ATOMS';
export type NEXT_PAGE_ATOMS = typeof NEXT_PAGE_ATOMS;
export const PREV_PAGE_ATOMS = 'PREV_PAGE_ATOMS';
export type PREV_PAGE_ATOMS = typeof PREV_PAGE_ATOMS;

/* Atom Actions Type */
export const CLEAR_ATOM_STATE = 'CLEAR_ATOM_STATE';
export type CLEAR_ATOM_STATE = typeof CLEAR_ATOM_STATE;
export const EDIT_ATOM_REQUEST = 'EDIT_ATOM_REQUEST';
export type EDIT_ATOM_REQUEST = typeof EDIT_ATOM_REQUEST;
export const ATOM_DETAILS_CHANGED = 'ATOM_DETAILS_CHANGED';
export type ATOM_DETAILS_CHANGED = typeof ATOM_DETAILS_CHANGED;


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