/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as Validator from 'validator';
import { isEmpty } from 'lodash';

import { Color as ColorModel } from './../../models/color/color.model';

// -----------------------------------

/******************************************/
/*            FORM INTERFACES             */
/******************************************/
export interface IProjectFormFields {
    authorId: number;
    name: string;
    description: string;
    website: string;
    colorPalette: Array<ColorModel>;
    private: boolean;
    projectCategoryId: number;
}

export interface IValidationError {
    authorId?: string;
    name?: string;
    website?: string;
    private?: string;
    projectCategoryId?: string;
    colorPalette?: string;
}

export interface IValidationResponse {
    errors?: IValidationError; 
    isValid: boolean;
}


/******************************************/
/*        VALIDATE INPUTS (PROJECT)       */
/******************************************/
export default function validateInput(field: IProjectFormFields): IValidationResponse {

    let errors: IValidationError = {};

    if (Validator.isNull(field.authorId.toString())) {
        errors.authorId = 'Author is required';
    }
    if (Validator.isNull(field.name)) {
        errors.name = 'This field is required';
    }
    if (Validator.isURL(field.website)) {
        errors.website = 'This value is not a valid url';
    }
    if (Validator.isNull(field.private.toString())) {
        errors.private = 'Private is required';
    }
    if (Validator.isNull(field.projectCategoryId.toString())) {
        errors.projectCategoryId = 'Project category is required';
    }
    if (field.colorPalette === null) {
        errors.colorPalette = 'Color palette is required';
    }
  
    return {
        errors,
        isValid: isEmpty(errors)
    };

}