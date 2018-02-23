/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';

import { client } from './../index';

import { 
    Preprocessor as PreprocessorModel,
    PreprocessorTypeOptions
} from './../models/preprocessor/preprocessor.model';

import { 
    GET_PREPROCESSOR_BY_ID_QUERY,
    GET_ALL_PREPROCESSORS_QUERY
} from './../models/preprocessor/preprocessor.query';

import { 
    sassCompilerService, 
    IResponse as SassCompilerResponse } from './../core/services/compilers/sassCompiler.service';
import { preprocessorsListNormalized } from './../normalizrs/preprocessor.normalizr';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IClearPreprocessorStateAction {
    type: types.CLEAR_PREPROCESSOR_STATE;
}

export interface IChangePreprocessorAction {
    type: types.CHANGE_PREPROCESSOR;
    preprocessorId: number | string;
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


export interface IRequestGetPreprocessorsAction {
    type: types.GET_PREPROCESSORS_REQUEST;
}

export interface IReceiveGetPreprocessorsAction {
    type: types.GET_PREPROCESSORS_SUCCESS;
    preprocessors: {entities: any, result: any};
}

export interface IGetPreprocessorsFailureAction {
    type: types.GET_PREPROCESSORS_FAILURE;
    message: string;
}


export type Action =
    // Preprocessor interaction
    IClearPreprocessorStateAction
|   IChangePreprocessorAction
|   IRequestCompileCodeAction
|   IReceiveCompileCodeAction
|   ICompileCodeFailureAction
|   IRequestGetPreprocessorsAction
|   IReceiveGetPreprocessorsAction
|   IGetPreprocessorsFailureAction;



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
 * @param {number | string} preprocessorId - preprocessor id
 * @returns {Action}
 */
export const changePreprocessorAction = (preprocessorId: number | string): Action => {
    return {
        type: types.CHANGE_PREPROCESSOR,
        preprocessorId
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
 * @desc Return an action type, GET_PREPROCESSORS_REQUEST to start getting process
 * @function requestGetPreprocessorsAction
 * @returns {Action}
 */
export const requestGetPreprocessorsAction = (): Action => {
    return {
        type: types.GET_PREPROCESSORS_REQUEST
    };
};


/**
 * @desc Return an action type, GET_PREPROCESSORS_SUCCESS after a successful getting process
 * @function receiveGetPreprocessorsAction
 * @returns {Action}
 */
export const receiveGetPreprocessorsAction = (preprocessors: Array<PreprocessorModel>): Action => {
    return {
        type: types.GET_PREPROCESSORS_SUCCESS,
        preprocessors: preprocessorsListNormalized(preprocessors)
    };
};


/**
 * @desc Return an action type, GET_PREPROCESSORS_FAILURE after a failure getting process
 * @function getPreprocessorsFailureAction 
 * @param {string} message - Error message
 * @returns {Action}
 */
export const getPreprocessorsFailureAction = (message: string): Action => {
    return {
        type: types.GET_PREPROCESSORS_FAILURE,
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
                return sassCompilerService.compile(code).then(_compileCodeResponse(preprocessor, code, dispatch));
            default:
                return null;
        }

    };

};

const _compileCodeResponse = (preprocessor: PreprocessorTypeOptions, code: string, dispatch: Function) => 
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


/**
 * @desc Get All Preprocessors Action
 * @function getAllPreprocessorsAction
 * @returns {Promise<any>}
 */
export const getAllPreprocessorsAction = () => {
    return (dispatch: Function): Promise<any> => {

        return client.query({
            query: GET_ALL_PREPROCESSORS_QUERY
        }).then(
            (response: any) => {
                let { error, allPreprocessors } = response.data;
                const DEFAULT_PREPROCESSOR = 1;

                if (error) {

                    // Failure
                    dispatch(getPreprocessorsFailureAction(error));

                    return {
                        ok: false,
                        message: 'Something wrong'
                    };

                }

                // Got them Successful
                dispatch(receiveGetPreprocessorsAction(allPreprocessors));

                // Assign a default current Preprocessor
                dispatch(changePreprocessorAction(DEFAULT_PREPROCESSOR));

                return {
                    ok: true,
                    results: allPreprocessors
                };

            }
        ).catch(
            (response) => {
                // Failure
                dispatch(getPreprocessorsFailureAction(response));

                return response;
            }
        );

    };

};


/**
 * @desc Get Preprocessor by Id Action
 * @function getPreprocessorByIdAction
 * @param {number} id - preprocessor id
 * @returns {Promise<any>}
 */
export const getPreprocessorByIdAction = (id: number) => {
    return (dispatch: Function): Promise<any> => {

        return client.query({
            query: GET_PREPROCESSOR_BY_ID_QUERY,
            variables: { id }
        }).then(
            (response: any) => {
                let { error, getPreprocessorById } = response.data;
        
                if (error) {
                    return {
                        ok: false,
                        message: 'Something wrong'
                    };
                }

                return {
                    ok: true,
                    results: getPreprocessorById
                };
            }
        ).catch(
            (response) => {
                console.log('getPreprocessorByIdAction error: ', response);
                return {
                    ok: false,
                    message: response
                };
            }
        );

    };

};