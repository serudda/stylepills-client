/************************************/
/*           DEPENDENCIES           */
/************************************/
import { createSelector } from 'reselect';

import { IRootState } from './../reducer/reducer.config';

import {
    Preprocessor as PreprocessorModel, 
} from './../models/preprocessor/preprocessor.model';
import {
    Lib as LibModel
} from './../models/lib/lib.model';

import { 
    Option as CodeTabMenuOption 
} from './../app/components/Tabs/CodeTabMenu/CodeTabMenu';

// -----------------------------------

// =================================================================
//      PREPROCESSOR STATES SELECTORS ==============================
// =================================================================

/* 
    LISTS SELECTORS
    state: preprocessor.currentPreprocessor
*/

/**
 * @desc Get currentPreprocessor from state store
 * @function getCurrentPreprocessor
 * @returns {PreprocessorModel}
 */
export const getCurrentPreprocessor = (state: IRootState): PreprocessorModel => state.preprocessor.currentPreprocessor;
