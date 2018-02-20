/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as uuid from 'uuid/v4';
import { schema, normalize } from 'normalizr';
import { groupBy, mapValues } from 'lodash';

import { functionsUtil } from './../core/utils/functionsUtil';

import { 
    ColorListItem, 
    LibListItem, LibsList
} from './../reducer/ui.reducer';

import { Lib as LibModel } from './../models/lib/lib.model';


// -----------------------------------


// =================================================================
//         LISTS SCHEMAS ===========================================
//         state: lists.colorsList =================================
// =================================================================

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


/* COLORS LISTS NORMALIZER FUNCTIONS */
export const colorsListNormalized = (colorsResult: Array<ColorListItem>) => normalize(colorsResult, colorsListSchema);


// =================================================================
//         LISTS SCHEMAS ===========================================
//         state: lists.libsList ===================================
// =================================================================

/* LIBS LISTS NORMALIZER FUNCTIONS */
export const libsListNormalized = (libsResult: Array<LibModel> = []): LibsList => {

    if (libsResult.length === 0 ) {
        return { css: [] };
    }

    // Create lib copy
    let libsResultCopy: Array<LibModel> = functionsUtil.copyArray(libsResult);

    // Add tempId prop to each inner object
    let newLibsResult: Array<LibListItem> = libsResultCopy.map(
        (item: LibModel) => {
            let copyObj: LibListItem = functionsUtil.updateObject(item); 
            copyObj.tempId  = uuid();
            return copyObj;
        }
    );

    // Remove props that libsList State does not need
    let libListRemoved: Array<LibListItem> = functionsUtil.deletePropInCollection(newLibsResult, 'project', 'atom');

    // Turn array into Object
    let libListGrouped: LibsList = mapValues(groupBy(libListRemoved, 'type'));
    
    return libListGrouped;
};