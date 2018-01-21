/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as Validator from 'validator';
import { isEmpty } from 'lodash';


// -----------------------------------

/******************************************/
/*            FORM INTERFACES             */
/******************************************/
export interface IAtomFormFields {
    authorId: number;
    name: string;
    description: string;
    html: string;
    css: string;
    contextualBg: string;
    projectId: number;
    atomCategoryId: number;
    private: boolean;
}

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

export interface IValidationResponse {
    errors?: IValidationError; 
    isValid: boolean;
}


/******************************************/
/*        VALIDATE INPUTS (PROJECT)       */
/******************************************/
export default function validateInput(field: IAtomFormFields): IValidationResponse {

    let errors: IValidationError = {};

    if (Validator.isNull(field.authorId.toString())) {
        errors.authorId = 'Author is required';
    }
    if (Validator.isNull(field.name)) {
        errors.name = 'This field is required';
    }
    if (Validator.isNull(field.html)) {
        errors.html = 'This field is required';
    }
    if (Validator.isNull(field.css)) {
        errors.css = 'This field is required';
    }
    if (Validator.isHexColor(field.contextualBg)) {
        errors.contextualBg = 'Context background should be Hex color';
    }
    if (field.projectId === 0) {
        errors.projectId = 'Project associated does not exist';
    }
    if (Validator.isNull(field.atomCategoryId.toString())) {
        errors.atomCategoryId = 'Category is required';
    }
    if (Validator.isNull(field.private.toString())) {
        errors.private = 'Private is required';
    }
  
    return {
        errors,
        isValid: isEmpty(errors)
    };

}