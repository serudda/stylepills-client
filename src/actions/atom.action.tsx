/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import { client } from './../index';

import * as types from '../core/constants/action.types';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

import { CREATE_ATOM_MUTATION, CreateAtomInput } from './../models/atom/atom.mutation';


/************************************/
/*            INTERFACES            */
/************************************/
export interface IAtomCodeProps {
    code: string;
    libs?: Array<string>;
}

interface IAtomEditProperties {
    atomId: number;
    name: string;
    atomCode?: {codeType: string, codeProps: IAtomCodeProps};
}

interface IEditAtomEventPayLoad {
    event: string;
    properties?: IAtomEditProperties;
}

interface ICreateAtomEventPayLoad {
    event: string;
    properties: {
        created: {
            atomId?: number,
            isCreated: boolean,
            message?: string
        };
    };
}

export interface IClearAtomStateAction {
    type: types.CLEAR_ATOM_STATE;
    edited: {
        atoms: null,
        watchingChanges: boolean,
        isEdited: boolean
    };
    created: { 
        atomId: null,
        isCreated: boolean
    };
}

export interface IRequestCreateAtomAction {
    type: types.CREATE_ATOM_REQUEST;
    created: {
        isCreated: boolean;
    };
    meta: IAnalyticsTrack<ICreateAtomEventPayLoad>;
}

export interface IReceiveCreateAtomAction {
    type: types.CREATE_ATOM_SUCCESS;
    created: {
        atomId: number;
        isCreated: boolean;
    };
    meta: IAnalyticsTrack<ICreateAtomEventPayLoad>;
}

export interface ICreateAtomFailureAction {
    type: types.CREATE_ATOM_FAILURE;
    created: {
        isCreated: boolean;
    };
    message: string;
    meta: IAnalyticsTrack<ICreateAtomEventPayLoad>;
}

export interface IRequestEditAtomAction {
    type: types.EDIT_ATOM_REQUEST;
    edited: {
        watchingChanges: boolean,
        isEdited: boolean
    };
    meta: IAnalyticsTrack<IEditAtomEventPayLoad>;
}

export interface IChangedAtomDetailsAction {
    type: types.ATOM_DETAILS_CHANGED;
    edited: {
        watchingChanges: boolean,
        isEdited: boolean,
        atoms: IAtomEditProperties
    };
}


export type Action =
    // Atom interaction
    IClearAtomStateAction
|   IRequestCreateAtomAction
|   IReceiveCreateAtomAction
|   ICreateAtomFailureAction
|   IRequestEditAtomAction
|   IChangedAtomDetailsAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_ATOM_STATE to reset Atom states
 * @function clearAtomStateAction
 * @returns {Action}
 */
export const clearAtomStateAction = (): Action => {
    return {
        type: types.CLEAR_ATOM_STATE,
        created: {
            atomId: null,
            isCreated: false
        },
        edited: {
            atoms: null,
            watchingChanges: false,
            isEdited: false
        }
    };
};


/**
 * @desc Return an action type, CREATE_ATOM_REQUEST to start creation process
 * @function requestCreateAtomAction
 * @returns {Action}
 */
export const requestCreateAtomAction = (): Action => {
    return {
        type: types.CREATE_ATOM_REQUEST,
        created: { 
            isCreated: false
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_ATOM_REQUEST,
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
 * @desc Return an action type, CREATE_ATOM_SUCCESS after a successful creation process
 * @function receiveCreateAtomAction
 * @returns {Action}
 */
export const receiveCreateAtomAction = (atomId: number): Action => {
    return {
        type: types.CREATE_ATOM_SUCCESS,
        created: {
            atomId,
            isCreated: true
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_ATOM_SUCCESS,
                    properties: {
                        created: {
                            atomId,
                            isCreated: true
                        }
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CREATE_ATOM_FAILURE after a failure creation process
 * @function createAtomFailureAction
 * @param {string} message - Error message
 * @returns {Action}
 */
export const createAtomFailureAction = (message: string): Action => {
    return {
        type: types.CREATE_ATOM_FAILURE,
        created: {
            isCreated: false
        },
        message,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_ATOM_FAILURE,
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
 * @desc Create Atom Action
 * @function createAtomAction
 * @param {CreateAtomInput} input - create atom input data
 * @returns {Promise<any>}
 */
export const createAtomAction = (input: CreateAtomInput) => {
    return (dispatch: Function) => {

        // Request Create Atom
        dispatch(requestCreateAtomAction());

        client.mutate({
            mutation: CREATE_ATOM_MUTATION,
            variables: { input }
        }).then(
            /* TODO: Typar esta respuesta ya que no se que propiedades devuelve,
                poner un breakpoint justo dentro para ver que devuelve: response, 
                y con base a eso typar.
            */
            (response: any) => {
                let { ok, id, message } = response.data.createAtom;

                if (ok) {
                    // Created Successful
                    dispatch(receiveCreateAtomAction(id));
                } else {
                    // Created Failure
                    dispatch(createAtomFailureAction(message));
                }
            }
        ).catch(
            (response) => {
                // Created Failure
                dispatch(createAtomFailureAction(response));
            }
        );

    };

};


/**
 * @desc Return an action type, EDIT_ATOM_REQUEST
 * to indicate that user wants to edit an Atom component
 * @function requestEditAtomAction
 * @returns {Action}
 */
export const requestEditAtomAction = 
    (atomId: number, name: string): Action => {

    return {
        type: types.EDIT_ATOM_REQUEST,
        edited: {
            watchingChanges: true,
            isEdited: false
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.EDIT_ATOM_REQUEST,
                    properties: {
                        atomId,
                        name
                    },
                },
            },
        }
    };

};


/**
 * @desc Return an action type, ATOM_DETAILS_CHANGED
 * to indicate that user are editing the atom's source code
 * @function changedAtomDetailsAction
 * @returns {Action}
 */
export const changedAtomDetailsAction = 
    (atomId: number, name: string, codeType: string, codeProps: any): Action => {

    return {
        type: types.ATOM_DETAILS_CHANGED,
        edited: {
            watchingChanges: true,
            isEdited: true,
            atoms: {
                atomId,
                name,
                atomCode: {
                    codeType,
                    codeProps
                }
            }
        }
    };

};