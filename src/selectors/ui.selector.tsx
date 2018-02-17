/************************************/
/*           DEPENDENCIES           */
/************************************/

// import { createSelector } from 'reselect';
import { IRootState } from '../reducer/reducer.config';

// -----------------------------------


/* 
    LISTS SELECTORS
    state: lists
*/
export const getColorList = (state: IRootState) => state.ui.lists.colorsList;