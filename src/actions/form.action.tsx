/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import * as types from '../core/constants/action.types';

import { AtomFormFields } from './../core/validations/atom';
import { ProjectFormFields } from './../core/validations/project';

import { IAnalyticsTrack } from './../core/interfaces/interfaces';


/************************************/
/*            INTERFACES            */
/************************************/

interface IFormEventPayLoad {
    event: string;
    properties?: {
        fieldValues: AtomFormFields | ProjectFormFields;
    };
}

interface ILocationChangeAction {
    type: types.LOCATION_CHANGE;
    projectForm: {
        fields: ProjectFormFields,
        step: number
    };
    atomForm: {
        fields: AtomFormFields,
        step: number
    };
}

export interface IClearFormAction {
    type: types.CLEAR_FORM;
    projectForm: {
        fields: ProjectFormFields,
        step: number
    };
    atomForm: {
        fields: AtomFormFields,
        step: number
    };
}

export interface INextStepProjectAction {
    type: types.NEXT_STEP_PROJECT;
    fieldValues: ProjectFormFields;
    meta: IAnalyticsTrack<IFormEventPayLoad>;
}

export interface IPrevStepProjectAction {
    type: types.PREV_STEP_PROJECT;
    meta: IAnalyticsTrack<IFormEventPayLoad>;
}

export interface ISkipStepProjectAction {
    type: types.SKIP_STEP_PROJECT;
    meta: IAnalyticsTrack<IFormEventPayLoad>;
}

export interface INextStepAtomAction {
    type: types.NEXT_STEP_ATOM;
    fieldValues: AtomFormFields;
    meta: IAnalyticsTrack<IFormEventPayLoad>;
}

export interface IPrevStepAtomAction {
    type: types.PREV_STEP_ATOM;
    meta: IAnalyticsTrack<IFormEventPayLoad>;
}

export interface ISkipStepAtomAction {
    type: types.SKIP_STEP_ATOM;
    meta: IAnalyticsTrack<IFormEventPayLoad>;
}


export type Action = 
    // Form interaction
    ILocationChangeAction
|   IClearFormAction
|   INextStepProjectAction
|   IPrevStepProjectAction
|   ISkipStepProjectAction
|   INextStepAtomAction
|   IPrevStepAtomAction
|   ISkipStepAtomAction;


/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_FORM to reset form states
 * @function clearFormAction
 * @returns {Action}
 */
export const clearFormAction = (): Action => {
    return {
        type: types.CLEAR_FORM,
        projectForm: {
            fields: {
                authorId: null,
                name: null,
                website: null,
                description: null,
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
                contextualBg: '#FFFFFF',
                private: false,
                projectId: null,
                atomCategoryId: 0
            },
            step: 1
        }
    };
};


/**
 * @desc Return an action type, NEXT_STEP_ATOM
 * to pass the next step atom parameters
 * @function nextStepAtomAction
 * @returns {Action}
 */
export const nextStepAtomAction = (fieldValues: AtomFormFields): Action => {

    return {
        type: types.NEXT_STEP_ATOM,
        fieldValues,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.NEXT_STEP_ATOM,
                    properties: {
                        fieldValues
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, PREV_STEP_ATOM
 * to register the previous button action
 * @function prevStepAtomAction
 * @returns {Action}
 */
export const prevStepAtomAction = (): Action => {
    return {
        type: types.PREV_STEP_ATOM,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.PREV_STEP_ATOM
                }
            }
        }
    };
};


/**
 * @desc Return an action type, SKIP_STEP_ATOM
 * to register the skip button action
 * @function skipStepAtomAction
 * @returns {Action}
 */
export const skipStepAtomAction = (): Action => {
    return {
        type: types.SKIP_STEP_ATOM,        
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.SKIP_STEP_ATOM
                }
            }
        }
    };
};


/**
 * @desc Return an action type, NEXT_STEP_PROJECT 
 * to pass the next step project parameters
 * @function nextStepProjectAction
 * @returns {Action}
 */
export const nextStepProjectAction = (fieldValues: ProjectFormFields): Action => {

    return {
        type: types.NEXT_STEP_PROJECT,
        fieldValues,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.NEXT_STEP_PROJECT,
                    properties: {
                        fieldValues
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, PREV_STEP_PROJECT 
 * to register the previous button action
 * @function prevStepProjectAction
 * @returns {Action}
 */
export const prevStepProjectAction = (): Action => {
    return {
        type: types.PREV_STEP_PROJECT,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.PREV_STEP_PROJECT
                }
            }
        }
    };
};


/**
 * @desc Return an action type, SKIP_STEP_PROJECT 
 * to register the skip button action
 * @function skipStepProjectAction
 * @returns {Action}
 */
export const skipStepProjectAction = (): Action => {
    return {
        type: types.SKIP_STEP_PROJECT,        
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.SKIP_STEP_PROJECT
                }
            }
        }
    };
};