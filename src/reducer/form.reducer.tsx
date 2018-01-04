/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/form.action';

import { IProjectFormFields } from './../core/interfaces/interfaces';


/************************************/
/*            INTERFACES            */
/************************************/
export interface IFormState {
    projectForm: {
        fields: IProjectFormFields,
        step: number
    };
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IFormState = {
    projectForm: {
        fields: {
            name: null,
            website: null
        },
        step: 1
    }
};

// -----------------------------------


/** 
 * @desc This function takes Form actions and return a new state 
 * @param {IFormState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IFormState}
 */
export default function (state: IFormState = defaultState, action: Action): IFormState {

    switch (action.type) {

        
        /***********************************/
        /*       FORM PROJECT ACTIONS      */
        /***********************************/

        case types.LOCATION_CHANGE:
        case types.CLEAR_FORM: {
            return {
                ...state,
                projectForm: {
                    fields: {
                        name: null,
                        website: null
                    },
                    step: 1
                }
            };
        }

        case types.NEXT_STEP_PROJECT: {
            return {
                ...state,
                projectForm: {
                    ...state.projectForm,
                    fields: {
                        name: action.fieldValues.name,
                        website: action.fieldValues.website
                    },
                    step: state.projectForm.step + 1
                } 
            };
        }

        case types.PREV_STEP_PROJECT: {
            return {
                ...state,
                projectForm: {
                    ...state.projectForm,
                    step: state.projectForm.step - 1
                } 
            };
        }

        case types.SKIP_STEP_PROJECT: {
            return {
                ...state,
                projectForm: {
                    ...state.projectForm,
                    step: state.projectForm.step + 1
                } 
            };
        }
            
        default:
            return state;  
    }
}
