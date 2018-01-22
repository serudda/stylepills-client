/************************************/
/*           DEPENDENCIES           */
/************************************/
import { isEmpty } from 'lodash';
import * as Validator from 'validator';

import { functionsUtil } from './../utils/functionsUtil';

import { Color as ColorModel, ColorTypeOptions } from './../../models/color/color.model';

// -----------------------------------

/******************************************/
/*            FORM INTERFACES             */
/******************************************/

/* Basic Info Step */
export type BasicFields = {
    name: string,
    website?: string,
    description?: string,
    private: boolean
};

/* Color Palette Info Step */
export type ColorFields = {
    colorPalette: Array<ColorModel>
};

/* Fields without an especific Step */
export type OtherFields = {
    authorId: number;
    projectCategoryId: number;
};

/* Every field of Project Forms */
// NOTE: 1
export type ProjectFormFields =
    Partial<BasicFields> & 
    Partial<ColorFields> & 
    Partial<OtherFields>;

/* Message error of each field */
export interface IValidationError {
    authorId?: string;
    name?: string;
    website?: string;
    private?: string;
    projectCategoryId?: string;
    colorPalette?: string;
}

/* Validation response */
export interface IValidationResponse {
    errors?: IValidationError; 
    isValid: boolean;
}


/******************************************/
/*        VALIDATE INPUTS (PROJECT)       */
/******************************************/

/**
 * @desc Validate fields on BasicFields Step
 * @function validateBasicFields
 * @param {BasicFields} field - fields on BasicFields Step
 * @returns {IValidationResponse} errors, isValid
 */
export function validateBasicFields(field: BasicFields): IValidationResponse {

    let errors: IValidationError = {};

    /* Project Name */
    if (Validator.isEmpty(field.name)) {
        errors.name = 'This field is required';
    }

    /* Project Website */
    if (!Validator.isEmpty(field.website)) {
        if (!Validator.isURL(field.website)) {
            errors.website = 'This value is not a valid url';
        }
    }

    /* Is private */
    if (field.private === null) {
        errors.private = 'Private is required';
    }
  
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


/**
 * @desc Validate fields on ColorFields Step
 * @function validateColorFields
 * @param {OtherFields} field - fields on ColorFields Step
 * @returns {IValidationResponse} errors, isValid
 */
export function validateColorFields(field: ColorFields): IValidationResponse {

    let errors: IValidationError = {};

    /* Project's color palette */
    if (!field.colorPalette) {
        errors.colorPalette = 'Color palette is required';
    } else {
        if (!functionsUtil.valueExistsInArray(field.colorPalette, ColorTypeOptions.primary, 'type')) {
            errors.colorPalette = 'Primary color is required';
        }
    }
  
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


/**
 * @desc Validate fields on OtherFields Step
 * @function validateOtherFields
 * @param {OtherFields} field - fields on OtherFields Step
 * @returns {IValidationResponse} errors, isValid
 */
export function validateOtherFields(field: OtherFields): IValidationResponse {

    let errors: IValidationError = {};

    /* Author Id */
    if (!field.authorId) {
        errors.authorId = 'Author is required';
    }

    /* Project category */
    if (field.projectCategoryId === null) {
        errors.projectCategoryId = 'Category is required';
    }
  
    return {
        errors,
        isValid: isEmpty(errors)
    };
}



/*
    (1). Es la forma en la que podemos decir que "puede ser de un tipo o del otro", esto encaja 
    muy bien en los forms multi-step, ya que cuando estoy en el Step 1, y presiono "Next", ahi deberia
    validar solo los campos de ese paso 1. De esta manera puedo tener una interface o type que me
    muestra todos los campos del Form (ProjectFormFields), pero ademas se que campos tiene cada
    Step: (BasicFields, ColorFields, OtherFields).
*/