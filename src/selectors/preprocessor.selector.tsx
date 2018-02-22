/************************************/
/*           DEPENDENCIES           */
/************************************/
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { IRootState } from './../reducer/reducer.config';

import { functionsUtil } from './../core/utils/functionsUtil';

import {
    Preprocessor as PreprocessorModel, 
} from './../models/preprocessor/preprocessor.model';
import { preprocessorsListSchema } from './../normalizrs/preprocessor.normalizr';

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
export const getCurrentPreprocessor = (state: IRootState): PreprocessorModel => state.preprocessorState.currentPreprocessor;


/**
 * @desc Get preprocessorsList from state store
 * @function getPreprocessorsList
 * @returns {LibsList}
 */
export const getPreprocessorsList = (state: IRootState): {entities: any, result: any} => state.preprocessorState.preprocessorsList;


/**
 * @desc Get preprocessorsList denormalized to send to DB
 * @function getPreprocessorsListDenormalized
 * @returns {Array<LibModel>}
 */
export const getPreprocessorsListDenormalized = createSelector(
    getPreprocessorsList,
    (preprocessorsList) => {

        // Generate a copy
        const listCopy: {entities: any, result: any} = functionsUtil.updateObject(preprocessorsList);

        // Denormalize list
        const listDenormalized = denormalize(listCopy.result, preprocessorsListSchema, listCopy.entities);

        return listDenormalized;
    }
);