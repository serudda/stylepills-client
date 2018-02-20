/************************************/
/*           DEPENDENCIES           */
/************************************/
import { IRootState } from './../reducer/reducer.config';

// -----------------------------------

// =================================================================
//      AUTH STATES SELECTORS ======================================
// =================================================================

/* 
    LISTS SELECTORS
    state: auth.isAuthenticated
*/

/**
 * @desc Get isAuthenticated from state store
 * @function getIsAuthenticated
 * @returns {boolean}
 */
export const getIsAuthenticated = (state: IRootState): boolean => state.auth.isAuthenticated;
