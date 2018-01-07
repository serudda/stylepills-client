/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import * as types from '../core/constants/action.types';

import { IProjectFormFields } from './../core/interfaces/interfaces';

import { IAnalyticsTrack } from './../core/interfaces/interfaces';


/************************************/
/*            INTERFACES            */
/************************************/

interface IFormEventPayLoad {
    event: string;
    properties?: {
        fieldValues: IProjectFormFields;
    };
}

interface ILocationChangeAction {
    type: types.LOCATION_CHANGE;
    projectForm: {
        fields: IProjectFormFields,
        step: number
    };
}

export interface IClearFormAction {
    type: types.CLEAR_FORM;
    projectForm: {
        fields: IProjectFormFields,
        step: number
    };
}

export interface INextStepProjectAction {
    type: types.NEXT_STEP_PROJECT;
    fieldValues: IProjectFormFields;
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


export type Action = 
    // Form interaction
    ILocationChangeAction
|   IClearFormAction
|   INextStepProjectAction
|   IPrevStepProjectAction
|   ISkipStepProjectAction;


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
                name: null,
                website: null,
                colors: []
            },
            step: 1
        }
    };
};


/**
 * @desc Return an action type, NEXT_STEP_PROJECT 
 * to pass the next step project parameters
 * @function nextStepProjectAction
 * @returns {Action}
 */
export const nextStepProjectAction = (fieldValues: IProjectFormFields): Action => {

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