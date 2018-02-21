/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';

import { 
    Preprocessor as PreprocessorModel,
    PreprocessorTypeOptions
} from './../models/preprocessor/preprocessor.model';

import { 
    sassCompilerService, 
    IResponse as SassCompilerResponse } from './../core/services/compilers/sassCompiler.service';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IClearPreprocessorStateAction {
    type: types.CLEAR_PREPROCESSOR_STATE;
}

export interface IChangePreprocessorAction {
    type: types.CHANGE_PREPROCESSOR;
    preprocessor: PreprocessorModel;
}

export interface IRequestCompileCodeAction {
    type: types.COMPILE_CODE_REQUEST;
    preprocessor: PreprocessorTypeOptions;
    isCompiled: boolean;
}

export interface IReceiveCompileCodeAction {
    type: types.COMPILE_CODE_SUCCESS;
    preprocessor: PreprocessorTypeOptions;
    code: string;
    resultCode: string;
    isCompiled: boolean;
}

export interface ICompileCodeFailureAction {
    type: types.COMPILE_CODE_FAILURE;
    isCompiled: boolean;
    message: string;
}


export type Action =
    // Preprocessor interaction
    IClearPreprocessorStateAction
|   IChangePreprocessorAction
|   IRequestCompileCodeAction
|   IReceiveCompileCodeAction
|   ICompileCodeFailureAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_PREPROCESSOR_STATE to reset Preprocessor states
 * @function clearPreprocessorStateAction
 * @returns {Action}
 */
export const clearPreprocessorStateAction = (): Action => {
    return {
        type: types.CLEAR_PREPROCESSOR_STATE
    };
};



/**
 * @desc Return an action type, CHANGE_PREPROCESSOR 
 * to indicate that user wants to change color on colorPicker
 * @function changePreprocessorAction
 * @param {PreprocessorModel} preprocessor - new preprocessor object
 * @returns {Action}
 */
export const changePreprocessorAction = (preprocessor: PreprocessorModel): Action => {
    return {
        type: types.CHANGE_PREPROCESSOR,
        preprocessor
    };
};


/**
 * @desc Return an action type, COMPILE_CODE_REQUEST to start creation process
 * @function requestCompileCodeAction
 * @returns {Action}
 */
export const requestCompileCodeAction = (preprocessor: PreprocessorTypeOptions): Action => {
    return {
        type: types.COMPILE_CODE_REQUEST,
        preprocessor,
        isCompiled: false
    };
};


/**
 * @desc Return an action type, COMPILE_CODE_SUCCESS after a successful creation process
 * @function receiveCompileCodeAction
 * @returns {Action}
 */
export const receiveCompileCodeAction = (preprocessor: PreprocessorTypeOptions, code: string, resultCode: string): Action => {
    return {
        type: types.COMPILE_CODE_SUCCESS,
        preprocessor,
        code,
        resultCode,
        isCompiled: true
    };
};


/**
 * @desc Return an action type, COMPILE_CODE_FAILURE after a failure compilation process
 * @function compileCodeFailureAction
 * @param {string} message - Error message
 * @returns {Action}
 */
export const compileCodeFailureAction = (message: string): Action => {
    return {
        type: types.COMPILE_CODE_FAILURE,
        isCompiled: false,
        message
    };
};

/**
 * @desc Compile Code Action
 * @function compileCodeAction
 * @param {CreateProjectInput} input - create project input data
 * @returns {Promise<any>}
 */
export const compileCodeAction = (preprocessor: PreprocessorTypeOptions, code: string) => {
    return (dispatch: Function): Promise<SassCompilerResponse> => {

        // Request Compile Code
        dispatch(requestCompileCodeAction(preprocessor));
        
        switch (preprocessor) {
            case PreprocessorTypeOptions.sass:
                return sassCompilerService.compile(code).then(_responseFunction(preprocessor, code, dispatch));
            default:
                return null;
        }

    };

};

const _responseFunction = (preprocessor: PreprocessorTypeOptions, code: string, dispatch: Function) => 
    (response: SassCompilerResponse) => {
        let { ok, message, text } = response;

        if (ok) {
            // Created Successful
            dispatch(receiveCompileCodeAction(preprocessor, code, text));
        } else {
            // Created Failure
            dispatch(compileCodeFailureAction(message));
        }

        return {
            ok,
            message
        };
    };