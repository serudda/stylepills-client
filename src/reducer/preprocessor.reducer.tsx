/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/preprocessor.action';

import { 
    Preprocessor as PreprocessorModel,
    PreprocessorTypeOptions
} from './../models/preprocessor/preprocessor.model';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IPreprocessorState {
    compiled: {
        preprocessor: PreprocessorTypeOptions,
        sourceCode?: string,
        compileToCode?: string,
        isCompiled: boolean
    };
    currentPreprocessor: PreprocessorModel;
    preprocessorsList: {
        entities: any,
        result: any, 
        loading: boolean
    };
    message?: string;
}


/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IPreprocessorState = {
    compiled: {
        preprocessor: null,
        sourceCode: null,
        compileToCode: null,
        isCompiled: false
    },
    currentPreprocessor: null,
    preprocessorsList: {
        entities: null,
        result: [],
        loading: false
    }
};

// -----------------------------------


/** 
 * @desc This function takes Preprocessor actions and return a new state 
 * @param {IPreprocessorState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IPreprocessorState} 
 */
export default function (state: IPreprocessorState = defaultState, action: Action): IPreprocessorState {

    switch (action.type) {

        /***********************************/
        /*           ATOM ACTIONS          */
        /***********************************/

        case types.CLEAR_PREPROCESSOR_STATE: {
            return {
                ...state,
                compiled: {
                    ...state.compiled,
                    sourceCode: null,
                    compileToCode: null,
                    isCompiled: false
                }
            };
        }

        case types.CHANGE_PREPROCESSOR: {

            const { preprocessorId } = action;
            const { entities = {
                entities: {
                    preprocessor: null
                }
            } } = state.preprocessorsList;

            return {
                ...state,
                currentPreprocessor: entities.preprocessor[preprocessorId]
            };
        }

        case types.COMPILE_CODE_REQUEST: {
            return {
                ...state,
                compiled: {
                    preprocessor: action.preprocessor,
                    isCompiled: false
                }
            };
        }

        case types.COMPILE_CODE_SUCCESS: {
            return {
                ...state,
                compiled: {
                    ...state.compiled,
                    preprocessor: action.preprocessor,
                    sourceCode: action.code,
                    compileToCode: action.resultCode,
                    isCompiled: true
                }
            };
        }

        case types.COMPILE_CODE_FAILURE: {
            return {
                ...state,
                compiled: {
                    ...state.compiled,
                    isCompiled: false
                },
                message: action.message
            };
        }

        case types.GET_PREPROCESSORS_REQUEST: {
            return {
                ...state,
                preprocessorsList: {
                    ...state.preprocessorsList,
                    loading: true
                }
            };
        }

        case types.GET_PREPROCESSORS_SUCCESS: {
            return {
                ...state,
                preprocessorsList: {
                    ...state.preprocessorsList,
                    entities: action.preprocessors.entities,
                    result: action.preprocessors.result,
                    loading: false
                }
            };
        }

        case types.GET_PREPROCESSORS_FAILURE: {
            return {
                ...state,
                preprocessorsList: {
                    ...state.preprocessorsList,
                    loading: false
                },
                message: action.message
            };
        }
            
        default:
            return state;  
    }
}
