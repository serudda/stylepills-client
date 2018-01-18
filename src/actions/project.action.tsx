/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import { client } from './../index';

import * as types from '../core/constants/action.types';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

import { CREATE_PROJECT_MUTATION, CreateProjectInput } from './../models/project/project.mutation';


/************************************/
/*            INTERFACES            */
/************************************/

interface ICreateProjectEventPayLoad {
    event: string;
    properties: {
        created: {
            projectId?: number,
            isCreated: boolean,
            message?: string
        };
    };
}

export interface IClearProjectStateAction {
    type: types.CLEAR_PROJECT_STATE;
    created: { 
        projectId: null,
        isCreated: boolean
    };
}

export interface IRequestCreateProjectAction {
    type: types.CREATE_PROJECT_REQUEST;
    created: {
        isCreated: boolean;
    };
    meta: IAnalyticsTrack<ICreateProjectEventPayLoad>;
}

export interface IReceiveCreateProjectAction {
    type: types.CREATE_PROJECT_SUCCESS;
    created: {
        projectId: number;
        isCreated: boolean;
    };
    meta: IAnalyticsTrack<ICreateProjectEventPayLoad>;
}

export interface ICreateProjectFailureAction {
    type: types.CREATE_PROJECT_FAILURE;
    created: {
        isCreated: boolean;
    };
    message: string;
    meta: IAnalyticsTrack<ICreateProjectEventPayLoad>;
}


export type Action =
    // Project interaction
    IClearProjectStateAction
|   IRequestCreateProjectAction
|   IReceiveCreateProjectAction
|   ICreateProjectFailureAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_PROJECT_STATE to reset Project states
 * @function clearProjectStateAction
 * @returns {Action}
 */
export const clearProjectStateAction = (): Action => {
    return {
        type: types.CLEAR_PROJECT_STATE,
        created: {
            projectId: null,
            isCreated: false
        }
    };
};


/**
 * @desc Return an action type, CREATE_PROJECT_REQUEST to start creation process
 * @function requestCreateProjectAction
 * @returns {Action}
 */
export const requestCreateProjectAction = (): Action => {
    return {
        type: types.CREATE_PROJECT_REQUEST,
        created: { 
            isCreated: false
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_PROJECT_REQUEST,
                    properties: {
                        created: { 
                            isCreated: false
                        }
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CREATE_PROJECT_SUCCESS after a successful creation process
 * @function receiveCreateProjectAction
 * @returns {Action}
 */
export const receiveCreateProjectAction = (projectId: number): Action => {
    return {
        type: types.CREATE_PROJECT_SUCCESS,
        created: {
            projectId,
            isCreated: true
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_PROJECT_SUCCESS,
                    properties: {
                        created: {
                            projectId,
                            isCreated: true
                        }
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CREATE_PROJECT_FAILURE after a failure creation process
 * @function createProjectFailureAction
 * @param {string} message - Error message
 * @returns {Action}
 */
export const createProjectFailureAction = (message: string): Action => {
    return {
        type: types.CREATE_PROJECT_FAILURE,
        created: {
            isCreated: false
        },
        message,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_PROJECT_FAILURE,
                    properties: {
                        created: {
                            isCreated: false,
                            message
                        }
                    },
                },
            },
        }
    };
};


/**
 * @desc Create Project Action
 * @function createProjectAction
 * @param {CreateProjectInput} input - create project input data
 * @returns {Promise<any>}
 */
export const createProjectAction = (input: CreateProjectInput) => {
    return (dispatch: Function) => {

        // Request Create Project
        dispatch(requestCreateProjectAction());

        client.mutate({
            mutation: CREATE_PROJECT_MUTATION,
            variables: { input }
        }).then(
            /* TODO: Typar esta respuesta ya que no se que propiedades devuelve,
                poner un breakpoint justo dentro para ver que devuelve: response, 
                y con base a eso typar.
            */
            (response: any) => {
                let { ok, id, message } = response.data.createProject;

                if (ok) {
                    // Created Successful
                    dispatch(receiveCreateProjectAction(id));
                } else {
                    // Created Failure
                    dispatch(createProjectFailureAction(message));
                }
            }
        ).catch(
            (response) => {
                // Created Failure
                dispatch(createProjectFailureAction(response));
            }
        );

    };

};