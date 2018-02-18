/********************************/
/*         DEPENDENCIES         */
/********************************/

import { schema, normalize } from 'normalizr';

import { ColorListItem } from './../reducer/ui.reducer';


// -----------------------------------


// =================================================================
//         UI STATES SCHEMAS =======================================
// =================================================================

/* 
    LISTS SCHEMAS
    state: lists.colorsList
*/

/**
 * @desc Return a Rgba entity schema on colorsList store state
 * @function rgbaSchema
 * @returns {schema.Entity}
 */
export const rgbaSchema = new schema.Entity('rgba', {}, {
    idAttribute: 'tempId'
});

/**
 * @desc Return a Color entity schema on colorsList store state
 * @function colorSchema
 * @returns {schema.Entity}
 */
export const colorSchema = new schema.Entity('colors', {
    rgba: rgbaSchema
}, {
    idAttribute: 'tempId'
});

/**
 * @desc Represent Color List entity schema of colorsList store state
 * @function colorsListSchema
 * @returns {Array<schema.Entity>}
 */
export const colorsListSchema = [colorSchema];


// ===============================================
//   Colors List Normalized ======================
// ===============================================
export const colorsListNormalized = (colorsResult: Array<ColorListItem>) => normalize(colorsResult, colorsListSchema);