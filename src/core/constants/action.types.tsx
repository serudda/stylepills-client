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

export const CHANGE_ATOM_DETAILS_TAB = 'TABS::CHANGE_ATOM_DETAILS_TAB';
export type CHANGE_ATOM_DETAILS_TAB = typeof CHANGE_ATOM_DETAILS_TAB;

export const CHANGE_SOURCE_CODE_TAB = 'TABS::CHANGE_SOURCE_CODE_TAB';
export type CHANGE_SOURCE_CODE_TAB = typeof CHANGE_SOURCE_CODE_TAB;

export const CHANGE_LIBS_TAB = 'TABS::CHANGE_LIBS_TAB';
export type CHANGE_LIBS_TAB = typeof CHANGE_LIBS_TAB;

export const COPY_SOURCE_CODE = 'COPY_SOURCE_CODE';
export type COPY_SOURCE_CODE = typeof COPY_SOURCE_CODE;

export const CHANGE_SOURCE_CODE = 'SOURCE_CODE_PANEL::CHANGE_SOURCE_CODE';
export type CHANGE_SOURCE_CODE = typeof CHANGE_SOURCE_CODE;

export const CHANGE_COLOR = 'COLOR_PICKER::CHANGE_COLOR';
export type CHANGE_COLOR = typeof CHANGE_COLOR;

export const CHANGE_LIBS = 'EXTERNAL_LIBS_PANEL::CHANGE_LIBS';
export type CHANGE_LIBS = typeof CHANGE_LIBS;

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

/* Form Actions Type */
export const CLEAR_FORM = 'CLEAR_FORM';
export type CLEAR_FORM = typeof CLEAR_FORM;

export const NEXT_STEP_ATOM = 'NEXT_STEP_ATOM';
export type NEXT_STEP_ATOM = typeof NEXT_STEP_ATOM;
export const PREV_STEP_ATOM = 'PREV_STEP_ATOM';
export type PREV_STEP_ATOM = typeof PREV_STEP_ATOM;
export const SKIP_STEP_ATOM = 'SKIP_STEP_ATOM';
export type SKIP_STEP_ATOM = typeof SKIP_STEP_ATOM;

export const NEXT_STEP_PROJECT = 'NEXT_STEP_PROJECT';
export type NEXT_STEP_PROJECT = typeof NEXT_STEP_PROJECT;
export const PREV_STEP_PROJECT = 'PREV_STEP_PROJECT';
export type PREV_STEP_PROJECT = typeof PREV_STEP_PROJECT;
export const SKIP_STEP_PROJECT = 'SKIP_STEP_PROJECT';
export type SKIP_STEP_PROJECT = typeof SKIP_STEP_PROJECT;

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

export const CREATE_ATOM_REQUEST = 'CREATE_ATOM_REQUEST';
export type CREATE_ATOM_REQUEST = typeof CREATE_ATOM_REQUEST;
export const CREATE_ATOM_SUCCESS = 'CREATE_ATOM_SUCCESS';
export type CREATE_ATOM_SUCCESS = typeof CREATE_ATOM_SUCCESS;
export const CREATE_ATOM_FAILURE = 'CREATE_ATOM_FAILURE';
export type CREATE_ATOM_FAILURE = typeof CREATE_ATOM_FAILURE;

export const EDIT_ATOM_REQUEST = 'EDIT_ATOM_REQUEST';
export type EDIT_ATOM_REQUEST = typeof EDIT_ATOM_REQUEST;

export const ATOM_DETAILS_CHANGED = 'ATOM_DETAILS_CHANGED';
export type ATOM_DETAILS_CHANGED = typeof ATOM_DETAILS_CHANGED;

export const DUPLICATE_ATOM_REQUEST = 'DUPLICATE_ATOM_REQUEST';
export type DUPLICATE_ATOM_REQUEST = typeof DUPLICATE_ATOM_REQUEST;
export const DUPLICATE_ATOM_SUCCESS = 'DUPLICATE_ATOM_SUCCESS';
export type DUPLICATE_ATOM_SUCCESS = typeof DUPLICATE_ATOM_SUCCESS;
export const DUPLICATE_ATOM_FAILURE = 'DUPLICATE_ATOM_FAILURE';
export type DUPLICATE_ATOM_FAILURE = typeof DUPLICATE_ATOM_FAILURE;

/* Project Actions Type */
export const CLEAR_PROJECT_STATE = 'CLEAR_PROJECT_STATE';
export type CLEAR_PROJECT_STATE = typeof CLEAR_PROJECT_STATE;

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export type CREATE_PROJECT_REQUEST = typeof CREATE_PROJECT_REQUEST;
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export type CREATE_PROJECT_SUCCESS = typeof CREATE_PROJECT_SUCCESS;
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';
export type CREATE_PROJECT_FAILURE = typeof CREATE_PROJECT_FAILURE;

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