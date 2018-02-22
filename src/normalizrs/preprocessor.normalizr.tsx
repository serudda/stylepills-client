/********************************/
/*         DEPENDENCIES         */
/********************************/
import { schema, normalize } from 'normalizr';

import { Preprocessor as PreprocessorModel } from './../models/preprocessor/preprocessor.model';


// -----------------------------------


// =================================================================
//         PREPROCESSOR SCHEMAS ====================================
//         state: preprocessorState.preprocessorsList ==============
// =================================================================

/**
 * @desc Return a Preprocessor entity schema on preprocessorsList store state
 * @function preprocessorSchema
 * @returns {schema.Entity}
 */
export const preprocessorSchema = new schema.Entity('preprocessor', {}, {
    idAttribute: 'id'
});

/**
 * @desc Represent Preprocessor List entity schema of preprocessorsList store state
 * @function preprocessorsListSchema
 * @returns {Array<schema.Entity>}
 */
export const preprocessorsListSchema = [preprocessorSchema];


/* PREPROCESSORS LISTS NORMALIZER FUNCTIONS */
export const preprocessorsListNormalized = (preprocessorsResult: Array<PreprocessorModel>) => normalize(preprocessorsResult, preprocessorsListSchema);