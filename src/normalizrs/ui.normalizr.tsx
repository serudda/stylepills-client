/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as uuid from 'uuid/v4';
import { schema, normalize } from 'normalizr';
import { groupBy, mapValues } from 'lodash';

import { functionsUtil } from './../core/utils/functionsUtil';

import { 
    ColorListItem, 
    LibListItem, LibsList,
    SourceListItem
} from './../reducer/ui.reducer';

import { Lib as LibModel } from './../models/lib/lib.model';
import { Source as SourceModel } from './../models/source/source.model';


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



// =================================================================
//         LISTS SCHEMAS ===========================================
//         state: lists.sourcesList ================================
// =================================================================

/* SOURCES LISTS NORMALIZER FUNCTIONS */
export const sourcesListNormalized = (sourcesResult: Array<SourceModel> = []): Array<SourceListItem> => {

    // Create source copy
    let sourcesResultCopy: Array<SourceModel> = functionsUtil.copyArray(sourcesResult);

    // Add tempId prop to each inner object
    let newSourcesResult: Array<SourceListItem> = sourcesResultCopy.map(
        (item: SourceModel) => {
            let copyObj: SourceListItem = functionsUtil.updateObject(item); 
            copyObj.tempId  = uuid();
            return copyObj;
        }
    );

    // Remove props that libsList State does not need TODO: Remover cuando no se necesite
    // let libListRemoved: Array<LibListItem> = functionsUtil.deletePropInCollection(newLibsResult, 'project', 'atom');
    
    return newSourcesResult;
};