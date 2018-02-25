/************************************/
/*           DEPENDENCIES           */
/************************************/
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as appConfig from './../core/constants/app.constants';
import { INormalizedResult } from '../core/interfaces/interfaces';

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
export const getPreprocessorsList = (state: IRootState): INormalizedResult => state.preprocessorState.preprocessorsList;


/**
 * @desc Get preprocessorsList denormalized to send to DB
 * @function getPreprocessorsListDenormalized
 * @returns {INormalizedResult}
 */
export const getPreprocessorsListDenormalized = createSelector(
    getPreprocessorsList,
    (preprocessorsList) => {

        // Generate a copy
        const listCopy: INormalizedResult = functionsUtil.updateObject(preprocessorsList);

        // Denormalize list
        const listDenormalized = denormalize(listCopy.result, preprocessorsListSchema, listCopy.entities);

        return listDenormalized;
    }
);


/**
 * @desc Get preprocessorsList putting source code default option on first position
 * @function getPreprocessorsListWithDefault
 * @returns {Array<LibModel>}
 */
export const getPreprocessorsListWithDefault = createSelector(
    getPreprocessorsListDenormalized,
    (preprocessorsList) => {

        // Re order preprocessors list putting source code default option on first position
        let newPreprocessorsList = functionsUtil.moveElementToFirstPosition(preprocessorsList, 'type', appConfig.SOURCE_CODE_DEFAULT_OPTION_TAB);

        return newPreprocessorsList;
    }
);