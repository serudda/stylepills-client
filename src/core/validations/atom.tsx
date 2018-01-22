/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as Validator from 'validator';
import { isEmpty } from 'lodash';


// -----------------------------------

/******************************************/
/*            FORM INTERFACES             */
/******************************************/

/* Basic Info Step */
export type BasicFields = {
    name: string;
    description?: string;
    html: string;
    css: string;
    contextualBg: string;
    projectId: number | null;
    atomCategoryId: number;
    private: boolean;
};

/* Fields without an especific Step */
export type OtherFields = {
    authorId: number;
};

/* Every field of Atom Forms */
// NOTE: 1
export type AtomFormFields = 
    Partial<BasicFields> & 
    Partial<OtherFields>;

/* Message error of each field */
export interface IValidationError {
    authorId?: string;
    name?: string;
    html?: string;
    css?: string;
    contextualBg?: string;
    projectId?: string;
    atomCategoryId?: string;
    private?: string;
}

/* Validation response */
export interface IValidationResponse {
    errors?: IValidationError; 
    isValid: boolean;
}


/******************************************/
/*         VALIDATE INPUTS (ATOM)         */
/******************************************/

/**
 * @desc Validate fields on BasicFields Step
 * @function validateBasicFields
 * @param {BasicFields} field - fields on BasicFields Step
 * @returns {IValidationResponse} errors, isValid
 */
export function validateBasicFields(field: BasicFields): IValidationResponse {

    let errors: IValidationError = {};

    /* Atom Name */
    if (Validator.isEmpty(field.name)) {
        errors.name = 'This field is required';
    }

    /* Atom Html */
    if (Validator.isEmpty(field.html)) {
        errors.html = 'This field is required';
    }

    /* Atom Css */
    if (Validator.isEmpty(field.css)) {
        errors.css = 'This field is required';
    }

    /* Atom contextual background */
    if (!Validator.isHexColor(field.contextualBg)) {
        errors.contextualBg = 'Context background should be Hex color';
    }

    /* Project parent id */
    if (field.projectId === 0) {
        errors.projectId = 'Project associated does not exist';
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