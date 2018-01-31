/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/form.action';

import * as appConfig from '../core/constants/app.constants';

import { AtomFormFields } from './../core/validations/atom';
import { ProjectFormFields } from './../core/validations/project';


/************************************/
/*            INTERFACES            */
/************************************/
export interface IFormState {
    projectForm: {
        fields: ProjectFormFields,
        step: number
    };
    atomForm: {
        fields: AtomFormFields,
        step: number
    };
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IFormState = {
    projectForm: {
        fields: {
            authorId: null,
            name: null,
            website: null,
            description: null,
            libs: [],
            colorPalette: [],
            private: false,
            projectCategoryId: 1 // TODO: Magic number
        },
        step: 1
    },
    atomForm: {
        fields: {
            authorId: null,
            name: null,
            description: null,
            html: null,
            css: null,
            libs: [],
            contextualBg: appConfig.WHITE_COLOR_HEX,
            private: false,
            projectId: null,
            atomCategoryId: 0
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
                        authorId: null,
                        name: null,
                        website: null,
                        description: null,
                        libs: [],
                        colorPalette: [],
                        private: false,
                        projectCategoryId: 1 // TODO: Magic number
                    },
                    step: 1
                },
                atomForm: {
                    fields: {
                        authorId: null,
                        name: null,
                        description: null,
                        html: null,
                        css: null,
                        libs: [],
                        contextualBg: appConfig.WHITE_COLOR_HEX,
                        private: false,
                        projectId: null,
                        atomCategoryId: 0
                    },
                    step: 1
                }
            };
        }

        case types.NEXT_STEP_ATOM: {
            return {
                ...state,
                atomForm: {
                    ...state.atomForm,
                    fields: {
                        ...state.atomForm.fields,
                        authorId: action.fieldValues.authorId,
                        name: action.fieldValues.name,
                        description: action.fieldValues.description,
                        html: action.fieldValues.html,
                        css: action.fieldValues.css,
                        libs: action.fieldValues.libs,
                        contextualBg: action.fieldValues.contextualBg,
                        private: action.fieldValues.private,
                        projectId: action.fieldValues.projectId,
                        atomCategoryId: action.fieldValues.atomCategoryId
                    },
                    step: state.atomForm.step + 1
                } 
            };
        }

        case types.PREV_STEP_ATOM: {
            return {
                ...state,
                atomForm: {
                    ...state.atomForm,
                    step: state.atomForm.step - 1
                } 
            };
        }

        case types.SKIP_STEP_ATOM: {
            return {
                ...state,
                atomForm: {
                    ...state.atomForm,
                    step: state.atomForm.step + 1
                } 
            };
        }

        case types.NEXT_STEP_PROJECT: {
            return {
                ...state,
                projectForm: {
                    ...state.projectForm,
                    fields: {
                        ...state.projectForm.fields,
                        authorId: action.fieldValues.authorId,
                        name: action.fieldValues.name,
                        website: action.fieldValues.website,
                        description: action.fieldValues.description,
                        libs: action.fieldValues.libs,
                        colorPalette: action.fieldValues.colorPalette,
                        private: action.fieldValues.private,
                        projectCategoryId: action.fieldValues.projectCategoryId
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
